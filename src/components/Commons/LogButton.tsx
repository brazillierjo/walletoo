import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Route } from "@/src/enums/frontendRoutes";
import { useWindowSize } from "@uidotdev/usehooks";
import { signOut, useSession } from "next-auth/react";
import { GoSignIn, GoSignOut } from "react-icons/go";

interface LogButtonProps {
  withIcon?: boolean;
}

export const LogButton: React.FC<LogButtonProps> = ({ withIcon }) => {
  const [wantsToSignOut, setWantsToSignOut] = useState(false);

  const { data: session } = useSession();
  const { width } = useWindowSize();

  const isMobile = width && width < 1280;

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWantsToSignOut(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []); // Ensure this effect runs only on client-side

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
          <GoSignOut className="h-4 w-4" />
        </Button>
      </Link>
    );

  return (
    <Button
      variant={wantsToSignOut ? "destructive" : "default"}
      onClick={handleSignOut}
      onKeyDown={(e) => e.key === "Escape" && setWantsToSignOut(false)}
    >
      {withIcon ? (
        !wantsToSignOut ? (
          <div className="flex w-fit items-center gap-1">
            Déconnexion
            <GoSignOut className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex w-fit items-center gap-1">
            Confirmer
            <GoSignIn className="h-4 w-4" />
          </div>
        )
      ) : !wantsToSignOut ? (
        "Déconnexion"
      ) : (
        "Confirmer"
      )}
    </Button>
  );
};
