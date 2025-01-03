import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required.',
  }).max(50, {
    message: 'Name must not exceed 50 characters.',
  }),
}); 