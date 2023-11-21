"use client";
import Link from "next/link";
import { Logo } from "@/src/components/Commons/Logo";
import { ModeToggle } from "@/src/components/Commons/ModeToggle";
import { Button } from "@/src/components/ui/button";
import { Route } from "@/src/enums/frontend-routes";
import { signOut, useSession } from "next-auth/react";
import { IoIosArrowRoundForward } from "react-icons/io";

export const Header: React.FC = () => {
    const { data: session } = useSession();

    return (
        <header>
            <nav className='mx-auto flex items-center justify-between px-4 py-2 lg:px-8'>
                <div className='flex items-center gap-2 text-xl font-bold'>
                    <Logo />
                </div>

                <div className='flex items-center gap-6 rounded-full bg-white px-4 py-2 dark:bg-slate-600'>
                    <ModeToggle />

                    {!session ? (
                        <Link href={Route.SIGNIN}>
                            <Button className='flex gap-2'>
                                Se connecter <IoIosArrowRoundForward />
                            </Button>
                        </Link>
                    ) : (
                        <Button onClick={() => signOut()}>Se déconnecter</Button>
                    )}
                </div>
            </nav>
        </header>
    );
};
