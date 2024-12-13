import {LoginForm} from "@/interfaces";

import axiosInstance, {endpoints} from "@/utils/axios.ts";

//-----------------------------------------------------------------------------------------------


export class authApi {

  static async login(loginData: LoginForm) {
    const response = await axiosInstance.post(endpoints.auth.login);
    return response.data;
  }

  static async authSso(serviceID: string, data: any) {
    return axiosInstance.post(endpoints.auth.sso(serviceID), data)
  }

}