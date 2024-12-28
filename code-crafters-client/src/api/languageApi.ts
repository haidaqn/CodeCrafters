import axiosInstance, {endpoints} from "@/utils/axios.ts";
import {ParsedQuery} from "query-string";

//-----------------------------------------------------------------------------------------------

export class LanguageApi {
  static async list(params?: ParsedQuery) {
    return axiosInstance.get(endpoints.language.list, {params});
  }

  static async block(ids: number[]) {
    return axiosInstance.post(endpoints.language.block, {ids});
  }

  static async update(id: number, data: any) {
    return axiosInstance.patch(endpoints.language.update(id), data);
  }
}