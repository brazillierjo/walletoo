import { Logo } from "@/src/components/Commons/Logo";
import { ModeToggle } from "@/src/components/Commons/ModeToggle";
import { HeaderItemLinks } from "@/src/components/Header/HeaderItemLinks";

export const Header: React.FC = () => {
  return (
    <header>
      <nav className="mx-auto flex items-center justify-between px-4 py-2 lg:px-8">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Logo withLabel withCatchPhrase />
        </div>

        <div className="flex items-center gap-6">
          <HeaderItemLinks />

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};
