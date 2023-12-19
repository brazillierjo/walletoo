"use client";

import Image from "next/image";
import Link from "next/link";
import WalletooLogo from "@/public/assets/svg/logo-walletoo.svg";
import { Route } from "@/src/enums/frontendRoutes";
import { useWindowSize } from "@uidotdev/usehooks";

type LogoProps = {
  withLabel?: boolean;
  withCatchPhrase?: boolean;
};

export const Logo: React.FC<LogoProps> = ({ withLabel = false, withCatchPhrase = false }) => {
  const { width } = useWindowSize();

  return (
    <Link className="h-fit" href={Route.HOME}>
      <div className="flex items-center gap-4">
        <Image src={WalletooLogo} className="rounded-md p-1 dark:bg-slate-300" alt="Walletoo" height={45} />

        <div className="hidden flex-col lg:flex">
          {withLabel && <h2 className="text-xl">Walletoo</h2>}
          {withCatchPhrase && width && width > 1380 && (
            <h3 className="text-xs">Simplifiez vos finances, maximisez votre succès.</h3>
          )}
        </div>
      </div>
    </Link>
  );
};
