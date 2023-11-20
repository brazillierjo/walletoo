"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/src/components/ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useAtom } from "jotai";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { UserApi } from "@/src/APIs/user";
import { cn } from "@/src/tools/tailwindMerge";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Route } from "@/src/enums/frontend-routes";

export const DeleteAccountCard: React.FC = () => {
    const [hasConfirmedDeletion, setHasConfirmedDeletion] = useState(false);
    const [userData] = useAtom(userDataAtom);

    const handleDelete = () => {
        !hasConfirmedDeletion && setHasConfirmedDeletion(true);

        if (hasConfirmedDeletion) {
            UserApi.delete().then((res) => {
                if (!res) return;
                redirect(Route.HOME);
            });
        }
    };

    if (!userData) return <div className='flex p-4 lg:p-8'>Chargement...</div>;

    return (
        <Card className='w-full lg:w-fit'>
            <CardHeader className='p-2'>
                <CardTitle className='text-center text-lg font-semibold'>Suppression du compte</CardTitle>

                <CardDescription className='text-center text-sm'>
                    <span className='text-red-500'>Attention</span>, cette action est irréversible.
                </CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className='flex flex-col gap-2 p-5'>
                Je souhaite supprimer mon compte définitivement
            </CardContent>

            <Separator />

            <CardFooter className='flex justify-center p-5'>
                <Button
                    className={cn(hasConfirmedDeletion && "bg-red-500 hover:bg-red-500 hover:opacity-50")}
                    onClick={handleDelete}>
                    {hasConfirmedDeletion ? "Confirmer la suppression" : "Supprimer"}
                </Button>
            </CardFooter>
        </Card>
    );
};
