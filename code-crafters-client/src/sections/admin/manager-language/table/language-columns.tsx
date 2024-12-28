import {ColumnDef} from '@tanstack/react-table';
import {Checkbox} from '@/components/ui/checkbox.tsx';
import {DataTableColumnHeader} from '@/components/common/data-table/data-table-column-header.tsx';
import {Language} from "@/interfaces";

export const languageColumns: ColumnDef<Language>[] = [
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
    accessorKey: 'version',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'version'}/>
    ),
    cell: ({row}) => <div className="w-[200px]">{row.getValue('version')}</div>,
  },
  {
    accessorKey: 'isActive',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'status'}/>
    ),
    cell: ({row}) => <div className="w-[50px] font-bold">{row.getValue('isActive') ?
      <span className='text-red-500'>Inactive</span> :
      <span className='text-green-500'>Active</span>
    }</div>,
  },
]
