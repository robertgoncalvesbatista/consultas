import * as z from "zod";

export const SigninValidation = z.object({
  email: z.email({
    error: (iss) => {
      return !iss.input ? "O nome é obrigatório" : "O nome é inválido";
    },
  }),
  password: z
    .string({
      error: (iss) => {
        return !iss.input ? "O email é obrigatório" : "O email é inválido";
      },
    })
    .min(8, {
      error: (iss) => {
        return !iss.input
          ? "O email é obrigatório"
          : "A senha deve ter no mínimo 8 caracteres";
      },
    }),
});

export type SigninValidator = z.infer<typeof SigninValidation>;
