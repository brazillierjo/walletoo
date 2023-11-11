import Link from "next/link";
import Logo from "@/components/Common/Logo";
import { ModeToggle } from "../Common/ModeToggle";
import { buttonVariants } from "@/components/ui/button";
import { Route } from "@/utils/routes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export function Header() {
    return (
        <header>
            <nav className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'>
                <div className='flex items-center text-2xl font-bold'>
                    <Logo size='small' classNames='w-12' />
                    <h2>Waletoo</h2>
                </div>

                <div className='flex gap-3 items-center'>
                    <ModeToggle />

                    <Link href={Route.SIGNIN} className={cn("flex gap-2", buttonVariants({ variant: "outline" }))}>
                        Se connecter <ArrowRightIcon />
                    </Link>
                </div>
            </nav>
        </header>
    );
}
