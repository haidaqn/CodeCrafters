import React, {useEffect} from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {useDebounce, useRouter} from "@/routes";
import queryString, {ParsedQuery} from "query-string";
import {UseTable} from "@/components";
import {useSearchParams} from 'next/navigation'
import {useLanguageFetcher} from "@/hooks";
import {LanguageToolbar} from "@/sections/admin/manager-language/table/language-toolbar.tsx";
import {languageColumns} from "@/sections/admin/manager-language/table/language-columns.tsx";
import {Language} from "@/interfaces";

//-----------------------------------------------------------------------------------------------

export function LanguageTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: Number(searchParams?.get('page') || 1) - 1,
    pageSize: Number(searchParams?.get('limit') || 10),
  });
  const [query, setQuery] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const debouncedSearchTerm = useDebounce(query, 500);

  const paramObject: ParsedQuery = React.useMemo(() => ({
    search: debouncedSearchTerm,
    page: String(pagination?.pageIndex ? pagination?.pageIndex + 1 : 1),
    limit: String(pagination.pageSize),
    sortBy: sorting.length ? sorting[0].id : '',
    sortType: !sorting[0]?.desc ? 'asc' : 'desc',
    filters: String(columnFilters),
  }), [debouncedSearchTerm, sorting, columnFilters, pagination.pageIndex, pagination.pageSize]);

  const {data, isFetching, refetch} = useLanguageFetcher({
    options: {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: true
    },
    queryParam: paramObject
  });

  useEffect(() => {
    router.replace(`?${queryString.stringify(paramObject)}`);
  }, [paramObject]);

  const table = useReactTable({
    data: data?.data || [],
    columns: languageColumns,
    state: {
      sorting,
      pagination,
      rowSelection,
      columnFilters,
      columnVisibility,
    },
    pageCount: data?.pagination?.totalPages || 1,
    enableRowSelection: true,
    manualPagination: true,
    autoResetPageIndex: false,
    manualSorting: true,
    manualFiltering: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="gap-4 h-full flex flex-col">
      <LanguageToolbar table={table} query={query} setQuery={setQuery} refetch={refetch}/>
      <UseTable<Language> table={table} data={data} isFetching={isFetching} columnLength={languageColumns.length}/>
    </div>
  )

}
