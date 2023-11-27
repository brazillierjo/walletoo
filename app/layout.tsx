import "@/src/globals.css";
import type { Metadata } from "next";
import SessionProvider from "@/src/Providers/SessionProvider";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/src/Providers/ThemeProvider";
import { Header } from "@/src/components/Header/Header";
import { Sidebar } from "@/src/components/Sidebar/Sidebar";
import { Toaster } from "@/src/components/ui/toaster";
import { cn } from "@/src/utils/tailwindMerge";

const inter = Inter({ subsets: ["latin"] });

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
        <html lang='fr' suppressHydrationWarning>
            <body className={cn(inter.className, "relative bg-slate-200 dark:bg-slate-800")}>
                <SessionProvider session={session}>
                    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                        <div className={session ? "flex" : "block"}>
                            {session && <Sidebar />}

                            <div className='w-full'>
                                <Header />
                                <main>{children}</main>
                                <Toaster />
                            </div>
                        </div>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
