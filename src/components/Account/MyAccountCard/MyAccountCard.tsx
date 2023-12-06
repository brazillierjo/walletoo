"use client";

import { userAtom } from "@/src/atoms/user.atom";
import {
  CityInput,
  CurrencySelect,
  NonEditableUserAvatar,
  NonEditableUserInfos,
  OperationFormatSelect,
} from "@/src/components/Account/MyAccountCard/UserInfos";
import { Tooltip } from "@/src/components/Commons/Tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useGetRandomImageUrl } from "@/src/hooks/useGetRandomImageUrl";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

export const MyAccountCard: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);

  const randomImageUrl = useGetRandomImageUrl();

  if (!user) return null;

  return (
    <motion.div className="w-full lg:w-fit" initial="hidden" animate="visible" variants={makeCardOpacity()}>
      <Card className="w-full ring lg:w-fit lg:min-w-[400px]">
        <CardHeader className="p-2">
          <div className="relative mb-8">
            <picture>
              <img className="h-32 w-full rounded-md object-cover" src={randomImageUrl ?? ""} alt="user banner" />
            </picture>

            <NonEditableUserAvatar user={user} />

            <div className="float-right">
              <Tooltip
                title="Pourquoi ne puis-je pas modifier mes informations personnelles ?"
                description="Walletoo récupère vos informations directement du service tiers utilisé pour la connexion. Par conséquent, Walletoo ne peut pas modifier ces informations."
              />
            </div>
          </div>

          <CardTitle className="relative text-center text-lg font-semibold">{user.fullName}</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col gap-3 p-5 text-sm">
          <NonEditableUserInfos user={user} />
          <OperationFormatSelect user={user} setUser={setUser} />
          <CurrencySelect user={user} setUser={setUser} />
          <CityInput user={user} setUser={setUser} />
        </CardContent>
      </Card>
    </motion.div>
  );
};
