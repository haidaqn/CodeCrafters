import {IApiResponse, LoginForm} from "@/interfaces";

import axiosInstance, {endpoints} from "@/utils/axios.ts";

export class authApi {

  static async login(loginData: LoginForm){
    const response = await axiosInstance.post(endpoints.auth.login);
    return response.data;
  }
}