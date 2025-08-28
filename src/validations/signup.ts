import * as z from "zod";

export const SignupValidation = z
  .object({
    name: z.string({
      error: (iss) => {
        return !iss.input ? "O nome é obrigatório" : "O nome é inválido";
      },
    }),
    email: z.email({
      error: (iss) => {
        return !iss.input ? "O email é obrigatório" : "O email é inválido";
      },
    }),
    cpf: z.string({
      error: (iss) => {
        return !iss.input ? "O cpf é obrigatório" : "O cpf é inválido";
      },
    }),
    password: z
      .string({
        error: (iss) => {
          return !iss.input ? "A senha é obrigatória" : "A senha é inválida";
        },
      })
      .min(8, {
        error: (iss) => {
          return !iss.input
            ? "A senha é obrigatória"
            : "A senha deve ter no mínimo 8 caracteres";
        },
      }),
    "password-confirmation": z
      .string({
        error: (iss) => {
          return !iss.input
            ? "A confirmação da senha é obrigatória"
            : "A confirmação da senha é inválida";
        },
      })
      .min(8, {
        error: (iss) => {
          return !iss.input
            ? "O confirmação da senha é obrigatória"
            : "A confirmação da senha deve ter no mínimo 8 caracteres";
        },
      }),
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

export type SignupValidator = z.infer<typeof SignupValidation>;
