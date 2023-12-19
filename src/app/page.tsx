"use client";

import { useEffect } from "react";
import { sidebarAtom } from "@/src/atoms/sidebar.atom";
import { Features } from "@/src/components/Home/Features";
import { Hero } from "@/src/components/Home/Hero";
import { Services } from "@/src/components/Home/Services";
import { cn } from "@/src/utils/tailwindMerge";
import { useAtom } from "jotai";
import { useTheme } from "next-themes";

const Home: React.FC = () => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(sidebarAtom);

  useEffect(() => {
    isSidebarOpen && setIsSidebarOpen(false);
  }, []);

  return (
    <div
      className={cn(
        theme === "dark" ? "radial-gradient-dark" : "radial-gradient-light",
        "flex flex-col items-center justify-center"
      )}
    >
      <Hero />
      <Services />
      <Features />
    </div>
  );
};

export default Home;
