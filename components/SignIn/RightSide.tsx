"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import Logo from "../Common/Logo";

export default function RightSide() {
    const { data: session } = useSession();

    if (session?.user?.name) redirect("/");

    return (
        <div className='flex flex-col gap-4 overflow-hidden px-4 pb-12 md:mt-0 md:w-1/2 md:justify-center lg:w-1/3 lg:px-12'>
            <div className='mt-8 md:mt-0 flex flex-col lg:flex-row justify-start gap-8'>
                <Logo classNames='w-32' />

                <div>
                    <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-2'>Se connecter</h2>
                    <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
                        Connecte-toi pour accéder à toutes les fonctionnalités !
                    </p>
                </div>
            </div>

            <Button onClick={() => signIn("github")}>Se connecter avec Github</Button>
            <Button className='bg-red-500 text-white' onClick={() => signIn("google")}>
                Se connecter avec Google
            </Button>
        </div>
    );
}
