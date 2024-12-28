import axiosInstance, {endpoints} from "@/utils/axios.ts";
import {ParsedQuery} from "query-string";

//-----------------------------------------------------------------------------------------------

export class UserApi {
  static async list(params?: ParsedQuery) {
    return axiosInstance.get(endpoints.user.list, {params});
  }

  static async block(ids: number[]) {
    return axiosInstance.post(endpoints.user.block, {ids});
  }

  static async update(id: number, data: any) {
    return axiosInstance.patch(endpoints.user.update(id), data);
  }
}