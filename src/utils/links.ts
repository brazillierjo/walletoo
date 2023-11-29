import { ElementType } from "react";
import { Route } from "@/src/enums/frontendRoutes";
import { BiSolidDashboard } from "react-icons/bi";
import { FaWallet } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { RiAccountPinCircleFill } from "react-icons/ri";

type Link = {
  label: string;
  to: string;
  description: string;
  icon?: ElementType | null;
  isInSidebar: boolean;
  isInHeader: boolean;
  isInFooter: boolean;
};

export const links: Link[] = [
  {
    label: "Accueil",
    to: Route.HOME,
    description: "Accédez à la page d'accueil",
    icon: IoHome,
    isInSidebar: false,
    isInHeader: true,
    isInFooter: false,
  },
  {
    label: "Mon dashboard",
    to: Route.DASHBOARD,
    description: "Accédez à votre dashboard",
    icon: BiSolidDashboard,
    isInSidebar: true,
    isInHeader: true,
    isInFooter: false,
  },
  {
    label: "Mon wallet",
    to: Route.WALLET,
    description: "Accédez à votre wallet",
    icon: FaWallet,
    isInSidebar: true,
    isInHeader: true,
    isInFooter: false,
  },
  {
    label: "Mon compte",
    to: Route.ACCOUNT,
    description: "Accédez à votre compte",
    icon: RiAccountPinCircleFill,
    isInSidebar: true,
    isInHeader: true,
    isInFooter: false,
  },
  {
    label: "Contact",
    to: Route.CONTACT,
    description: "Contactez-nous pour toute question ou suggestion",
    isInSidebar: false,
    isInHeader: false,
    isInFooter: true,
  },
  {
    label: "A propos",
    to: Route.ABOUT,
    description: "En savoir plus sur Walletoo",
    isInSidebar: false,
    isInHeader: false,
    isInFooter: true,
  },
  {
    label: "CGU",
    to: Route.TERMS,
    description: "Consultez nos conditions générales d'utilisation",
    isInSidebar: false,
    isInHeader: false,
    isInFooter: true,
  },
  {
    label: "Confidentialité",
    to: Route.PRIVACY,
    description: "Consultez notre politique de confidentialité",
    isInSidebar: false,
    isInHeader: false,
    isInFooter: true,
  },
  {
    label: "Mentions légales",
    to: Route.LEGAL_NOTICE,
    description: "Consultez nos mentions légales",
    isInSidebar: false,
    isInHeader: false,
    isInFooter: true,
  },
];
