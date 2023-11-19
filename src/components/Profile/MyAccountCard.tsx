"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { IUserSchema } from "@/src/mongoDB/userSchema";
import { Separator } from "@/src/components/ui/separator";
import { useGetRandomImage } from "@/src/hooks/useGetRandomImage";

interface IMyAccountCardProps {
    userProfile: IUserSchema;
}

const MyAccountCard: React.FC<IMyAccountCardProps> = ({ userProfile }) => {
    const { getRandomImage } = useGetRandomImage();

    const formattedDate = new Date(userProfile.createdAt).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
    });

    return (
        <Card className='w-full lg:w-fit'>
            <CardHeader className='p-2'>
                <div className='relative mb-16'>
                    <picture>
                        <img
                            className='h-32 w-full rounded-md object-cover'
                            src={`${getRandomImage()}.jpg`}
                            alt='user banner'
                            loading='lazy'
                        />
                    </picture>

                    {userProfile.avatar && (
                        <Image
                            className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-black'
                            width={100}
                            height={100}
                            src={userProfile.avatar}
                            alt='Avatar'
                            priority
                        />
                    )}
                </div>

                <CardTitle className='text-center text-lg font-semibold'>{userProfile.fullName}</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className='flex flex-col gap-2 p-5'>
                <p>
                    E-mail : <b>{userProfile.email}</b>
                </p>
                <p>
                    Date de création : <b>{formattedDate}</b>.
                </p>
                <p>
                    Devise : <b>{userProfile.currency}</b>
                </p>
            </CardContent>

            <Separator />

            <CardFooter className='p-5'>
                <Button>Modifier</Button>
            </CardFooter>
        </Card>
    );
};

export default MyAccountCard;