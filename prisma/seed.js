import { AccountEnum, PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

async function main() {
  // Cria o primeiro usuário
  await prisma.user.create({
    data: {
      name: "Robert Gonçalves Batista",
      email: "robert.contapessoal@gmail.com",
      password: hashSync("12345678"),
      cpf: "11341563758",
    },
  });

  // Cria a conta do sistema
  // Essa conta será usada para receber os ganhos com o SaaS
  await prisma.account.create({
    data: {
      amount: 0,
      typeAccount: "SYSTEM",
      observation: "CONTA USADA PELO SISTEMA PARA RECEBER GANHOS",
    },
  });

  // Cria a conta da Direct.data
  // Essa conta será usada para abastecer o crédito na API do Direct.data
  await prisma.account.create({
    data: {
      amount: 0,
      typeAccount: "EXTERNAL",
      observation: "CONTA USADA PELO SISTEMA PARA ABASTECER A API EXTERNA",
    },
  });

  // Cria a conta do primeiro usuário
  await prisma.account.create({
    data: {
      amount: 100,
      typeAccount: AccountEnum.USER,
      observation: "CONTA USADA PELO SISTEMA PARA RECEBER GANHOS",
      userId: 1,
    },
  });

  if (process.env.NODE_ENV === "development") {
    // Criar registro de CadastroPessoaFisicaBasico para teste
    await prisma.cadastroPessoaFisicaBasico.create({
      data: {
        cpf: "11341563758",
        nome: "ROBERT GONCALVES BATISTA",
        sexo: "Masculino",
        dataNascimento: "19/02/2002 00:00:00",
        nomeMae: "STEFANE RIBEIRO GONCALVES",
        idade: 23,
        signo: "PEIXES",
        telefones: [
          {
            whatsApp: null,
            operadora: null,
            tipoTelefone: "TELEFONE MÓVEL",
            telefoneComDDD: "(22) 998024794",
            telemarketingBloqueado: null,
          },
        ],
        enderecos: [],
        emails: [
          {
            enderecoEmail: "robert_rjgames@outlook.com",
          },
          {
            enderecoEmail: "robert.comunicar@gmail.com",
          },
        ],
        rendaEstimada: "3973.45",
        rendaFaixaSalarial: "Faixa 3 salários mínimos",
      },
    });
  }

  console.log({ message: "Seed executed" });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
