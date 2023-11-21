import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Waletoo - Mon compte",
    description: "Gérez vos finances personnelles en toute simplicité avec Waletoo",
};

type Props = {
    children: React.ReactNode;
};

const ProfileLayout: ({ children }: Props) => Promise<JSX.Element> = async ({
    children,
}: Props) => {
    return children as JSX.Element;
};

export default ProfileLayout;
