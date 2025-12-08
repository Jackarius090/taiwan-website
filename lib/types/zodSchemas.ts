import z from "zod";

export const usernameType = z
  .string()
  .min(1, "name must be between 1 and 20 characters")
  .max(20, "name must be between 1 and 20 characters")
  .regex(/^[\p{L}0-9]+$/u, "name can only be letters and numbers");

export const ZScore = z.object({
  name: z.string(),
  correct: z.number(),
  questions: z.number(),
  incorrectAnswers: z.number(),
});
