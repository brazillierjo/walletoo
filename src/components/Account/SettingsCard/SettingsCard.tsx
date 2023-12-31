"use client";

import { userAtom } from "@/src/atoms/user.atom";
import {
  CityInput,
  CurrencySelect,
  OperationFormatSelect,
  TemperatureUnitSelect,
} from "@/src/components/Account/SettingsCard/InputsSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useGetRandomImageUrl } from "@/src/hooks/useGetRandomImageUrl";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

export const SettingsCard: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);

  const randomImageUrl = useGetRandomImageUrl();

  if (!user) return null;

  return (
    <motion.div className="w-full md:w-[400px]" initial="hidden" animate="visible" variants={makeCardOpacity()}>
      <Card>
        <CardHeader className="p-2">
          <div className="relative mb-3">
            <picture>
              <img className="h-40 w-full rounded-md object-cover" src={randomImageUrl ?? ""} alt="user banner" />
            </picture>
          </div>

          <CardTitle className="relative px-3 text-center text-lg font-semibold">
            Modifier les paramètres de votre Wallet
          </CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="flex flex-col gap-3 p-5 text-sm">
          <OperationFormatSelect user={user} setUser={setUser} />
          <CurrencySelect user={user} setUser={setUser} />
          <CityInput user={user} setUser={setUser} />
          <TemperatureUnitSelect user={user} setUser={setUser} />
        </CardContent>
      </Card>
    </motion.div>
  );
};
