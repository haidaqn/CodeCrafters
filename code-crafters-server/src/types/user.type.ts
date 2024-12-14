export enum ROLE {
  USER = "user",
  ADMIN = "admin"
}

export interface CreateUserSsoPayload {
  email: string;
  fullName: string;
  emailVerified: boolean;
}

interface QueryGoogleUser {
  googleId: string;
}

export type QuerySsoUser = QueryGoogleUser

export interface UserOnlineStatus {
  userId: string;
  onlineStatus: number;
  lastOnlineTime?: Date
}
