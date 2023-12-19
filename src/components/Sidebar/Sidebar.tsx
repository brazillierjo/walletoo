"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { userAtom } from "@/src/atoms/user.atom";
import { DisabledLink, RouterLink } from "@/src/components/Commons/Links";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { Route } from "@/src/enums/frontendRoutes";
import { links } from "@/src/utils/links";
import { cn } from "@/src/utils/tailwindMerge";
import { useAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";

export const Sidebar: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const sidebarLinks = links.filter((link) => link.isInSidebar);

  const { data: session } = useSession();
  const pathname = usePathname();

  const isActivelink = (to: string) => {
    return pathname === to;
  };

  const timeoutVisibleContent = () => {
    setTimeout(() => {
      setIsContentVisible(true);
    }, 200);
  };

  const handleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    setIsContentVisible(false);
    timeoutVisibleContent();
  };

  return (
    <div
      className={cn(
        "relative hidden min-h-screen transition-all duration-100 ease-in-out lg:block",
        isSidebarOpen ? "w-1/4 translate-x-0 xl:w-[15%] xl:min-w-[250px]" : "w-0 -translate-x-full"
      )}
    >
      <div className="h-screen overflow-y-hidden">
        {isSidebarOpen && isContentVisible && (
          <div className="flex h-full flex-col">
            <div className="flex flex-col gap-5 p-6">
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  width={80}
                  height={80}
                  alt="user avatar"
                  className="mx-auto rounded-full"
                />
              )}
              <h2 className="text-center text-xl font-bold">{session?.user?.name ?? "..."}</h2>
            </div>

            <Separator className="bg-gray-300" />

            <div className="flex flex-col gap-2 py-8 pl-8">
              {sidebarLinks.map((link, index) => {
                return link.isSubscribedRequired && !user?.isSubscribed ? (
                  <DisabledLink
                    key={index}
                    link={link}
                    className={{ container: "py-2", active: "border-r-2 border-secondary-foreground" }}
                    withIcon
                  />
                ) : (
                  <RouterLink
                    key={index}
                    link={link}
                    className={{ container: "py-2", active: "border-r-2 border-secondary-foreground" }}
                    isActivelink={isActivelink}
                    withIcon
                  />
                );
              })}
            </div>

            <div className="m-8 mt-auto flex flex-col gap-3">
              <Button
                className="w-full"
                onClick={() =>
                  signOut({
                    callbackUrl: Route.HOME,
                  })
                }
              >
                Déconnexion
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* CHEVRON TO OPEN/CLOSE SIDEBAR */}
      <button
        onClick={handleSidebar}
        className={cn(
          "absolute top-[55px] z-50 m-5 opacity-60 hover:opacity-100",
          isSidebarOpen ? "right-0" : "-right-12"
        )}
      >
        <TbLayoutSidebarLeftCollapseFilled
          className={cn("h-6 w-6 transition-all duration-300 hover:opacity-100", {
            "rotate-0": isSidebarOpen,
            "rotate-180": !isSidebarOpen,
          })}
        />
      </button>
    </div>
  );
};
