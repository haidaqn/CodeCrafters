import {Input} from "@/components/ui/input.tsx";
import {Plus, SearchIcon, Trash2} from "lucide-react";
import {useLanguageBlocks} from "@/hooks";
import {DataTableViewOptions, useAlertDialog} from "@/components";
import {motion} from 'framer-motion';
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {cn} from "@/lib";
import {Badge} from "@/components/ui/badge.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {DataTableToolbarProps, DialogActionType} from "@/interfaces";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog.tsx";
import {KeyDialogs} from "@/constant";
import {useDialogStore} from "@/store/dialog-state-store.tsx";
import {LanguageForm} from "@/sections/admin/manager-language/form/language-form.tsx";


export function LanguageToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const {query, setQuery, table, refetch} = props;
  const rowsSelected = table.getSelectedRowModel().rows;
  const mutation = useLanguageBlocks();
  const {showAlert} = useAlertDialog();
  const {dialogs, setDialogState} = useDialogStore();
  const currentDialog = dialogs[KeyDialogs.language];
  const isEdit = currentDialog?.action === DialogActionType.EDIT;


  const handleDelete = async () => {
    await showAlert({
      header: `Confirm block ${rowsSelected.length} row`,
      description: 'Are you sure you want to continue?',
      confirmText: 'Block users',
      asyncAction: async () => mutation.mutate(
        rowsSelected.map((item: any) => Number(item.original.id)),
        {
          onSuccess: () => {
            table.resetRowSelection();
            refetch();
          }
        }
      )
    });
  }


  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Dialog
          onOpenChange={(open) => {
            setDialogState(KeyDialogs.language, {open});
            if (!open) {
              document.body.style.pointerEvents = 'auto';
            }
          }}
          open={dialogs[KeyDialogs.language]?.open}
        >
          <DialogTrigger asChild>
            <Button icon={<Plus className="w-4 h-4 mr-2"/>}>
              {isEdit ? "Edit" : "Add new"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEdit ? "Edit programming languages" : "Add new programming languages"}</DialogTitle>
              <DialogDescription>{isEdit ? "Fill in the form with values to edit a languages." : "Fill in the form with values to create a languages."}</DialogDescription>
            </DialogHeader>
            <LanguageForm refetch={refetch}/>
          </DialogContent>
        </Dialog>
        <div>
          <Input placeholder="Search category name"
                 startIcon={<SearchIcon className="w-4 h-4"/>}
                 value={query}
                 onChange={(event) => setQuery(event.target.value)}
                 className="w-[150px] lg:w-[250px]"
          />
        </div>
        {rowsSelected.length > 0 && (<motion.div
          onClick={() => handleDelete()}
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.9}}
          transition={{duration: 0.2}}
          className={cn(buttonVariants({variant: 'outline'}), 'cursor-pointer group flex items-center')}
        >
          <Trash2 className="w-4 h-4 mr-2"/>
          <span>Delete</span>
          <Separator orientation="vertical" className="mx-2 h-4"/>
          <Badge
            variant="secondary"
            className="px-1.5 flex gap-1 rounded-md font-normal">
            <motion.span
              key={rowsSelected.length}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.3}}
            >
              {rowsSelected.length}
            </motion.span>
            {rowsSelected.length === 1 ? "row" : "rows"}
          </Badge>
        </motion.div>)}
      </div>
      <DataTableViewOptions table={table}/>
    </div>
  )
}