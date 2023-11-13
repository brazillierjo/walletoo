"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import Logo from "../Common/Logo";
import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function RightSide() {
    const [hasAccount, setHasAccount] = useState(true);

    const { data: session } = useSession();
    if (session?.user?.name) redirect("/");

    return (
        <div className='flex flex-col gap-16 overflow-hidden px-4 pb-12 md:mt-0 md:w-1/2 md:justify-center lg:w-1/3 lg:px-12'>
            <div className='md:flex md:gap-5'>
                <Logo classNames='w-32 min-w-[128px]' />

                <div>
                    <h1 className='text-3xl font-semibold'>{hasAccount ? "Se connecter" : "S'inscrire"}</h1>
                    <h3 className='text-sm'>
                        {hasAccount
                            ? "Bon retour parmis nous, connectez-vous pour accéder à votre Wallet !"
                            : "Vous avez raison, il est temps de prendre en main vos finances."}
                    </h3>
                </div>
            </div>

            <div>
                {hasAccount ? <SignInForm /> : <SignUpForm />}

                <p className='mt-8 text-center text-xs font-light text-gray-700'>
                    {hasAccount ? "Pas encore de compte ? 🤗 " : "Vous avez déjà un compte ? 😎 "}
                    <button onClick={() => setHasAccount(!hasAccount)} className='font-medium hover:underline'>
                        {hasAccount ? "Créez-en un" : "Connectez-vous"}
                    </button>
                </p>
            </div>

            <div className='flex flex-col gap-6'>
                <Button role='button' onClick={() => signIn("github")}>
                    {hasAccount ? "Se connecter" : "S'inscrire"} avec Github
                </Button>
                <Button role='button' className='bg-red-500 text-white' onClick={() => signIn("google")}>
                    {hasAccount ? "Se connecter" : "S'inscrire"} avec Google
                </Button>
            </div>
        </div>
    );
}
