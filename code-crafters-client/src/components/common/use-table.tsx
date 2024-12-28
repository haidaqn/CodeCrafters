import {IUseTable} from "@/interfaces/use-table";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table.tsx";
import {DataTablePagination, TableHeaderComp} from "@/components";
import {flexRender} from "@tanstack/react-table";
import {LoaderCircle} from 'lucide-react';

export function UseTable<T>(props: IUseTable<T>) {
  const {data, isFetching, table, columnLength} = props;
  return (
    <>
      <div className="rounded-md flex relative flex-col border min-h-0 flex-1">
        <Table>
          <TableHeaderComp className="sticky top-0 z-[20] bg-background" table={table}/>
          {!isFetching && (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columnLength} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
        {isFetching && (
          <div className="w-full flex-1 items-center flex justify-center">
            <LoaderCircle className="h-4 w-4 animate-spin"/>
          </div>
        )}
      </div>
      <div className="mt-auto">
        <DataTablePagination table={table} totalRows={data?.pagination?.totalItems}/>
      </div>
    </>
  );
}

