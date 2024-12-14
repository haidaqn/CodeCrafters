import {z} from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({message: "Invalid email"}),
  password: z.string().min(6, {message: "Password must be at least 6 characters long"}),
});

export const RegisterSchema = z.object({
  username: z.string()
    .min(4, 'NAME_TOO_SHORT')
    .min(1, {message: 'Username is required'})
    .max(30, {message: 'Username must be 30 characters or less'}),
  fullName: z.string().min(6, 'NAME_TOO_SHORT'),
  email: z.string().email('INVALID_EMAIL_ADDRESS'),
  password: z.string()
    .min(6, 'PASSWORD_TOO_SHORT')
    .max(30, {message: 'Password must be 30 characters or less'})
    .regex(/\d/, 'PASSWORD_NEEDS_NUMBER')
});

export const VerifySchema = z.object({
  email: z
    .string()
    .email({message: 'Invalid email address'}),
  code: z
    .string()
    .length(6, {message: 'Code must be exactly 6 characters'})
});

export const ResendSchema = z.object({
  email: z
    .string()
    .email({message: 'Invalid email address'}),
  captcha: z
    .string()
});