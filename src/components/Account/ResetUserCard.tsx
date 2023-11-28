"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { useAtom } from "jotai";
import { userAtom } from "@/src/atoms/user.atom";
import { cn } from "@/src/utils/tailwindMerge";
import { useState } from "react";
import { Tooltip } from "@/src/components/Commons/Tooltip";
import ResetBanner from "@/src/assets/webp/reset-banner.webp";
import { UserApi } from "@/src/APIs/userApi";

export const ResetUserCard: React.FC = () => {
    const [hasConfirmedReset, setHasConfirmedReset] = useState(false);
    const [user] = useAtom(userAtom);

    const handleReset = () => {
        !hasConfirmedReset && setHasConfirmedReset(true);

        hasConfirmedReset && UserApi.resetUserData().then(() => window.location.reload());
    };

    if (!user) return null;

    return (
        <Card className='flex w-full flex-col justify-between lg:w-fit lg:min-w-[400px]'>
            <CardHeader className='p-2'>
                <div className='relative'>
                    <picture>
                        <img className='h-32 w-full rounded-md object-cover' src={ResetBanner.src} alt='Reset banner' />
                    </picture>

                    <div className='float-right'>
                        <Tooltip
                            title='Demande de réinitialisation des données'
                            description='En confirmant la réinitialisation de vos données, vous supprimerez vos données de personnalisation (revenus, dépenses, format des transactions et devise). Cette action est irréversible.'
                        />
                    </div>
                </div>
            </CardHeader>

            <div>
                <CardTitle className='relative text-center text-lg font-semibold'>Réinitialisation des données</CardTitle>
                <CardDescription className='text-center text-sm'>
                    <span className='text-red-500'>Attention</span>, cette action est irréversible.
                </CardDescription>
                <CardContent className='flex flex-col gap-2 p-5 text-center text-sm'>Je souhaite remettre à zéro mon Wallet</CardContent>
            </div>

            <Separator />

            <CardFooter className='flex justify-center p-5'>
                <Button className={cn(hasConfirmedReset && "bg-red-500 hover:bg-red-500")} onClick={handleReset}>
                    {hasConfirmedReset ? "Confirmer la réinitialisation" : "Réinitialiser les données"}
                </Button>
            </CardFooter>
        </Card>
    );
};
