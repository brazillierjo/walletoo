import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Walletoo - Mon tableau de bord",
  description: "Un visuel de vos finances personnelles en toute simplicité avec Walletoo",
};

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<Props> = async ({ children }: Props) => {
  return children as JSX.Element;
};

export default DashboardLayout;
