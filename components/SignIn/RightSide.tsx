"use client";

import { useState } from "react";
import Logo from "@/components/Common/Logo";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export default function RightSide() {
    const [hasAccount, setHasAccount] = useState(true);

    return (
        <div className='relative mt-8 flex flex-col gap-12 overflow-hidden bg-white dark:bg-black px-4 pb-12 md:mt-0 md:w-1/2 md:justify-center lg:w-1/3 lg:px-12'>
            <div className='flex justify-start'>
                <Logo classNames='w-20' />
            </div>

            <div>
                <h1 className='text-3xl font-semibold'>{hasAccount ? "Se connecter" : "S'inscrire"}</h1>
                <h3 className='text-sm'>
                    {hasAccount
                        ? "Bon retour parmis nous, connectez-vous pour accéder à votre Wallet"
                        : "Vous avez raison, il est temps de prendre en main vos finances."}
                </h3>
            </div>

            {hasAccount ? <SignInForm /> : <SignUpForm />}

            <p className='mt-8 text-center text-xs font-light text-gray-700 dark:text-gray-200'>
                {hasAccount ? "Pas encore de compte ? 🤗 " : "Vous avez déjà un compte ? 😎 "}
                <button onClick={() => setHasAccount(!hasAccount)} className='font-medium hover:underline'>
                    {hasAccount ? "Créez-en un" : "Connectez-vous"}
                </button>
            </p>
        </div>
    );
}
