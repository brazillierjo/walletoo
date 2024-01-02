import { LogButton } from "@/src/components/Commons/LogButton";
import { Logo } from "@/src/components/Commons/Logo";
import { ModeToggle } from "@/src/components/Commons/ModeToggle";

export const DesktopHeader: React.FC = () => {
  return (
    <header>
      <nav className="mx-auto flex items-center justify-between px-4 py-2 lg:px-8">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Logo withLabel withCatchPhrase />
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <LogButton withIcon />
        </div>
      </nav>
    </header>
  );
};
