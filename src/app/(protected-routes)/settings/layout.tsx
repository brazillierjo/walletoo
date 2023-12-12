import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Walletoo - Mes paramètres",
  description: "Paramétrez votre compte Walletoo",
};

type Props = {
  children: React.ReactNode;
};

const SettingsLayout: React.FC<Props> = async ({ children }: Props) => {
  return children as JSX.Element;
};

export default SettingsLayout;
