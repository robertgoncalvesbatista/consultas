"use server";

import axios from "axios";
import { addDays, format } from "date-fns";

export async function requestPaymentAction(
  _prevState: unknown,
  data: { name: string; email: string }
) {
  try {
    // Solicita o pagamento via PIX
    const response = await axios.post(
      "https://ws.suitpay.app/api/v1/gateway/request-qrcode",
      {
        requestNumber: Date.now(),
        dueDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
        amount: 5,
        client: {
          name: data.name ?? "",
          email: data.email ?? "",
          document: "11341563758",
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
