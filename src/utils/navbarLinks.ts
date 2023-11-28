import { RiAccountPinCircleFill } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import { FaWallet } from "react-icons/fa6";

export const links = [
    {
        name: "Mon dashboard",
        path: "/dashboard",
        icon: BiSolidDashboard,
    },
    {
        name: "Mon wallet",
        path: "/wallet",
        icon: FaWallet,
    },
    {
        name: "Mon compte",
        path: "/account",
        icon: RiAccountPinCircleFill,
    },
];
