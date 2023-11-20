"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import { redirect } from "next/navigation";
import { Route } from "@/src/enums/frontend-routes";
import { Logo } from "@/src/components/Commons/Logo";

export const RightSide: React.FC = () => {
    const { data: session } = useSession();
    if (session?.user?.name) redirect(Route.WALLET);

    return (
        <div className='flex flex-col gap-16 overflow-hidden px-4 pb-12 md:mt-0 md:w-1/2 md:justify-center lg:w-1/3 lg:px-12'>
            <div className='flex flex-col gap-10'>
                <Logo />

                <div className='flex flex-col gap-3'>
                    <h1 className='text-3xl font-semibold'>Se connecter</h1>
                    <h3 className='text-sm'>Vous avez raison, il est temps de prendre en main vos finances.</h3>
                </div>
            </div>

            <div className='flex flex-col gap-6'>
                <Button role='button' onClick={() => signIn("github")}>
                    Se connecter avec Github
                </Button>
                <Button role='button' className='bg-red-500 text-white' onClick={() => signIn("google")}>
                    Se connecter avec Google
                </Button>
            </div>
        </div>
    );
};
