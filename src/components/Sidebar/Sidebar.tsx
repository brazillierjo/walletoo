"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Separator } from "@/src/components/ui/separator";
import { MdHome } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import { FaWallet } from "react-icons/fa6";
import { cn } from "@/src/tools/tailwindMerge";

const Sidebar: React.FC = () => {
    const { data: session } = useSession();
    const pathname = usePathname();

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

    const isActivelink = (path: string) => {
        return pathname === path;
    };

    return (
        <div className='min-h-screen w-3/12 bg-white dark:bg-slate-600'>
            <h2 className='px-4 py-8 text-center text-xl font-bold'>{session?.user?.name ?? "..."}</h2>

            <Separator className='bg-gray-300' />

            <div className='flex flex-col gap-2 py-8 pl-8'>
                {links.map((link, index) => (
                    <Link
                        href={link.path}
                        key={index}
                        className={cn("flex gap-3 py-2", isActivelink(link.path) && "border-r-4 border-indigo-500")}>
                        <link.icon
                            className={cn(
                                "h-6 w-6 fill-indigo-500 dark:fill-white",
                                !isActivelink(link.path) && "opacity-40"
                            )}
                        />
                        <span className={cn(!isActivelink(link.path) && "text-gray-400")}>{link.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
