"use client";

import Link from "next/link";
import Logo from "@/components/Common/Logo";
import { ModeToggle } from "../Common/ModeToggle";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/utils/routes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";

export function Header() {
    const { data: session } = useSession();

    return (
        <header>
            <nav className='mx-auto flex max-w-7xl items-center justify-between py-3 px-6 lg:px-8'>
                <div className='flex items-center gap-2 text-xl font-bold'>
                    <Logo size='small' classNames='w-10' />
                    <h2>Waletoo</h2>
                </div>

                <div className='flex gap-6 items-center'>
                    {session?.user?.name ? (
                        <div className='flex gap-6 items-center'>
                            <span>Bonjour {session.user.name} 👋</span>
                            <Button onClick={() => signOut()}>Se déconnecter</Button>
                        </div>
                    ) : (
                        <Link href={Route.SIGNIN}>
                            <Button className='flex gap-2'>
                                Se connecter <ArrowRightIcon />
                            </Button>
                        </Link>
                    )}

                    <ModeToggle />
                </div>
            </nav>
        </header>
    );
}
