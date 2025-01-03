import {z} from "zod";

export const CreateProblemSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }).max(100, {
    message: 'Title must not exceed 100 characters.',
  }),
  description: z.string().min(1, {
    message: 'Description is required.',
  }),
  difficult: z.enum(['EASY', 'MEDIUM', 'HARD'], {
    errorMap: () => ({message: 'Difficulty must be one of the allowed values.'})
  }),
  timeLimit: z.number().min(1, {
    message: 'Time limit must be greater than 1s'
  }),
  categoryID: z.number().int().min(1, {
    message: 'Category ID is required.'
  }),
  points: z.number().int().min(1, {
    message: 'Points must be at least 1.'
  })
});

export const UpdateProblemSchema = z.object({
  title: z.string().max(100, {
    message: 'Title must not exceed 100 characters.'
  }).optional(),
  description: z.string().optional(),
  difficult: z.enum(['EASY', 'MEDIUM', 'HARD'], {
    errorMap: () => ({message: 'Difficulty must be one of the allowed values.'})
  }).optional(),
  timeLimit: z.number().min(0.1, {
    message: 'Time limit must be greater than 0.'
  }).optional(),
  categoryIDs: z.array(z.number().int()).optional(),
  contestIDs: z.array(z.number().int()).optional(),
  points: z.number().int().min(1, {
    message: 'Points must be at least 1.'
  }).optional(),
  isActivated: z.boolean().optional()
});
