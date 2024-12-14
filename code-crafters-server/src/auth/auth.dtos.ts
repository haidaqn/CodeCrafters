import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { Messages } from "../config";
import { IsOptionalNonNullable } from "../decorators";
import { Transform } from "class-transformer";

export class LoginDto {
  @ApiProperty({
    default: "toilatest or toilatest@gmail.com"
  })
  @IsString()
  account: string;

  @ApiProperty({
    default: "P@ssword~sample1"
  })
  @IsNotEmpty({
    message: Messages.auth.password
  })
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    description: "Full name of the user",
    default: "John Doe"
  })
  @IsNotEmpty({
    message: Messages.auth.fullName
  })
  fullName: string;

  @ApiProperty({
    description: "User email",
    default: "test@gmail.com"
  })
  @IsNotEmpty({
    message: Messages.auth.email
  })
  @IsEmail({}, {
    message: Messages.auth.invalidEmail
  })
  email: string;

  @ApiProperty({
    description: "Username of the user",
    default: "toilatest"
  })
  @IsNotEmpty({
    message: Messages.auth.username
  })
  @MinLength(3, {
    message: Messages.auth.usernameMinLength
  })
  username: string;

  @ApiProperty({
    description: "Password for the user",
    default: "password123"
  })
  @IsNotEmpty({
    message: Messages.auth.password
  })
  @MinLength(8, {
    message: Messages.auth.passwordMinLength
  })
  password: string;

  @ApiProperty({
    description: "Phone number of the user",
    default: "1234567890",
    required: false
  })
  @IsOptional()
  @Matches(/^\d{10}$/, {
    message: Messages.auth.invalidPhone
  })
  phone?: string;
}

export class VerifyUserDto {
  @IsNotEmpty({
    message: "EMAIL_REQUIRED"
  })
  @IsEmail({}, {
    message: "INVALID_EMAIL"
  })
  @ApiProperty({
    type: String,
    default: "example@gmail.com"
  })
  @Transform(({ value }) => value.toString().toLowerCase())
  email: string;

  @IsNotEmpty({
    message: "CODE_REQUIRED"
  })
  @IsString({
    message: "INVALID_CODE"
  })
  @ApiProperty({
    type: String,
    default: "123456"
  })
  code: string;
}


export class OauthSignInDto {
  @ApiProperty()
  @IsString()
  @IsOptionalNonNullable()
  code?: string;

  @ApiProperty()
  @IsString()
  @IsOptionalNonNullable()
  access_token?: string;

  @ApiProperty()
  @IsString()
  @IsOptionalNonNullable()
  id_token?: string;

  @ApiProperty()
  @IsString()
  @IsOptionalNonNullable()
  redirect_uri?: string;
}

export class forgotPasswordDto {
  @ApiProperty({})
  @IsNotEmpty({
    message: Messages.auth.emailOrUserName
  })
  @IsString({ message: "Invalid string" })
  account: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    description: "Old password"
  })
  @IsNotEmpty({
    message: Messages.auth.password
  })
  oldPassword: string;

  @ApiProperty({
    description: "New password"
  })
  @IsNotEmpty({
    message: Messages.auth.password
  })
  @MinLength(8, {
    message: Messages.auth.passwordMinLength
  })
  newPassword: string;
}

export class UpdateInfoDto {
  @ApiProperty({
    description: "Full name of the user",
    default: "John Doe"
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: "User email",
    default: "test@gmail.com"
  })
  @IsString()
  @IsOptional()
  @IsEmail({}, {
    message: Messages.auth.invalidEmail
  })
  email?: string;

  @ApiProperty({
    description: "Phone number of the user",
    default: "1234567890",
    required: false
  })
  @IsOptional()
  @Matches(/^\d{10}$/, {
    message: Messages.auth.invalidPhone
  })
  phone?: string;
}

export class refreshTokenDto {
  @ApiProperty({
    default: "refresh"
  })
  @IsString()
  refreshToken: string;
}

export interface SignUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  username: string;
  isBlocked: boolean;
}


export interface Payload {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: string;
  isBlocked: boolean;
}