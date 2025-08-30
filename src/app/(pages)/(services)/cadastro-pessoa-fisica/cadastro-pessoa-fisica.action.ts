"use server";

import axios from "axios";
import { parse } from "date-fns";

import db from "@/lib/db";

export async function cadastroPessoaFisicaAction(data: { cpf: string }) {
  try {
    const cpfSearch = data.cpf.replace(/\D/g, "").trim();

    const cadastroPessoaFisica = await db.cadastroPessoaFisica.findFirst({
      where: { cpf: cpfSearch },
    });

    if (!cadastroPessoaFisica) {
      const response = await axios.get(
        "https://apiv3.directd.com.br/api/CadastroPessoaFisica",
        {
          params: {
            TOKEN: "43A15BBB-6C1C-4987-AE6C-05EC14F00865",
            CPF: cpfSearch,
          },
        }
      );

      const novoCadastro = response.data.retorno;

      return await db.cadastroPessoaFisica.create({
        data: {
          ...novoCadastro,
          cpf: cpfSearch,
          rendaEstimada: Number(novoCadastro.rendaEstimada),
          dataNascimento: parse(
            novoCadastro.dataNascimento,
            "dd/MM/yyyy HH:mm:ss",
            new Date()
          ),
        },
      });
    }

    return cadastroPessoaFisica;
  } catch (error) {
    console.log(error);
  }
}
