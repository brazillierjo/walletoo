import "@/src/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/src/components/Footer/Footer";
import { Header } from "@/src/components/Header/Header";
import { Sidebar } from "@/src/components/Sidebar/Sidebar";
import { Toaster } from "@/src/components/ui/toaster";
import JotaiProvider from "@/src/providers/JotaiProvider";
import SessionProvider from "@/src/providers/SessionProvider";
import ThemeProvider from "@/src/providers/ThemeProvider";
import { cn } from "@/src/utils/tailwindMerge";
import { getServerSession } from "next-auth";

const montSerrat = Inter({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Walletoo - Page d'accueil",
  description: "Gérez vos finances personnelles en toute simplicité avec Walletoo",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = async ({ children }: Props) => {
  const session = await getServerSession();

  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn(montSerrat.className, "relative bg-background")}>
        <JotaiProvider>
          <SessionProvider session={session}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <div className={session ? "flex" : "block"}>
                {session && <Sidebar />}

                <div className="w-full">
                  <Header />
                  <main className="custom-min-h-screen bg-secondary">{children}</main>
                  <Footer />
                  <Toaster />
                </div>
              </div>
            </ThemeProvider>
          </SessionProvider>
        </JotaiProvider>
      </body>
    </html>
  );
};

export default RootLayout;
