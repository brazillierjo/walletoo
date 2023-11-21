"use client";
import { useTheme } from "next-themes";
import { Switch } from "@/src/components/ui/switch";
import { CgDarkMode } from "react-icons/cg";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const handleMode = () => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
    };

    return (
        <div className='flex items-center space-x-2'>
            <Switch onClick={handleMode} />
            <CgDarkMode className='h-5 w-5' />
        </div>
    );
}
