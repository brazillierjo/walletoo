"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Route } from "@/src/enums/frontendRoutes";
import { useClickAway, useWindowSize } from "@uidotdev/usehooks";
import { signOut, useSession } from "next-auth/react";
import { GiConfirmed } from "react-icons/gi";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";

interface LogButtonProps {
  withIcon?: boolean;
}

export const LogButton: React.FC<LogButtonProps> = ({ withIcon }) => {
  const [wantsToSignOut, setWantsToSignOut] = useState(false);

  const { data: session } = useSession();
  const { width } = useWindowSize();

  const isMobile = width && width < 1280;

  const ref = useClickAway<HTMLButtonElement>(() => {
    setWantsToSignOut(false);
  });

  const handleSignOut = async () => {
    !wantsToSignOut && setWantsToSignOut(true);

    if (wantsToSignOut) {
      await signOut();
      setWantsToSignOut(false);
    }
  };

  if (!session)
    return (
      <Link href={Route.SIGNIN}>
        <Button className="flex w-fit items-center gap-3">
          {isMobile || withIcon ? " Se connecter" : null}
          <RiLoginBoxLine className="h-4 w-4" />
        </Button>
      </Link>
    );

  return (
    <Button ref={ref} variant={wantsToSignOut ? "destructive" : "default"} onClick={handleSignOut}>
      {withIcon ? (
        !wantsToSignOut ? (
          <div className="flex w-fit items-center gap-3">
            Se déconnecter
            <RiLogoutBoxRLine className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex w-fit items-center gap-3">
            Confirmer
            <GiConfirmed className="h-4 w-4" />
          </div>
        )
      ) : !wantsToSignOut ? (
        "Se déconnecter"
      ) : (
        "Confirmer"
      )}
    </Button>
  );
};
