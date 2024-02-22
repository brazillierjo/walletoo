"use client";

import { RouterLink } from "@/src/components/Commons/Links";
import { LogButton } from "@/src/components/Commons/LogButton";
import { Logo } from "@/src/components/Commons/Logo";
import { ModeToggle } from "@/src/components/Commons/ModeToggle";
import { Button } from "@/src/components/ui/button";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "@/src/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { links } from "@/src/utils/links";
import { RxHamburgerMenu } from "react-icons/rx";

export const Header: React.FC = () => {
  const navigationLinks = links.filter((link) => link.isInHeader || link.isInSidebar);

  return (
    <header className="flex h-14 w-full items-center justify-between px-4 md:px-6">
      <Logo withLabel withCatchPhrase />

      <div className="hidden lg:block">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            {navigationLinks.map((link, index) => (
              <NavigationMenuLink key={index} asChild>
                <RouterLink key={index} link={link} />
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="outline">
              <RxHamburgerMenu className="h-4 w-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <div className="grid gap-2 py-6">
              {navigationLinks.map((link, index) => (
                <RouterLink key={index} className={{ container: "my-2" }} link={link} withIcon />
              ))}

              <div className="mt-5">
                <LogButton withIcon />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <ModeToggle />
        <LogButton withIcon />
      </div>
    </header>
  );
};
