import axiosInstance, {endpoints} from "@/utils/axios.ts";
import {ParsedQuery} from "query-string";
import {Category, SuccessResponse} from "@/interfaces";

//-----------------------------------------------------------------------------------------------

export class CategoryApi {
  static async list(params?: ParsedQuery) {
    return axiosInstance.get<SuccessResponse<Category[]>>(endpoints.category.default, {params});
  }

  static async create(data: any) {
    return axiosInstance.post(endpoints.category.default, data)
  }

  static async update(id: number, data: any) {
    return axiosInstance.patch(endpoints.category.update(id), data);
  }

  static async delete(ids: number[]) {
    return axiosInstance.delete(endpoints.category.default, {data: {ids}})
  }
}