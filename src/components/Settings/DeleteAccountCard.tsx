"use client";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/src/components/ui/card";
import { Separator } from "../ui/separator";
import { useAtom } from "jotai";
import { userDataAtom } from "@/src/atoms/userData.atoms";

export const DeleteAccountCard: React.FC = () => {
    const [userData] = useAtom(userDataAtom);

    if (!userData) return <div className='flex p-4 lg:p-8'>Chargement...</div>;

    return (
        <Card className='w-full lg:w-fit'>
            <CardHeader className='p-2'>
                <CardTitle className='text-center text-lg font-semibold'>Suppression du compte</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className='flex flex-col gap-2 p-5'>
                Je souhaite supprimer mon compte définitivement
            </CardContent>

            <Separator />

            <CardFooter className='p-5'>
                <Button>Supprimer</Button>
            </CardFooter>
        </Card>
    );
};
