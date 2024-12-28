import {Table} from "@tanstack/react-table";
import {SuccessResponse} from "@/interfaces/api-responsive.ts";

export interface IUseTable<T> {
  table: Table<T>,
  columnLength: number,
  isFetching: boolean,
  data?: SuccessResponse<T[]>
}