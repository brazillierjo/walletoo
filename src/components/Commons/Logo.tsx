"use client";
import { Route } from "@/src/enums/frontend-routes";
import Link from "next/link";
import WaletooLogo from "@/src/assets/svg/logo-waletoo.svg";
import Image from "next/image";

type LogoProps = {
    withLabel?: boolean;
    withCatchPhrase?: boolean;
};

export const Logo: React.FC<LogoProps> = ({
    withLabel = false,
    withCatchPhrase = false,
}) => {
    return (
        <Link className='h-fit' href={Route.HOME}>
            <div className='flex items-center gap-4'>
                <Image src={WaletooLogo} alt='Waletoo' height={45} />

                <div className='hidden flex-col lg:flex'>
                    {withLabel && <h2 className='text-2xl'>Waletoo</h2>}
                    {withCatchPhrase && (
                        <h3 className='text-xs'>
                            Simplifiez vos finances, maximisez votre succès.
                        </h3>
                    )}
                </div>
            </div>
        </Link>
    );
};
