import {Row, Table} from "@tanstack/react-table";
import {ParsedQuery} from "query-string";
import {UseQueryOptions} from "@tanstack/react-query";
import {SuccessResponse} from "@/interfaces/api-responsive.ts";
import {Language} from "@/interfaces/language.ts";

export enum DialogActionType {
  CREATE = 'create',
  EDIT = 'edit',
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  query: string,
  setQuery: (query: string) => void;
  refetch: () => void;
}

export interface IMutation {
  handleSuccess?: () => void,
  handleError?: () => void;
}

type UseLanguageOptions<T> = Omit<UseQueryOptions<SuccessResponse<T>>, 'queryFn' | 'queryKey'>

export interface IUseQuery<T> {
  options?: UseLanguageOptions<T>,
  queryParam: ParsedQuery
}

export interface RowActionsProps<T>{
  row: Row<T>;
}