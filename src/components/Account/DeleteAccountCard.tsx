"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { useAtom } from "jotai";
import { userAtom } from "@/src/atoms/user.atom";
import { UserApi } from "@/src/APIs/userApi";
import { cn } from "@/src/utils/tailwindMerge";
import { useState } from "react";
import { Route } from "@/src/enums/frontend-routes";
import { signOut } from "next-auth/react";
import { Tooltip } from "@/src/components/Commons/Tooltip";
import DeleteBanner from "@/src/assets/webp/delete-banner.webp";

export const DeleteAccountCard: React.FC = () => {
    const [hasConfirmedDeletion, setHasConfirmedDeletion] = useState(false);
    const [user] = useAtom(userAtom);

    const handleDelete = () => {
        !hasConfirmedDeletion && setHasConfirmedDeletion(true);

        hasConfirmedDeletion &&
            UserApi.delete().then((res) => {
                if (!res) return;

                signOut({
                    callbackUrl: Route.HOME,
                });
            });
    };

    if (!user) return null;

    return (
        <Card className='flex w-full flex-col justify-between lg:w-fit lg:min-w-[400px]'>
            <CardHeader className='p-2'>
                <div className='relative'>
                    <picture>
                        <img className='h-32 w-full rounded-md object-cover' src={DeleteBanner.src} alt='Delete banner' />
                    </picture>

                    <div className='float-right'>
                        <Tooltip
                            title='Demande de suppression de compte'
                            description="Pour procéder à la suppression intégrale de votre compte, il est nécessaire de supprimer vos données personnelles au préalable. Par la suite, veuillez vous diriger vers le service tiers utilisé lors de la création de votre compte afin de révoquer l'accès accordé à notre application."
                        />
                    </div>
                </div>
            </CardHeader>

            <div>
                <CardTitle className='relative text-center text-lg font-semibold'>Suppression du compte</CardTitle>
                <CardDescription className='text-center text-sm'>
                    <span className='text-red-500'>Attention</span>, cette action est irréversible.
                </CardDescription>
                <CardContent className='flex flex-col gap-2 p-5 text-center text-sm'>Je souhaite supprimer mon compte définitivement</CardContent>
            </div>

            <Separator />

            <CardFooter className='flex justify-center p-5'>
                <Button className={cn(hasConfirmedDeletion && "bg-red-500 hover:bg-red-500")} onClick={handleDelete}>
                    {hasConfirmedDeletion ? "Confirmer la suppression" : "Supprimer"}
                </Button>
            </CardFooter>
        </Card>
    );
};
