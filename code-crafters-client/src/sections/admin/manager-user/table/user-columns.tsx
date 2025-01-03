import {ColumnDef} from '@tanstack/react-table';
import {Checkbox} from '@/components/ui/checkbox.tsx';
import {DataTableColumnHeader} from '@/components/common/data-table/data-table-column-header.tsx';
import {User} from "@/interfaces";
import {UserHandle} from "@/sections/admin/manager-user/table/user-handle.tsx";

export const userColumns: ColumnDef<User>[] = [
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
    accessorKey: 'username',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'username'}/>
    ),
    cell: ({row}) => <div className="w-[80px]">{row.getValue('username')}</div>,
  },
  {
    accessorKey: 'fullName',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'fullName'}/>
    ),
    cell: ({row}) => <div className="w-[150px]">{row.getValue('fullName')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'email'}/>
    ),
    cell: ({row}) => <div className="w-[150px]">{row.getValue('email')}</div>,
  },

  {
    accessorKey: 'phone',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'phone'}/>
    ),
    cell: ({row}) => <div className="w-[60px]">{row.getValue('phone')}</div>,
  },
  {
    accessorKey: 'role',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'role'}/>
    ),
    cell: ({row}) => <div className="w-[50px]">{row.getValue('role')}</div>,
  },
  {
    accessorKey: 'totalSolved',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'totalSolved'}/>
    ),
    cell: ({row}) => <div className="w-[50px]">{row.getValue('totalSolved')}</div>,
  },
  {
    accessorKey: 'isBlocked',
    header: ({column}) => (
      <DataTableColumnHeader column={column} title={'isBlocked'}/>
    ),
    cell: ({row}) => <div className="w-[50px] font-bold">{row.getValue('isBlocked') ?
      <span className='text-red-500'>Blocked</span> :
      <span className='text-green-500'>Active</span>}</div>,
  },
  {
    id: 'actions',
    cell: ({row}) => (<UserHandle row={row}/>),
  },
]