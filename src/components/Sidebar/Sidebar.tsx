"use client";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Separator } from "@/src/components/ui/separator";
import { cn } from "@/src/utils/tailwindMerge";
import { useState } from "react";
import { MdChevronRight } from "react-icons/md";
import { links } from "@/src/utils/sidebarLinks";

export const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(true);

    const { data: session } = useSession();
    const pathname = usePathname();

    const isActivelink = (path: string) => {
        return pathname === path;
    };

    const timeoutVisibleContent = () => {
        setTimeout(() => {
            setIsContentVisible(true);
        }, 200);
    };

    const handleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
        setIsContentVisible(false);
        timeoutVisibleContent();
    };

    return (
        <div
            className={cn(
                "relative hidden min-h-screen bg-white transition-all duration-300 ease-in-out dark:bg-black lg:block",
                isSidebarOpen ? "w-3/12 translate-x-0 2xl:w-2/12" : "w-0 -translate-x-full"
            )}>
            {isSidebarOpen && isContentVisible && (
                <>
                    <div className='flex flex-col gap-5 p-6'>
                        {session?.user?.image && (
                            <Image src={session.user.image} width={80} height={80} alt='user avatar' className='mx-auto rounded-full' />
                        )}
                        <h2 className='text-center text-xl font-bold'>{session?.user?.name ?? "..."}</h2>
                    </div>

                    <Separator className='bg-gray-300' />

                    <div className='flex flex-col gap-2 py-8 pl-8'>
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.path}
                                className={cn(
                                    "flex items-center gap-3 py-2",
                                    isActivelink(link.path) && "border-r-4 border-slate-600 dark:border-white"
                                )}>
                                <link.icon className={cn("h-5 w-5", !isActivelink(link.path) && "opacity-40")} />
                                <span
                                    className={cn(
                                        "transition-all duration-100",
                                        !isActivelink(link.path) ? "text-sm opacity-60 hover:opacity-100" : "test-base font-bold"
                                    )}>
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            {/* CHEVRON TO OPEN/CLOSE SIDEBAR */}
            <button onClick={handleSidebar} className='absolute -right-10 top-1/2 m-4 -translate-y-1/2'>
                {isSidebarOpen ? (
                    <MdChevronRight className='h-5 w-5 rotate-180 opacity-50 transition-all duration-300 hover:opacity-100' />
                ) : (
                    <MdChevronRight className='h-5 w-5 rotate-0 opacity-50 transition-all duration-300 hover:opacity-100' />
                )}
            </button>
        </div>
    );
};
