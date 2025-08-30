"use server";

import axios from "axios";
import { addDays, format } from "date-fns";

import { auth } from "@/auth";
import db from "@/lib/db";

export type ResponsePIX = {
  idTransaction: string;
  paymentCode: string;
  response: string;
  paymentCodeBase64: string;
};

export async function billingAction(data: { valor: string }) {
  const session = await auth();

  try {
    const usuario = await db.user.findFirst({
      where: { email: session?.user?.email ?? "" },
    });

    // Solicita o pagamento via PIX
    const response = await axios.post<ResponsePIX>(
      "https://ws.suitpay.app/api/v1/gateway/request-qrcode",
      {
        requestNumber: Date.now(),
        dueDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
        amount: data.valor,
        client: {
          name: session?.user?.name ?? "",
          email: session?.user?.email ?? "",
          document: usuario?.cpf ?? "",
        },
      },
      {
        headers: {
          ci: process.env.CLIENT_ID,
          cs: process.env.CLIENT_SECRET,
        },
      }
    );

    // Retorna os dados de pagamento
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
