"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { CgDarkMode } from "react-icons/cg";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleMode = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const isDarkMode = theme === "dark";

  return (
    <div className="flex items-center space-x-2">
      <div className="switch" data-ison={isDarkMode} onClick={handleMode}>
        <motion.div className="handle" layout />
      </div>
      <CgDarkMode className="h-5 w-5" />
    </div>
  );
}
