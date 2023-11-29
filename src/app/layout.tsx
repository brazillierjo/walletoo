import "@/src/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Footer } from "@/src/components/Footer/Footer"
import { Header } from "@/src/components/Header/Header"
import { Sidebar } from "@/src/components/Sidebar/Sidebar"
import { Toaster } from "@/src/components/ui/toaster"
import SessionProvider from "@/src/providers/sessionProvider"
import { ThemeProvider } from "@/src/providers/themeProvider"
import { cn } from "@/src/utils/tailwindMerge"
import { getServerSession } from "next-auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Walletoo - Page d'accueil",
  description: "Gérez vos finances personnelles en toute simplicité avec Walletoo",
}

interface Props {
  children: React.ReactNode
}

const RootLayout: React.FC<Props> = async ({ children }: Props) => {
  const session = await getServerSession()

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn(inter.className, "relative bg-slate-200 dark:bg-slate-800")}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className={session ? "flex" : "block"}>
              {session && <Sidebar />}

              <div className="w-full">
                <Header />
                <main className="custom-min-h-screen p-4 lg:p-8">{children}</main>
                <Footer />
                <Toaster />
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout