"use client";
import { useTheme } from "next-themes";
import { Switch } from "@/src/components/ui/switch";
import { Label } from "@/src/components/ui/label";
import { MdOutlineDarkMode } from "react-icons/md";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const handleMode = () => {
        console.log("chenage");
        theme === "dark" ? setTheme("light") : setTheme("dark");
    };

    return (
        <div className='flex items-center space-x-2'>
            <Switch onClick={handleMode} />
            <MdOutlineDarkMode />
        </div>
    );
}
