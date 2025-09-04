import { CadastroPessoaFisicaPlus } from "@prisma/client";
import BaseDTO from "./base";

export default class CadastroPessoaFisicaPlusDTO extends BaseDTO {
  constructor(public readonly dto: CadastroPessoaFisicaPlus) {
    super(dto);
  }

  public toObject(): CadastroPessoaFisicaPlus {
    return this.dto;
  }
}

export type TTelefone = {
  telefoneComDDD: string;
  telemarketingBloqueado: boolean;
  operadora: string;
  tipoTelefone: string;
  whatsApp: boolean;
};

export type TEndereco = {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
};

export type TEmail = {
  enderecoEmail: string;
};

export type TParentesco = {
  grauParentesco: string;
  cpf: string;
  nome: string;
  dataNascimento: string;
  genero: string;
  obito: boolean;
  dataObito: string;
};
