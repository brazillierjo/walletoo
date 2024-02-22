import React from "react";
import Link from "next/link";
import { RouterLinkType } from "@/src/utils/links";
import { cn } from "@/src/utils/tailwindMerge";

type LinkProps = {
  link: RouterLinkType;
  isActivelink?: (link: string) => boolean;
  className?: {
    container?: string;
    label?: string;
    active?: string;
  };
  withIcon?: boolean;
};

export const RouterLink: React.FC<LinkProps> = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ link, isActivelink, className, withIcon }, ref) => {
    return (
      <Link
        href={link.to}
        passHref
        ref={ref}
        className={cn(
          "flex items-center gap-3",
          className?.container,
          isActivelink && isActivelink(link.to) && className?.active
        )}
      >
        {withIcon && link.icon && (
          <link.icon className={cn("h-5 w-5", isActivelink && !isActivelink(link.to) && "opacity-40")} />
        )}
        <span
          className={cn(
            "flex items-center gap-2 transition-all duration-100",
            isActivelink && !isActivelink(link.to) ? "opacity-60 hover:opacity-100" : "test-base",
            className?.label ?? "text-sm"
          )}
        >
          {link.label}
        </span>
      </Link>
    );
  }
);
