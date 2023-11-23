import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import { Route } from "@/src/enums/frontend-routes";

function Hero() {
    return (
        <div className='mt-20 flex flex-col justify-center px-6 lg:px-8'>
            <div className='mx-auto flex max-w-2xl flex-col gap-6'>
                <div className='mx-auto mb-8 w-fit justify-center text-center'>
                    <h1 className='rounded-full px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-200 dark:ring-gray-300/50'>
                        Gérez vos finances en toute simplicité 🍀
                    </h1>
                </div>

                <div className='text-center'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'>
                        Enrichissez votre expérience financière
                    </h1>

                    <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200'>
                        Walletoo vous aide à visualiser et optimiser vos finances personnelles avec des graphiques et des calculs intuitifs.
                    </p>

                    <div className='mt-10 flex items-center justify-center gap-x-6'>
                        <Link className={buttonVariants({ variant: "default" })} href={Route.WALLET}>
                            Je me lance ! 😍
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
