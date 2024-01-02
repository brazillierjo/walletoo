"use client";

import { userAtom } from "@/src/atoms/user.atom";
import { DisabledLink, RouterLink } from "@/src/components/Commons/Links";
import { LogButton } from "@/src/components/Commons/LogButton";
import { Logo } from "@/src/components/Commons/Logo";
import { ModeToggle } from "@/src/components/Commons/ModeToggle";
import { Button } from "@/src/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { IUser } from "@/src/interfaces/userInterface";
import { links, RouterLinkType } from "@/src/utils/links";
import { useWindowSize } from "@uidotdev/usehooks";
import { useAtom } from "jotai";
import { RxHamburgerMenu } from "react-icons/rx";

export const Header: React.FC = () => {
  const [user] = useAtom(userAtom);
  if (!user) return null;

  const { width } = useWindowSize();
  const navigationLinks = links.filter((link) => link.isInHeader || link.isInSidebar);
  const isMobile = width && width < 1280;

  const headerContent = !isMobile ? (
    <>
      <div className="flex items-center gap-2 text-xl font-bold">
        <Logo withLabel withCatchPhrase />
      </div>

      <div className="flex items-center gap-4">
        <ModeToggle />
        <BurgerMenu user={user} navigationLinks={navigationLinks} />
        <LogButton withIcon />
      </div>
    </>
  ) : (
    <BurgerMenu user={user} navigationLinks={navigationLinks} />
  );

  return (
    <header>
      <nav className="mx-auto flex items-center justify-between px-4 py-2 lg:px-8">{headerContent}</nav>
    </header>
  );
};

interface BurgerMenuProps {
  user: IUser;
  navigationLinks: RouterLinkType[];
}

export const BurgerMenu: React.FC<BurgerMenuProps> = ({ user, navigationLinks }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <RxHamburgerMenu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[160px] px-4 py-2">
        {navigationLinks.map((link, index) =>
          link.isSubscribedRequired && !user?.isSubscribed ? (
            <DisabledLink key={index} className={{ container: "my-2" }} link={link} />
          ) : (
            <RouterLink key={index} className={{ container: "my-2" }} link={link} />
          )
        )}

        <div className="mt-4">
          <LogButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
