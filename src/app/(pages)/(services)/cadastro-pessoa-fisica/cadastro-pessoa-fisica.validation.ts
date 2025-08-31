import * as z from "zod";

export const cadastroPessoaFisicaValidation = z.object({
  cpf: z.string({ error: "Informe o CPF" }),
});

export type CadastroPessoaFisicaValidator = z.infer<
  typeof cadastroPessoaFisicaValidation
>;
