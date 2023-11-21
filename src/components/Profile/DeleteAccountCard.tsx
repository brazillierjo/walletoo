"use client";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    CardDescription,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Separator } from "@/src/components/ui/separator";
import { useAtom } from "jotai";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { UserApi } from "@/src/APIs/user";
import { cn } from "@/src/tools/tailwindMerge";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Route } from "@/src/enums/frontend-routes";
import { signOut } from "next-auth/react";
import { Tooltip } from "@/src/components/Commons/Tooltip";
import DeleteBanner from "@/src/assets/webp/delete-banner.webp";

export const DeleteAccountCard: React.FC = () => {
    const [hasConfirmedDeletion, setHasConfirmedDeletion] = useState(false);
    const [userData] = useAtom(userDataAtom);

    const handleDelete = () => {
        !hasConfirmedDeletion && setHasConfirmedDeletion(true);

        hasConfirmedDeletion &&
            UserApi.delete().then((res) => {
                if (!res) return;

                signOut();
                redirect(Route.HOME);
            });
    };

    if (!userData) return null;

    return (
        <Card className='flex w-full flex-col justify-between lg:w-fit lg:min-w-[400px]'>
            <CardHeader className='p-2'>
                <div className='relative'>
                    <picture>
                        <img
                            className='h-32 w-full rounded-md object-cover'
                            src={DeleteBanner.src}
                            alt='Delete banner'
                        />
                    </picture>

                    <div className='float-right'>
                        <Tooltip
                            title='Pourquoi ne puis-je pas modifier mes informations personnelles ?'
                            description='Waletoo récupère vos informations directement du service tiers utilisé pour la connexion. Par conséquent, Waletoo ne peut pas modifier ces informations.'
                        />
                    </div>
                </div>
            </CardHeader>

            <div>
                <CardTitle className='relative text-center text-lg font-semibold'>
                    Suppression du compte
                </CardTitle>
                <CardDescription className='text-center text-sm'>
                    <span className='text-red-500'>Attention</span>, cette action est
                    irréversible.
                </CardDescription>
                <CardContent className='flex flex-col gap-2 p-5 text-center text-sm'>
                    Je souhaite supprimer mon compte définitivement
                </CardContent>
            </div>

            <Separator />

            <CardFooter className='flex justify-center p-5'>
                <Button
                    className={cn(hasConfirmedDeletion && "bg-red-500 hover:bg-red-500")}
                    onClick={handleDelete}>
                    {hasConfirmedDeletion ? "Confirmer la suppression" : "Supprimer"}
                </Button>
            </CardFooter>
        </Card>
    );
};
