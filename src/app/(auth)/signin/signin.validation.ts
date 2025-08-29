import * as z from "zod";

export const signinValidation = z.object({
  email: z.email(),
  password: z.string(),
});

export type SigninValidator = z.infer<typeof signinValidation>;
