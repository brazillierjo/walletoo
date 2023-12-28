"use client";

import Image from "next/image";
import Link from "next/link";
import HeroSectionImage from "@/public/assets/webp/hero-section.webp";
import { Button } from "@/src/components/ui/button";
import { Route } from "@/src/enums/frontendRoutes";
import { BiSolidWallet } from "react-icons/bi";

export const Hero: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto grid max-w-screen-xl px-4 pb-8 pt-20 md:px-20 lg:grid-cols-12 lg:gap-8 lg:py-16 lg:pt-28 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
            Optimisez votre budget en un clin d'oeil
          </h1>

          <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400">
            Analysez et gérez vos finances personnelles avec précision et simplicité.
          </p>

          <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 dark:text-gray-400">
            Découvrez comment nos outils d'analyse financière avancés peuvent transformer votre manière de gérer les
            revenus et les dépenses. Grâce à des graphiques intuitifs et une catégorisation des transactions, prenez le
            contrôle total de votre budget mensuel.
          </p>

          <div className="space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
            <Link href={Route.WALLET}>
              <Button className="flex h-12 items-center gap-3" variant="outline">
                <BiSolidWallet />
                Accéder à mon Wallet
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden lg:col-span-5 lg:ml-4 lg:mt-0 lg:flex">
          <Image src={HeroSectionImage} className="rounded-md object-cover" alt="Hero section" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
