"use client";

import { useEffect, useState } from "react";
import { WeatherApi } from "@/src/APIs/weatherApi";
import { userAtom } from "@/src/atoms/user.atom";
import { weatherAtom } from "@/src/atoms/weather.atom";
import { SunLogo } from "@/src/components/Commons/WeatherLogos";
import { Card, CardContent } from "@/src/components/ui/card";
import { useAtom } from "jotai";

export const WeatherWidget: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [weather, setWeather] = useAtom(weatherAtom);

  if (!user) return null;

  useEffect(() => {
    !weather && fetchWeather();
  }, [weather]);

  const fetchWeather = async () => {
    try {
      WeatherApi.get(user.city).then((data) => {
        console.log(data);
        setWeather(data);
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo", error);
    }
  };

  if (!weather) return null;

  return (
    weather && (
      <Card className="h-fit w-full max-w-screen-sm rounded-xl p-4 ring">
        <CardContent>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-6xl font-bold">29°C</span>
              <span className="mt-1 font-semibold text-gray-500">Paris, FR</span>
            </div>

            <SunLogo className="h-20 w-20 fill-yellow-400" />
          </div>

          <div className="mt-6 flex justify-between">
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold">29°C</span>
              <SunLogo className="my-2 h-9 w-9 fill-gray-400" />
              <span className="mt-1 text-sm font-semibold">11:00</span>
              <span className="text-xs font-semibold text-gray-400">AM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  );
};
