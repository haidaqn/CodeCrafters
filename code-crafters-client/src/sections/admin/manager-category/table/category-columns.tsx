import {ColumnDef} from '@tanstack/react-table';
import {Checkbox} from '@/components/ui/checkbox.tsx';
import {DataTableColumnHeader} from '@/components/common/data-table/data-table-column-header.tsx';
import {Category} from "@/interfaces";
import {format} from 'date-fns';
import {CategoryHandler} from './category-handle';

export const categoryColumns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'id'}/>
    ),
    cell: ({row}) => <div className="w-[20px]">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'name'}/>
    ),
    cell: ({row}) => <div className="w-[150px]">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'createdAt'}/>
    ),
    cell: ({row}) => <div className="w-[150px]">{format(row.getValue('createdAt'), 'dd/MM/yyyy hh:mm:ss')}</div>,
  },
  {
    accessorKey: 'updatedAt',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'updatedAt'}/>
    ),
    cell: ({row}) => <div className="w-[150px]">{format(row.getValue('updatedAt'), 'dd/MM/yyyy hh:mm:ss')}</div>,
  },
  {
    id: 'actions',
    cell: ({row}) => <CategoryHandler row={row}/>,
  },
]
