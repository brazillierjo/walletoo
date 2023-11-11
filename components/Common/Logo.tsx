"use client";

import Image from "next/image";
import WaletooLogoSmall from "@/assets/webp/waletoo-logo-small.webp";
import WaletooLogoMedium from "@/assets/webp/waletoo-logo-medium.webp";
import WaletooLogoLarge from "@/assets/webp/waletoo-logo-wide.webp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <Button variant="ghost">
      <Image
        src={getLogoSrc()}
        alt="Waletoo logo"
        className={cn("rounded-xl", classNames)}
      />
    </Button>
  );
}
