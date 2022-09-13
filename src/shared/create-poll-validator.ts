import { z } from "zod";

export const createQuestionValidator = z.object({
  question: z.string().min(5).max(600),
  options: z
    .array(z.object({ option: z.string().min(2).max(500) }))
    .min(2)
    .max(5),
  endsAt: z.string(),
});
export type CreateQuestionInputType = z.infer<typeof createQuestionValidator>;

export const createPollValidator = z.object({
  text: z.string().min(5).max(600),
  endsAt: z.string(),
  options: z
    .array(z.object({ text: z.string().min(2).max(500) }))
    .min(2)
    .max(5),
});
export type CreatePollInputType = z.infer<typeof createPollValidator>;
