import * as z from "zod";

export const cadastroPessoaFisicaValidation = z.object({
  cpf: z.string(),
});

export type CadastroPessoaFisicaValidator = z.infer<
  typeof cadastroPessoaFisicaValidation
>;
