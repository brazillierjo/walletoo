"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useGetRandomImageUrl } from "@/src/hooks/useGetRandomImageUrl";
import { useAtom } from "jotai";
import { userDataAtom } from "@/src/atoms/userData.atoms";
import { currencies } from "@/src/utils/currencies";
import { EditableContentSelect } from "../Commons/EditableContent";
import { UserApi } from "@/src/APIs/userApi";
import { useToast } from "@/src/components/ui/use-toast";
import useDateFormatter from "@/src/hooks/useDateFormatter";
import { Tooltip } from "../Commons/Tooltip";

export const MyAccountCard: React.FC = () => {
    const [userData, setUserData] = useAtom(userDataAtom);

    const { toast } = useToast();
    const formattedDate = useDateFormatter(userData ? userData.createdAt : new Date());
    const randomImageUrl = useGetRandomImageUrl();

    const currenciesNames = currencies.map((currency) => currency.name);

    const handleCurrencyChange = (newCurrency: string) => {
        if (userData && newCurrency !== userData.currency) {
            UserApi.patch({ currency: newCurrency }).then((updatedUserData) => {
                setUserData(updatedUserData);
                toast({
                    title: "Devise",
                    description: "La devise a bien été mise à jour.",
                });
            });
        }
    };

    if (!userData) return null;

    return (
        <Card className='w-full lg:w-fit lg:min-w-[400px]'>
            <CardHeader className='p-2'>
                <div className='relative mb-8'>
                    <picture>
                        <img className='h-32 w-full rounded-md object-cover' src={randomImageUrl ?? ""} alt='user banner' />
                    </picture>

                    {userData.avatar && (
                        <Image
                            className='absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-black'
                            width={100}
                            height={100}
                            src={userData.avatar}
                            alt='Avatar'
                            priority
                        />
                    )}

                    <div className='float-right'>
                        <Tooltip
                            title='Pourquoi ne puis-je pas modifier mes informations personnelles ?'
                            description='Waletoo récupère vos informations directement du service tiers utilisé pour la connexion. Par conséquent, Waletoo ne peut pas modifier ces informations.'
                        />
                    </div>
                </div>

                <CardTitle className='relative text-center text-lg font-semibold'>{userData.fullName}</CardTitle>
            </CardHeader>

            <Separator />

            <CardContent className='flex flex-col gap-3 p-5 text-sm'>
                <div className='flex items-center gap-2'>
                    <p className='break-keep'>E-mail :</p>
                    <b>{userData.email}</b>
                </div>

                <div className='flex items-center gap-2'>
                    <p className='break-keep'>Création : </p>
                    <b>{formattedDate}</b>
                </div>

                <div className='flex items-center gap-2'>
                    <p className='whitespace-nowrap'>Devise :</p>
                    <EditableContentSelect options={currenciesNames} value={userData.currency ?? ""} onChange={handleCurrencyChange} />
                </div>
            </CardContent>
        </Card>
    );
};
