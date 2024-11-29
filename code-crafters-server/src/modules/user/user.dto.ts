export interface validateUser {
  account: string;
  password: string;
}

export interface createUser {
  email: string;
  username: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface UpdateUser {
  id: number;
  fullName?: string;
  phone?: string;
  email?: string;
  username?: string;
  password?: string;
  isActivated?: boolean;
  isBlocked?: boolean;
  refreshToken?: string;
  avatar?: string;
}