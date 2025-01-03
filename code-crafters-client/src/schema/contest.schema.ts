import {z} from "zod";

export const CreateContestSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }).max(50, {
    message: 'Title must not exceed 50 characters.',
  }),
  startTime: z.date(),
  endTime: z.date(),
  problems: z.array(z.string()).min(1, {
    message: 'At least one problems is required.',
  }),
});

export const UpdateContestSchema = CreateContestSchema.partial();