import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Walletoo - Mes widgets",
  description: "Accédez à vos widgets",
};

type Props = {
  children: React.ReactNode;
};

const WidgetsLayout: React.FC<Props> = async ({ children }: Props) => {
  return children as JSX.Element;
};

export default WidgetsLayout;
