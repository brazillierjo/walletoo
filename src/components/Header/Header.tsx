"use client";

import Link from "next/link";
import { userAtom } from "@/src/atoms/user.atom";
import { DisabledLink, RouterLink } from "@/src/components/Commons/Links";
import { Logo } from "@/src/components/Commons/Logo";
import { ModeToggle } from "@/src/components/Commons/ModeToggle";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Route } from "@/src/enums/frontendRoutes";
import { links } from "@/src/utils/links";
import { useAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";
import { PiSignInBold, PiSignOut } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

export const Header: React.FC = () => {
  const [user] = useAtom(userAtom);
  const { data: session } = useSession();

  const headerLinks = links.filter((link) => link.isInHeader);

  return (
    <header className="bg-background">
      <nav className="mx-auto flex items-center justify-between px-4 py-2 lg:px-8">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Logo withLabel withCatchPhrase />
        </div>

        <div className="flex items-center gap-6 rounded-full bg-secondary px-4 py-2">
          <ModeToggle />

          {session?.user?.name && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                  <RxHamburgerMenu />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {headerLinks.map((link, index) =>
                  link.isSubscribedRequired && !user?.isSubscribed ? (
                    <DropdownMenuItem key={index} className="flex gap-2">
                      <DisabledLink key={index} link={link} withIcon />
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem key={index} className="flex gap-2">
                      <RouterLink key={index} link={link} withIcon />
                    </DropdownMenuItem>
                  )
                )}

                <Button
                  className="mt-1 w-full"
                  onClick={() =>
                    signOut({
                      callbackUrl: Route.SIGNIN,
                    })
                  }
                >
                  Déconnexion
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!session ? (
            <Link href={Route.SIGNIN}>
              <Button className="flex gap-2">
                <PiSignInBold />
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: Route.SIGNIN,
                })
              }
            >
              <PiSignOut className="rotate-180" />
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};
