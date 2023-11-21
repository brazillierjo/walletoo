"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useGetRandomImage } from "@/src/hooks/useGetRandomImage";
import { useAtom } from "jotai";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { useState } from "react";
import { currencies } from "@/src/utils/currencies";
import { Button } from "@/src/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import useDateFormatter from "@/src/hooks/useDateFormatter";

export const MyAccountCard: React.FC = () => {
    const [userData] = useAtom(userDataAtom);
    const [isEditing, setIsEditing] = useState({
        email: false,
        fullName: false,
        currency: false,
    });

    const { getRandomImage } = useGetRandomImage();
    const formattedDate = useDateFormatter(userData ? userData.createdAt : new Date());

    if (!userData) return null;

    return (
        <Card className='w-full lg:w-fit'>
            <CardHeader className='p-2'>
                <div className='relative mb-16'>
                    <picture>
                        <img
                            className='h-32 w-full rounded-md object-cover'
                            src={`${getRandomImage()}.jpg`}
                            alt='user banner'
                        />
                    </picture>

                    {userData.avatar && (
                        <Image
                            className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-black'
                            width={100}
                            height={100}
                            src={userData.avatar}
                            alt='Avatar'
                            priority
                        />
                    )}
                </div>

                <CardTitle className='text-center text-lg font-semibold'>
                    {userData.fullName}
                </CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className='flex flex-col gap-2 p-5'>
                <div className='flex items-center gap-3'>
                    <label className='break-keep'>E-mail :</label>
                    <b>{userData.email}</b>
                </div>

                <div>
                    <label className='break-keep'>Création : </label>
                    <b>{formattedDate}</b>.
                </div>

                <div className='flex items-center gap-3'>
                    <label className='whitespace-nowrap'>Devise :</label>
                    {!isEditing.currency ? (
                        <Button
                            onClick={() =>
                                setIsEditing({
                                    ...isEditing,
                                    currency: true,
                                })
                            }
                            variant='outline'>
                            <b>{userData.currency}</b>
                        </Button>
                    ) : (
                        <Select defaultValue={userData.currency}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {currencies.map((currency) => (
                                    <SelectItem key={currency.name} value={currency.name}>
                                        {currency.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
