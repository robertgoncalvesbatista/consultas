import * as z from "zod";

export const userValidation = z
  .object({
    name: z.string().optional(),
    email: z.email().optional(),
    cpf: z.string().optional(),
    password: z
      .string()
      .min(8, {
        error: () => "A senha deve ter no mínimo 8 caracteres",
      })
      .optional(),
    "password-confirmation": z
      .string()
      .min(8, {
        error: () => "A confirmação da senha deve ter no mínimo 8 caracteres",
      })
      .optional(),
  })
  .refine(
    (data) => {
      return data["password"] === data["password-confirmation"];
    },
    {
      message: "As senhas devem ser iguais",
      path: ["password-confirmation"],
    }
  );

export type UserValidator = z.infer<typeof userValidation>;
