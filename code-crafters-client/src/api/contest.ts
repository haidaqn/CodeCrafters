import {ParsedQuery} from "query-string";
import axiosInstance, {endpoints} from "@/utils/axios.ts";

export class Contest {
  static async list(params?: ParsedQuery) {
    return axiosInstance.get(endpoints.contest.default, {params})
  }
}