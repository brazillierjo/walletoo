"use client";

import Image from "next/image";
import { userAtom } from "@/src/atoms/user.atom";
import { Tooltip } from "@/src/components/Commons/Tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import useDateFormatter from "@/src/hooks/useDateFormatter";
import { useGetRandomImageUrl } from "@/src/hooks/useGetRandomImageUrl";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { GrValidate } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

export const MyAccountCard: React.FC = () => {
  const [user] = useAtom(userAtom);

  const randomImageUrl = useGetRandomImageUrl();

  const formattedDate = useDateFormatter(user ? user.createdAt : new Date());

  if (!user) return null;

  return (
    <motion.div
      className="h-full w-full lg:w-fit lg:min-w-[400px]"
      initial="hidden"
      animate="visible"
      variants={makeCardOpacity()}
    >
      <Card className="min-h-[365px]">
        <CardHeader className="p-2">
          <div className="relative mb-8">
            <picture>
              <img className="h-32 w-full rounded-md object-cover" src={randomImageUrl ?? ""} alt="user banner" />
            </picture>

            <Image
              className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border-4 border-white dark:border-black"
              width={100}
              height={100}
              src={user.avatar}
              alt="Avatar"
              priority
            />

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
          <>
            <div className="flex items-center gap-2">
              <p className="break-keep">E-mail :</p>
              <b>{user.email}</b>
            </div>

            <div className="flex items-center gap-2">
              <p className="break-keep">Création : </p>
              <b>{formattedDate}</b>
            </div>

            <div className="flex items-center gap-2">
              <p className="break-keep">Premium : </p>
              <b>
                {user.isSubscribed ? (
                  <GrValidate className="h-6 w-6 text-green-600" />
                ) : (
                  <RxCross2 className="h-6 w-6 text-red-600" />
                )}
              </b>
            </div>
          </>
        </CardContent>
      </Card>
    </motion.div>
  );
};
