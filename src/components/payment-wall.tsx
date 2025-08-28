import { Session } from "next-auth";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { requestPaymentAction } from "@/app/(pages)/(services)/cadastro-pessoa-fisica/(actions)/requestPaymentAction";
import Image from "next/image";

export default function PaymentWall({ session }: { session: Session }) {
  const [state, formAction, isPending] = useActionState(
    requestPaymentAction,
    null
  );

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          onClick={() => {
            formAction({
              name: session.user?.name ?? "",
              email: session.user?.email ?? "",
            });
          }}
        >
          Consultar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagamento</DialogTitle>
          <DialogDescription>Pague com PIX para consultar.</DialogDescription>
        </DialogHeader>

        {state && (
          <div>
            <Image
              src={`data:image/png;base64,${state.paymentCodeBase64}`}
              alt="QR Code de pagamento via PIX"
              width={300}
              height={300}
              style={{ margin: "0 auto" }}
            />

            <p
              style={{
                fontSize: "8pt",
                maxWidth: "100%",
                wordWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {state.paymentCode}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
