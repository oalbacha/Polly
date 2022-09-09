import { z } from "zod";

export const createPollValidator = z.object({
  question: z.string().min(5).max(600),
  options: z
    .array(z.object({ option: z.string().min(2).max(500) }))
    .min(2)
    .max(5),
  endsAt: z.date(),
});

export type CreatePollInputType = z.infer<typeof createPollValidator>;
