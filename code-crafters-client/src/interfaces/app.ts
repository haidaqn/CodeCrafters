import {Table} from "@tanstack/react-table";

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