import {LoginForm, RegisterForm, ResendEmail, VerifyAccount} from "@/interfaces";

import axiosInstance, {endpoints} from "@/utils/axios.ts";

//-----------------------------------------------------------------------------------------------


export class authApi {

  static async login(loginData: LoginForm) {
    const response = await axiosInstance.post(endpoints.auth.login, loginData);
    return response.data;
  }

  static async authSso(serviceID: string, data: any) {
    return axiosInstance.post(endpoints.auth.sso(serviceID), data)
  }

  static async register(data: RegisterForm) {
    return axiosInstance.post(endpoints.auth.register, data)
  }

  static async refreshTokenCheck(accessToken: string) {
    let tokenData = JSON.parse(atob(accessToken.split('.')[1]))
    if (tokenData.exp <= ~~(new Date().getTime() / 1000)) {

    }
  }

  static async verifyEmail(data: VerifyAccount) {
    return axiosInstance.post(endpoints.auth.verify, data)
  }

  static async resendEmail(data: ResendEmail) {
    return axiosInstance.post(endpoints.auth.resend, data)
  }

  static async forgotPassword(email: string) {
    return axiosInstance.post(endpoints.auth.forgot, {email})
  }

}