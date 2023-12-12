"use client";

import { userAtom } from "@/src/atoms/user.atom";
import {
  CityInput,
  CurrencySelect,
  OperationFormatSelect,
  TemperatureUnitSelect,
} from "@/src/components/Settings/UserInputs";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { useGetRandomImageUrl } from "@/src/hooks/useGetRandomImageUrl";
import { makeCardOpacity } from "@/src/utils/animations";
import { motion } from "framer-motion";
import { useAtom } from "jotai";

const Settings: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);

  const randomImageUrl = useGetRandomImageUrl();

  if (!user) return null;

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="shrink text-xl font-bold">Mes paramètres</h1>

      <motion.div initial="hidden" animate="visible" variants={makeCardOpacity()}>
        <Card className="h-full w-full ring lg:w-fit lg:min-w-[700px]">
          <CardHeader className="p-2">
            <div className="relative mb-3">
              <picture>
                <img className="h-32 w-full rounded-md object-cover" src={randomImageUrl ?? ""} alt="user banner" />
              </picture>
            </div>

            <CardTitle className="relative px-3 text-lg font-semibold">
              Modifier les paramètres de votre Wallet
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-5 p-5 text-sm">
            <OperationFormatSelect user={user} setUser={setUser} />
            <CurrencySelect user={user} setUser={setUser} />
            <CityInput user={user} setUser={setUser} />
            <TemperatureUnitSelect user={user} setUser={setUser} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Settings;
