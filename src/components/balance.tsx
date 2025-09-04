import { DollarSign } from "lucide-react";

type BalanceProps = {
  valor: number;
};

export function Balance({ valor }: BalanceProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-md mr-3">
      <DollarSign className="h-4 w-4 text-green-600" />
      <span className="text-sm font-medium text-green-700">
        R$ {valor.toFixed(2)}
      </span>
    </div>
  );
}
