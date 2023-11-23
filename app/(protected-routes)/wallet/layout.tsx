import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Walletoo - Mon Wallet",
    description: "Gérez vos finances personnelles en toute simplicité avec Walletoo",
};

type Props = {
    children: React.ReactNode;
};

const WalletLayout: ({ children }: Props) => Promise<JSX.Element> = async ({ children }: Props) => {
    return children as JSX.Element;
};

export default WalletLayout;
