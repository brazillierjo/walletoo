import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Walletoo - Ma stratégie personnalisée",
  description: "Une stratégie de gestion de budget personnalisée en fonction de votre situation avec Walletoo",
};

type Props = {
  children: React.ReactNode;
};

const StrategyLayout: React.FC<Props> = async ({ children }: Props) => {
  return children as JSX.Element;
};

export default StrategyLayout;
