import { RiAccountPinCircleFill } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import { FaWallet } from "react-icons/fa6";

export const links = [
    {
        name: "Mon dashboard",
        path: "/dashboard",
        description: "Accédez à votre dashboard",
        icon: BiSolidDashboard,
    },
    {
        name: "Mon wallet",
        path: "/wallet",
        description: "Accédez à votre wallet",
        icon: FaWallet,
    },
    {
        name: "Mon compte",
        path: "/account",
        description: "Accédez à votre compte",
        icon: RiAccountPinCircleFill,
    },
];
