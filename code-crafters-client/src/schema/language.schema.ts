import {z} from "zod";

export const LanguageSchema = z.object({
  name: z.string().min(1, {
    message: 'Language name is required.',
  }).max(50, {
    message: 'Language name must not exceed 50 characters.',
  }),
  version: z.string().min(1, {
    message: 'Version is required.',
  }).max(20, {
    message: 'Version must not exceed 20 characters.',
  }),
  isActivated: z.boolean().optional().default(true),
});