"use server";

import { getServerSession } from "next-auth";

import db from "@/lib/db";
import axios from "axios";
import { addDays, format } from "date-fns";

export async function pixAction(_prevState: any) {
  const session = await getServerSession();

  try {
    console.log(session);

    // const lastRequestPayment = await db.requestPayment.findFirst({
    //   orderBy: { id: "desc" },
    // });

    // const response = await axios.post(
    //   "https://sandbox.ws.suitpay.app",
    //   {
    //     requestNumber: (lastRequestPayment?.id ?? 0) + 1, // Número da solicitação
    //     dueDate: format(addDays(new Date(), 1), "yyyy-MM-dd"), // Data de vencimento
    //     amount: data.amount, // Valor
    //     client: {
    //       name: data.clientName, // Nome completo
    //       document: data.clientDocument, // CPF
    //       email: data.clientEmail, // E-mail
    //     },
    //   },
    //   {
    //     headers: {
    //       ci: process.env.CLIENT_ID,
    //       cs: process.env.CLIENT_SECRET,
    //     },
    //   }
    // );

    // return {
    //   success: true,
    //   message: "Login efetuado com sucesso",
    //   data: response.data,
    // };

    return {
      success: true,
      message: "Login efetuado com sucesso",
    };
  } catch {
    return {
      success: false,
      errors: {
        message: "Ops, algo deu errado",
      },
    };
  }
}
