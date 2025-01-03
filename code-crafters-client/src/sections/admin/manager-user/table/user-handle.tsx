import {DotsHorizontalIcon} from '@radix-ui/react-icons';
import {Row} from '@tanstack/react-table';
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
import {DialogActionType, User} from "@/interfaces";
import {KeyDialogs} from "@/constant";
import {useUserBlocks} from "@/hooks";
import {useDialogStore} from "@/store/dialog-state-store.tsx";

interface UserRowActionsProps {
  row: Row<User>;
}

export function UserHandle(props: UserRowActionsProps) {
  const {row} = props;
  const {setDialogState} = useDialogStore();
  const {showAlert} = useAlertDialog();
  const mutation = useUserBlocks();

  const handleEdit = () => {
    setDialogState(KeyDialogs.user, {
      open: true,
      actionType: DialogActionType.EDIT,
      data: row.original,
    });
  };

  const handleBlock = async () => {
    await showAlert({
      header: `Confirm ${row.original.isBlocked ? "Active" : "Block"} User`,
      description: 'Are you sure you want to proceed?',
      confirmText: row.original.isBlocked ? "Active" : "Block",
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
          <ShieldCheck className="h-4 mr-2 w-4"/> {row.original.isBlocked ? "Active" : "Block"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}