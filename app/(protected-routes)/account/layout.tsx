import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Walletoo - Mon compte",
    description: "Gérez vos finances personnelles en toute simplicité avec Walletoo",
};

type Props = {
    children: React.ReactNode;
};

const ProfileLayout: React.FC<Props> = async ({ children }: Props) => {
    return children as JSX.Element;
};

export default ProfileLayout;
