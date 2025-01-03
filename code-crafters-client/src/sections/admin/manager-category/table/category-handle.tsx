import {DotsHorizontalIcon} from '@radix-ui/react-icons';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Pencil, ShieldCheck} from 'lucide-react';
import {useAlertDialog} from '@/components/providers/alert-dialog-provider.tsx';
import {Category, DialogActionType, RowActionsProps} from "@/interfaces";
import {KeyDialogs} from "@/constant";
import {useDialogStore} from "@/store/dialog-state-store.tsx";
import {useCategoryDelete} from "@/hooks";

export function CategoryHandler(props: RowActionsProps<Category>) {
  const {
    row,
  } = props;
  const {setDialogState} = useDialogStore();
  const {showAlert} = useAlertDialog();
  const mutation = useCategoryDelete();

  const handleEdit = () => {
    setDialogState(KeyDialogs.category, {
      open: true,
      actionType: DialogActionType.EDIT,
      data: row.original,
    });
  };

  const handleBlock = async () => {
    await showAlert({
      header: `Confirm row delete`,
      description: 'Are you sure you want to proceed?',
      confirmText: "Delete",
      asyncAction: async () => {
        mutation.mutate([row.original.id]);
      },
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4"/>
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer" onSelect={handleEdit}>
          <Pencil className="h-4 mr-2 w-4"/> Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onSelect={handleBlock} className="cursor-pointer">
          <ShieldCheck className="h-4 mr-2 w-4"/> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
