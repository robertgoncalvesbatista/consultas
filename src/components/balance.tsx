import { Wallet } from "lucide-react";

import { Badge } from "./ui/badge";

type BalanceProps = {
  valor: number;
};

export function Balance({ valor }: BalanceProps) {
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
