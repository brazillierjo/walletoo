"use client";
import Image from "next/image";
import WaletooLogoSmall from "@/ui/assets/webp/waletoo-logo-small.webp";
import WaletooLogoMedium from "@/ui/assets/webp/waletoo-logo-medium.webp";
import WaletooLogoLarge from "@/ui/assets/webp/waletoo-logo-wide.webp";
import Link from "next/link";
import { cn } from "@/core/utils/utils";

interface LogoProps {
    size?: "small" | "medium" | "large";
    classNames?: string;
}

export default function Logo({ size = "large", classNames }: LogoProps) {
    const getLogoSrc = () => {
        switch (size) {
            case "small":
                return WaletooLogoSmall;
            case "medium":
                return WaletooLogoMedium;
            case "large":
                return WaletooLogoLarge;
            default:
                return WaletooLogoLarge;
        }
    };

    return (
        <Link href='/'>
            <button>
                <Image src={getLogoSrc()} alt='Waletoo logo' className={cn("rounded-xl", classNames)} />
            </button>
        </Link>
    );
}
