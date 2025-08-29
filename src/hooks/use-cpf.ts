export function useCPF() {
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const match = numbers.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);

    if (!match) return value;

    const [, p1, p2, p3, p4] = match;

    if (p4) return `${p1}.${p2}.${p3}-${p4}`;
    if (p3) return `${p1}.${p2}.${p3}`;
    if (p2) return `${p1}.${p2}`;
    if (p1) return p1;

    return "";
  };

  const onChangeCPF = (value: string, onChange: (value: string) => void) => {
    const formatted = formatCPF(value);
    onChange(formatted);
  };

  return { formatCPF, onChangeCPF };
}
