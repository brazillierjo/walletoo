"use client";

import { DesktopHeader } from "@/src/components/Header/DesktopHeader";
import { MobileHeader } from "@/src/components/Header/MobileHeader";
import { useWindowSize } from "@uidotdev/usehooks";

export const Header: React.FC = () => {
  const { width } = useWindowSize();
  const isMobile = width && width < 1280;

  if (isMobile) return <MobileHeader />;

  return <DesktopHeader />;
};
