import { MdHome } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaWallet } from "react-icons/fa6";

export const links = [
    {
        name: "Accueil",
        path: "/",
        icon: MdHome,
    },
    {
        name: "Mon Wallet",
        path: "/wallet",
        icon: FaWallet,
    },
    {
        name: "Mon compte",
        path: "/account",
        icon: RiAccountPinCircleFill,
    },
];
