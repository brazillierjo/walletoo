import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import SessionProvider from "@/src/Providers/SessionProvider";
import { ThemeProvider } from "@/src/Providers/ThemeProvider";
import { Header } from "@/src/components/Header/Header";
import { cn } from "@/src/tools/tailwindMerge";

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
            <body className={cn(inter.className, "relative")}>
                <SessionProvider session={session}>
                    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                        <Header />
                        <main className='px-4 lg:px-8'>{children}</main>
                    </ThemeProvider>
                </SessionProvider>

                <div
                    className='absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl'
                    aria-hidden='true'>
                    <div className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'></div>
                </div>

                <div
                    className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
                    aria-hidden='true'>
                    <div className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'></div>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
