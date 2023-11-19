import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Waletoo - Mes paramètres",
    description: "Gérez vos finances personnelles en toute simplicité avec Waletoo",
};

type Props = {
    children: React.ReactNode;
};

const SettingsLayout: ({ children }: Props) => Promise<JSX.Element> = async ({ children }: Props) => {
    return children as JSX.Element;
};

export default SettingsLayout;
