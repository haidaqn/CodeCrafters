import axiosInstance, {endpoints} from "@/utils/axios.ts";
import {ParsedQuery} from "query-string";
import {Language, SuccessResponse} from "@/interfaces";

//-----------------------------------------------------------------------------------------------

export class LanguageApi {
  static async list(params?: ParsedQuery) {
    return axiosInstance.get<SuccessResponse<Language[]>>(endpoints.language.default, {params});
  }

  static async block(ids: number[]) {
    return axiosInstance.post(endpoints.language.block, {ids});
  }

  static async update(id: number, data: any) {
    return axiosInstance.patch(endpoints.language.update(id), data);
  }

  static async create(data: any) {
    return axiosInstance.post(endpoints.language.default, data)
  }
}