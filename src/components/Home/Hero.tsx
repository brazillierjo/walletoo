"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Route } from "@/src/enums/frontendRoutes";
import { useScroll } from "@/src/hooks/useScroll";

export const Hero: React.FC = () => {
  const scrollTo = useScroll();

  return (
    <section className="custom-min-h-screen flex flex-col items-center justify-center py-12">
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold xl:text-5xl">Gérez vos finances en toute simplicité.</h1>

        <p className="max-w-2xl px-4 text-center text-lg text-gray-600 dark:text-gray-400">
          Notre outil vous permet de suivre vos revenus et vos charges, et de générer des graphiques et des calculs pour
          vous aider à prendre les meilleures décisions financières.
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button size="lg" variant="secondary" onClick={() => scrollTo("details")}>
            En savoir plus
          </Button>

          <Link href={Route.WALLET}>
            <Button size="lg">J'accède à mon Wallet</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
