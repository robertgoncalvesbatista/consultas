export default class CadastroPessoaFisicaBasicoDTO {
  constructor(
    public readonly cpf: string,
    public readonly nome: string,
    public readonly sexo: string,
    public readonly dataNascimento: string,
    public readonly nomeMae: string,
    public readonly idade: number,
    public readonly signo: string,
    public readonly telefones: TTelefone[],
    public readonly enderecos: TEndereco[],
    public readonly emails: TEmail[],
    public readonly rendaEstimada: string,
    public readonly rendaFaixaSalarial: string
  ) {}
}

type TTelefone = {
  telefoneComDDD: string;
  telemarketingBloqueado: boolean;
  operadora: string;
  tipoTelefone: string;
  whatsApp: boolean;
};

type TEndereco = {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
};

type TEmail = {
  enderecoEmail: string;
};
