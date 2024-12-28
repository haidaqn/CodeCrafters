import {ParsedQuery} from "query-string";
import axiosInstance, {endpoints} from "@/utils/axios.ts";

export class ContestApi {
  static async list(params?: ParsedQuery) {
    return axiosInstance.get(endpoints.contest.list, {params})
  }
}