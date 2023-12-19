"use client";

import { useState } from "react";
import ResetBanner from "@/public/assets/webp/reset-banner.webp";
import { UserApi } from "@/src/APIs/userApi";
import { userAtom } from "@/src/atoms/user.atom";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { makeCardOpacity } from "@/src/utils/animations";
import { cn } from "@/src/utils/tailwindMerge";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

export const ResetUserCard: React.FC = () => {
  const [hasConfirmedReset, setHasConfirmedReset] = useState(false);
  const [user] = useAtom(userAtom);

  const handleReset = () => {
    !hasConfirmedReset && setHasConfirmedReset(true);

    hasConfirmedReset && UserApi.resetUserData().then(() => window.location.reload());
  };

  if (!user) return null;

  return (
    <motion.div className="w-full md:w-[400px]" initial="hidden" animate="visible" variants={makeCardOpacity(0.2)}>
      <Card className="flex flex-col justify-between">
        <CardHeader className="p-2">
          <div className="relative mb-3">
            <picture>
              <img className="h-32 w-full rounded-md object-cover" src={ResetBanner.src} alt="Reset banner" />
            </picture>
          </div>

          <CardTitle className="relative text-center text-lg font-semibold">Réinitialisation des données</CardTitle>
        </CardHeader>

        <Separator className="mb-4" />

        <CardDescription className="text-center text-sm">
          <span className="text-red-500">Attention</span>, cette action est irréversible.
        </CardDescription>
        <CardContent className="flex flex-col gap-2 p-5 text-center text-sm">
          Je souhaite remettre à zéro mon Wallet
        </CardContent>

        <CardFooter className="flex justify-center p-5">
          <Button className={cn(hasConfirmedReset && "bg-red-500 hover:bg-red-500")} onClick={handleReset}>
            {hasConfirmedReset ? "Confirmer la réinitialisation" : "Réinitialiser les données"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
