import { ElementType } from "react";
import { Route } from "@/src/enums/frontendRoutes";
import { BiSolidDashboard } from "react-icons/bi";
import { FaWallet } from "react-icons/fa6";
import { FcDoughnutChart } from "react-icons/fc";
import { IoHome } from "react-icons/io5";
import { RiAccountPinCircleFill } from "react-icons/ri";

export type RouterLinkType = {
  label: string;
  to: string;
  description: string;
  icon?: ElementType | null;
  isInSidebar: boolean;
  isInHeader: boolean;
  isInFooter: boolean;
  isSubscribedRequired: boolean;
};

export const links: RouterLinkType[] = [
  {
    label: "Accueil",
    to: Route.HOME,
    description: "Accédez à la page d'accueil",
    icon: IoHome,
    isInSidebar: true,
    isInHeader: true,
    isInFooter: false,
    isSubscribedRequired: false,
  },
  {
    label: "Dashboard",
    to: Route.DASHBOARD,
    description: "Accédez à votre dashboard",
    icon: BiSolidDashboard,
    isInSidebar: true,
    isInHeader: true,
    isInFooter: false,
    isSubscribedRequired: false,
  },
  {
    label: "Mon Wallet",
    to: Route.WALLET,
    description: "Accédez à votre wallet",
    icon: FaWallet,
    isInSidebar: true,
    isInHeader: true,
    isInFooter: false,
    isSubscribedRequired: false,
  },
  {
    label: "Ma stratégie",
    to: Route.STRATEGY,
    description: "Accédez à votre stratégie personnalisée",
    icon: FcDoughnutChart,
    isInSidebar: true,
    isInHeader: true,
    isInFooter: false,
    isSubscribedRequired: true,
  },
  {
    label: "Mon compte",
    to: Route.ACCOUNT,
    description: "Accédez à votre compte",
    icon: RiAccountPinCircleFill,
    isInSidebar: true,
    isInHeader: true,
    isInFooter: false,
    isSubscribedRequired: false,
  },
  {
    label: "Contact",
    to: Route.CONTACT,
    description: "Contactez-nous pour toute question ou suggestion",
    isInSidebar: false,
    isInHeader: false,
    isInFooter: true,
    isSubscribedRequired: false,
  },
  {
    label: "CGU",
    to: Route.TERMS,
    description: "Consultez nos conditions générales d'utilisation",
    isInSidebar: false,
    isInHeader: false,
    isInFooter: true,
    isSubscribedRequired: false,
  },
  {
    label: "Confidentialité",
    to: Route.PRIVACY,
    description: "Consultez notre politique de confidentialité",
    isInSidebar: false,
    isInHeader: false,
    isInFooter: true,
    isSubscribedRequired: false,
  },
];
