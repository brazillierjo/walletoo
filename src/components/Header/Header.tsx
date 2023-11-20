"use client";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/src/components/Commons/Logo";
import { ModeToggle } from "@/src/components/Commons/ModeToggle";
import { Button } from "@/src/components/ui/button";
import { Route } from "@/src/enums/frontend-routes";
import { signOut, useSession } from "next-auth/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
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
        <header>
            <nav className='mx-auto flex items-center justify-between px-4 py-2 lg:px-8'>
                <div className='flex items-center gap-2 text-xl font-bold'>
                    <Logo />
                </div>

                <div className='flex items-center gap-6 rounded-full bg-white px-4 py-2 dark:bg-slate-600'>
                    {!session && (
                        <Link href={Route.SIGNIN}>
                            <Button className='flex gap-2'>
                                Se connecter <IoIosArrowRoundForward />
                            </Button>
                        </Link>
                    )}

                    <ModeToggle />

                    {session?.user?.image && (
                        <Image
                            src={session.user.image}
                            width={40}
                            height={40}
                            alt='user avatar'
                            className='rounded-full'
                        />
                    )}

                    {session?.user?.name && (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <RxHamburgerMenu />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={Route.WALLET}>Mon Wallet</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={Route.PROFILE}>Mon compte</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={Route.SETTINGS}>Paramètres</Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <Button onClick={() => signOut()}>
                                        Se déconnecter
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>
        </header>
    );
};
