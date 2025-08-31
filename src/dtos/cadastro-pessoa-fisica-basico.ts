import { CadastroPessoaFisicaBasico } from "@prisma/client";

import BaseDTO from "./base";

class CadastroPessoaFisicaBasicoBasicoDTO extends BaseDTO {
  constructor(public readonly dto: CadastroPessoaFisicaBasico) {
    super(dto);
  }

  public toObject(): CadastroPessoaFisicaBasico {
    return this.dto;
  }
}

export default CadastroPessoaFisicaBasicoBasicoDTO;

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
