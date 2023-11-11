import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Waletoo - Page d'accueil",
    description: "Gérez vos finances personnelles en toute simplicité avec Waletoo",
};

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang='fr' suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
