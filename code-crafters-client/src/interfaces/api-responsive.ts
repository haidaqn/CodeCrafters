import {IPaging} from "@/interfaces/paging";

//----------------------------------------------------------------------------

export interface IApiResponse<T> {
  data: T;
  paging: IPaging;
  message: string;
  path: string;
  status: number
}

export interface SuccessResponse<T> {
  path: string;
  message: string;
  status: number;
  pagination?: Pagination;
  data: T;
}

export interface Pagination {
  page: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
}

export interface ErrorResponse {
  success: boolean;
  status: number;
  path: string;
  message: string;
  type: string;
}