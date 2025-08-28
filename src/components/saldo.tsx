import { Wallet } from "lucide-react";

import { Badge } from "./ui/badge";

type SaldoProps = {
  valor: number;
};

export function Saldo({ valor }: SaldoProps) {
  return (
    <Badge
      variant="default"
      className="flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold mr-4"
    >
      <Wallet />
      R$ {valor.toFixed(2).replace(".", ",")}
    </Badge>
  );
}
