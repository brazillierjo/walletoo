import "@/src/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/src/Providers/SessionProvider";
import { ThemeProvider } from "@/src/Providers/ThemeProvider";
import { Header } from "@/src/components/Header/Header";
import { cn } from "@/src/tools/tailwindMerge";
import Sidebar from "@/src/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Waletoo - Page d'accueil",
    description: "Gérez vos finances personnelles en toute simplicité avec Waletoo",
};

interface Props {
    children: React.ReactNode;
}

const RootLayout: ({ children }: Props) => Promise<JSX.Element> = async ({ children }: Props) => {
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
                            </div>
                        </div>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;
