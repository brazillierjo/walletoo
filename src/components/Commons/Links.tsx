import Link from "next/link";
import { RouterLinkType } from "@/src/utils/links";
import { cn } from "@/src/utils/tailwindMerge";
import { FaLock } from "react-icons/fa6";

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

export const DisabledLink: React.FC<LinkProps> = ({ link, className, withIcon }) => {
  return (
    <div className={cn("flex items-center gap-2 opacity-60", className?.container)}>
      {withIcon && link.icon && <link.icon className="h-5 w-5" />}
      <span className={cn("flex items-center gap-2 transition-all duration-100", className?.label ?? "text-sm")}>
        {link.label}
        <FaLock className="h-3 w-3" />
      </span>
    </div>
  );
};

export const RouterLink: React.FC<LinkProps> = ({ link, isActivelink, className, withIcon }) => {
  return (
    <Link
      href={link.to}
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
};
