"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Separator } from "@/src/components/ui/separator";
import { MdHome } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { FaWallet } from "react-icons/fa6";

const Sidebar: React.FC = () => {
    const { data: session } = useSession();

    const links = [
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
            path: "/profile",
            icon: RiAccountPinCircleFill,
        },
        {
            name: "Paramètres",
            path: "/settings",
            icon: IoIosSettings,
        },
    ];

    return (
        <div className='dark:bg-primary-light bg-primary-light min-h-screen w-3/12'>
            <h2 className='px-4 py-8 text-center text-xl font-bold'>{session?.user?.name ?? "..."}</h2>

            <Separator className='bg-gray-300 dark:bg-white' />

            <div className='flex flex-col gap-6 py-8 pl-8'>
                {links.map((link, index) => (
                    <Link href={link.path} key={index} className='flex gap-3'>
                        <link.icon className='h-6 w-6 fill-indigo-500 dark:fill-white' />
                        <span>{link.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
