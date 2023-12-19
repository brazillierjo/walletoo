"use client";

import { usePathname } from "next/navigation";
import { userAtom } from "@/src/atoms/user.atom";
import { DisabledLink, RouterLink } from "@/src/components/Commons/Links";
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
import { useWindowSize } from "@uidotdev/usehooks";
import { useAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";

export const HeaderItemLinks: React.FC = () => {
  const [user] = useAtom(userAtom);

  const { data: session } = useSession();
  const { width } = useWindowSize();
  const pathname = usePathname();

  const headerLinks = links.filter((link) => link.isInHeader);

  const isActivelink = (to: string) => {
    return pathname === to;
  };

  if (!session || !session.user || !width) return null;

  return width < 1280 ? (
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
  ) : (
    <div className="flex items-center rounded-full bg-secondary px-2 py-1">
      {headerLinks.map((link, index) =>
        link.isSubscribedRequired && !user?.isSubscribed ? (
          <DisabledLink
            key={index}
            link={link}
            className={{
              container: "px-2",
              label: "text-sm",
              active: "rounded-full bg-background py-1",
            }}
          />
        ) : (
          <RouterLink
            key={index}
            link={link}
            isActivelink={isActivelink}
            className={{
              container: "px-2",
              label: "text-sm",
              active: "rounded-full bg-background py-1",
            }}
          />
        )
      )}
    </div>
  );
};
