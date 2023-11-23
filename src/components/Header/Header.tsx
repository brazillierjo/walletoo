"use client";
import Link from "next/link";
import { Logo } from "@/src/components/Commons/Logo";
import { ModeToggle } from "@/src/components/Commons/ModeToggle";
import { Button } from "@/src/components/ui/button";
import { Route } from "@/src/enums/frontend-routes";
import { signOut, useSession } from "next-auth/react";
import { PiSignInBold, PiSignOut } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { links } from "@/src/utils/sidebarLinks";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export const Header: React.FC = () => {
    const { data: session } = useSession();

    return (
        <header className='bg-white dark:bg-black'>
            <nav className='mx-auto flex items-center justify-between px-4 py-2 lg:px-8'>
                <div className='flex items-center gap-2 text-xl font-bold'>
                    <Logo withLabel withCatchPhrase />
                </div>

                <div className='flex items-center gap-6 rounded-full bg-white px-4 py-2 dark:bg-slate-600'>
                    <ModeToggle />

                    {session?.user?.name && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <RxHamburgerMenu />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {links.map((link, index) => (
                                    <DropdownMenuItem key={index} className='flex gap-2'>
                                        <link.icon className='h-4 w-4' />
                                        <Link href={link.path}>{link.name}</Link>
                                    </DropdownMenuItem>
                                ))}

                                <Button className='mt-1 w-full' onClick={() => signOut()}>
                                    Déconnexion
                                </Button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {!session ? (
                        <Link href={Route.SIGNIN}>
                            <Button className='flex gap-2'>
                                <PiSignInBold />
                            </Button>
                        </Link>
                    ) : (
                        <Button onClick={() => signOut()}>
                            <PiSignOut className='rotate-180' />
                        </Button>
                    )}
                </div>
            </nav>
        </header>
    );
};
