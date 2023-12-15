"use client";

import { useState } from "react";
import DeleteBanner from "@/public/assets/webp/delete-banner.webp";
import { UserApi } from "@/src/APIs/userApi";
import { userAtom } from "@/src/atoms/user.atom";
import { Tooltip } from "@/src/components/Commons/Tooltip";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Route } from "@/src/enums/frontendRoutes";
import { makeCardOpacity } from "@/src/utils/animations";
import { cn } from "@/src/utils/tailwindMerge";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { signOut } from "next-auth/react";

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
    <motion.div
      className="h-full w-full lg:w-fit lg:min-w-[400px]"
      initial="hidden"
      animate="visible"
      variants={makeCardOpacity(0.4)}
    >
      <Card className="flex flex-col justify-between ring">
        <CardHeader className="p-2">
          <div className="relative">
            <picture>
              <img className="h-32 w-full rounded-md object-cover" src={DeleteBanner.src} alt="Delete banner" />
            </picture>

            <div className="float-right">
              <Tooltip
                title="Demande de suppression de compte"
                description="Pour procéder à la suppression intégrale de votre compte, il est nécessaire de supprimer vos données personnelles au préalable. Par la suite, veuillez vous diriger vers le service tiers utilisé lors de la création de votre compte afin de révoquer l'accès accordé à Waletoo."
              />
            </div>
          </div>
        </CardHeader>

        <div>
          <CardTitle className="relative text-center text-lg font-semibold">Suppression du compte</CardTitle>
          <CardDescription className="text-center text-sm">
            <span className="text-red-500">Attention</span>, cette action est irréversible.
          </CardDescription>
          <CardContent className="flex flex-col gap-2 p-5 text-center text-sm">
            Je souhaite supprimer mon compte définitivement
          </CardContent>
        </div>

        <Separator />

        <CardFooter className="flex justify-center p-5">
          <Button className={cn(hasConfirmedDeletion && "bg-red-500 hover:bg-red-500")} onClick={handleDelete}>
            {hasConfirmedDeletion ? "Confirmer la suppression" : "Supprimer mon compte"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
