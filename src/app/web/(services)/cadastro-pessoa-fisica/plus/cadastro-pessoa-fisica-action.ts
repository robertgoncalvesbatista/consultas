"use server";

import axios from "axios";

import { auth } from "@/auth";
import db from "@/lib/db";

import { AccountEnum } from "@prisma/client";

const TAXA_API = 0.36;

async function requestDirectData(cpf: string) {
  const response = await axios.get(
    "https://apiv3.directd.com.br/api/CadastroPessoaFisicaPlus",
    {
      params: {
        TOKEN: process.env.TOKEN_DIRECT_API,
        CPF: cpf,
      },
    }
  );

  return response.data.retorno;
}

async function updateAmount(usuarioId: number, requestAPI: boolean) {
  // Diminui o amount da conta do usuário
  await db.account.update({
    where: { userId: usuarioId },
    data: { amount: { decrement: TAXA_API * 2 } },
  });

  if (!requestAPI) {
    // Aumenta o amount da conta do SaaS
    await db.account.update({
      where: { typeAccount: AccountEnum.SYSTEM, id: 1 },
      data: { amount: { increment: TAXA_API * 2 } },
    });
  } else {
    // Aumenta o amount da conta do SaaS
    await db.account.update({
      where: { typeAccount: AccountEnum.SYSTEM, id: 1 },
      data: { amount: { increment: TAXA_API } },
    });

    // Aumenta o amount da conta da API
    await db.account.update({
      where: { typeAccount: AccountEnum.EXTERNAL, id: 2 },
      data: { amount: { increment: TAXA_API } },
    });
  }
}

export async function cadastroPessoaFisicaAction(data: { cpf: string }) {
  const session = await auth();

  try {
    const cpfSearch = data.cpf.replace(/\D/g, "").trim();

    const cadastroPessoaFisica = await db.cadastroPessoaFisicaPlus.findFirst({
      where: { cpf: cpfSearch },
    });

    // Busca o usuário que está logado
    const usuario = await db.user.findFirst({
      where: { email: session?.user?.email ?? "" },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    // Se não encontrar registro no banco de dados,
    // busca na API e guarda
    if (!cadastroPessoaFisica) {
      const response = await requestDirectData(cpfSearch);

      // Atualiza os valores nas contas
      await updateAmount(usuario.id as number, true);

      return await db.cadastroPessoaFisicaPlus.create({
        data: { ...response, cpf: cpfSearch },
      });
    }

    const aMonthAgo = new Date();
    aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);

    // Se a última atualização do registro foi há um mês ou mais,
    // busca na API e atualiza
    if (cadastroPessoaFisica.updatedAt <= aMonthAgo) {
      const response = await requestDirectData(cpfSearch);

      // Atualiza os valores nas contas
      await updateAmount(usuario.id as number, true);

      return await db.cadastroPessoaFisicaPlus.update({
        where: { id: cadastroPessoaFisica.id },
        data: { ...response, cpf: cpfSearch },
      });
    }

    // Atualiza os valores nas contas
    await updateAmount(usuario.id as number, false);

    // Se não for necessário atualizar,
    // retorna o registro do banco de dados
    return cadastroPessoaFisica;
  } catch (error) {
    console.log(error);
  }
}
