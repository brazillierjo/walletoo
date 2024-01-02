"use client";

import { userAtom } from "@/src/atoms/user.atom";
import { DisabledLink, RouterLink } from "@/src/components/Commons/Links";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { links } from "@/src/utils/links";
import { useAtom } from "jotai";
import { RxHamburgerMenu } from "react-icons/rx";

export const MobileHeader: React.FC = () => {
  const [user] = useAtom(userAtom);

  const navigationLinks = links.filter((link) => link.isInHeader || link.isInSidebar);

  return (
    <header>
      <nav className="mx-auto flex items-center justify-end px-4 py-2 lg:px-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <RxHamburgerMenu className="h-6 w-6" />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="px-4 py-2">
            {navigationLinks.map((link, index) =>
              link.isSubscribedRequired && !user?.isSubscribed ? (
                <DisabledLink key={index} link={link} />
              ) : (
                <RouterLink className={{ container: "my-1" }} key={index} link={link} />
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
};
