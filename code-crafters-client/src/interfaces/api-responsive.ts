import {IPaging} from "@/interfaces/paging";

//----------------------------------------------------------------------------

export interface IApiResponse<T> {
  data: T;
  paging: IPaging;
  total: number;
  filter: Record<string, never>;
}

export interface ErrorResponse {
  success: boolean;
  status: number;
  path: string;
  message: string;
  type: string;
}