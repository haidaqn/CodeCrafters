import {z} from "zod";

export const CreateSubmissionSchema = z.object({
  problemID: z.number().int().min(1, {
    message: 'Problem ID is required.'
  }),
  languageID: z.number().int().min(1, {
    message: 'Language ID is required.'
  }),
  code: z.string().min(1, {
    message: 'Code is required.'
  }),
});
