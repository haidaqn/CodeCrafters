import {z} from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({message: "Invalid email"}),
  password: z.string().min(6, {message: "Password must be at least 6 characters long"}),
});

export const RegisterSchema = z.object({
  fullName: z.string().min(6, 'NAME_TOO_SHORT'),
  email: z.string().email('INVALID_EMAIL_ADDRESS'),
  password: z.string()
    .min(6, 'PASSWORD_TOO_SHORT')
    .regex(/\d/, 'PASSWORD_NEEDS_NUMBER')
});
