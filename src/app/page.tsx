"use client";

import { Features } from "@/src/components/Home/Features";
import { Hero } from "@/src/components/Home/Hero";
import { Services } from "@/src/components/Home/Services";
import { cn } from "@/src/utils/tailwindMerge";
import { useTheme } from "next-themes";

const Home: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        theme === "dark" ? "radial-gradient-dark" : "radial-gradient-light"
      )}
    >
      <Hero />
      <Services />
      <Features />
    </div>
  );
};

export default Home;
