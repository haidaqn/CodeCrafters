export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  username: string;
}

export interface VerifyAccount {
  email: string
  code: string
}

export interface ResendEmail {
  email: string
  captcha: string
}


export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  fullName: string;
  phone: any;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChangePasswordForm {
  password: string;
  passwordNew: string;
  passwordConfirm: string;
}


export enum RoleInApp {
  ADMIN = 'admin',
  USER = 'user'
}