import {DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu';
import {MixerHorizontalIcon} from '@radix-ui/react-icons';
import {Table} from '@tanstack/react-table';

import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>(props: DataTableViewOptionsProps<TData>) {
  const {table} = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto hidden lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4"/>
          Setting
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Convert columns</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {table
          .getAllColumns()
          .filter(
            (column) =>
              column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value: boolean) => column.toggleVisibility(value)}
              >
                {column.id.toLowerCase()}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
