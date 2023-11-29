"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/src/components/ui/button"
import { Separator } from "@/src/components/ui/separator"
import { Route } from "@/src/enums/frontendRoutes"
import { links } from "@/src/utils/links"
import { cn } from "@/src/utils/tailwindMerge"
import { signOut, useSession } from "next-auth/react"
import { MdChevronRight } from "react-icons/md"

export const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isContentVisible, setIsContentVisible] = useState(true)

  const sidebarLinks = links.filter((link) => link.isInSidebar)

  const { data: session } = useSession()
  const pathname = usePathname()

  const isActivelink = (to: string) => {
    return pathname === to
  }

  const timeoutVisibleContent = () => {
    setTimeout(() => {
      setIsContentVisible(true)
    }, 200)
  }

  const handleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
    setIsContentVisible(false)
    timeoutVisibleContent()
  }

  return (
    <div
      className={cn(
        "relative hidden min-h-screen bg-white transition-all duration-300 ease-in-out dark:bg-black lg:block",
        isSidebarOpen ? "w-3/12 translate-x-0 2xl:w-2/12" : "w-0 -translate-x-full"
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
              {sidebarLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.to}
                  className={cn(
                    "flex items-center gap-3 py-2",
                    isActivelink(link.to) && "border-r-4 border-slate-600 dark:border-white"
                  )}
                >
                  {link.icon && <link.icon className={cn("h-5 w-5", !isActivelink(link.to) && "opacity-40")} />}
                  <span
                    className={cn(
                      "transition-all duration-100",
                      !isActivelink(link.to) ? "text-sm opacity-60 hover:opacity-100" : "test-base font-bold"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <Button
              className="m-8 mt-auto"
              onClick={() =>
                signOut({
                  callbackUrl: Route.HOME,
                })
              }
            >
              Déconnexion
            </Button>
          </div>
        )}
      </div>

      {/* CHEVRON TO OPEN/CLOSE SIDEBAR */}
      <button onClick={handleSidebar} className="absolute -right-10 top-1/2 m-4 -translate-y-1/2">
        {isSidebarOpen ? (
          <MdChevronRight className="h-5 w-5 rotate-180 opacity-50 transition-all duration-300 hover:opacity-100" />
        ) : (
          <MdChevronRight className="h-5 w-5 rotate-0 opacity-50 transition-all duration-300 hover:opacity-100" />
        )}
      </button>
    </div>
  )
}
