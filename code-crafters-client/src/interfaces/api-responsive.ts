import {IPaging} from "@/interfaces/paging";

//----------------------------------------------------------------------------

export interface IApiResponse<T> {
  data: T;
  paging: IPaging;
  message: string;
  path:string;
  status: number
}

export interface ErrorResponse {
  success: boolean;
  status: number;
  path: string;
  message: string;
  type: string;
}