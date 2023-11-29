import { userAtom } from "@/src/atoms/user.atom";
import { useAtom } from "jotai";

interface FormattedTransactionProps {
  amount: number;
}

const FormattedTransaction: React.FC<FormattedTransactionProps> = ({ amount }) => {
  const [user] = useAtom(userAtom);
  if (!user) return <span>-</span>;

  const hasDecimals = amount % 1 !== 0;

  const formatter = new Intl.NumberFormat(user.transactionFormat === "EU" ? "fr-FR" : "en-US", {
    style: "currency",
    currency: user.currency.name,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};

export default FormattedTransaction;
