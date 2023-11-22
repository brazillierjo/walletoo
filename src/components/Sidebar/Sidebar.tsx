"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Separator } from "@/src/components/ui/separator";
import { MdHome } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaWallet } from "react-icons/fa6";
import { cn } from "@/src/tools/tailwindMerge";
import Image from "next/image";

export const Sidebar: React.FC = () => {
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
            path: "/account",
            icon: RiAccountPinCircleFill,
        },
    ];

    const isActivelink = (path: string) => {
        return pathname === path;
    };

    return (
        <div className='hidden min-h-screen w-3/12 bg-white dark:bg-black lg:block 2xl:w-2/12'>
            <div className='flex flex-col gap-5 p-6'>
                {session?.user?.image && (
                    <Image
                        src={session.user.image}
                        width={80}
                        height={80}
                        alt='user avatar'
                        className='mx-auto rounded-full'
                    />
                )}
                <h2 className='text-center text-xl font-bold'>
                    {session?.user?.name ?? "..."}
                </h2>
            </div>

            <Separator className='bg-gray-300' />

            <div className='flex flex-col gap-2 py-8 pl-8'>
                {links.map((link, index) => (
                    <Link
                        href={link.path}
                        key={index}
                        className={cn(
                            "flex gap-3 py-2",
                            isActivelink(link.path) &&
                                "border-r-4 border-slate-600 dark:border-white"
                        )}>
                        <link.icon
                            className={cn(
                                "h-6 w-6",
                                !isActivelink(link.path) && "opacity-40"
                            )}
                        />
                        <span
                            className={cn(
                                !isActivelink(link.path) && "opacity-60 hover:opacity-100"
                            )}>
                            {link.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
