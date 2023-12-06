"use client";

import { useEffect } from "react";
import Link from "next/link";
import { WeatherApi } from "@/src/APIs/weatherApi";
import { userAtom } from "@/src/atoms/user.atom";
import { weatherAtom } from "@/src/atoms/weather.atom";
import { WeatherLogo } from "@/src/components/Commons/WeatherLogos";
import { Card, CardContent } from "@/src/components/ui/card";
import { Route } from "@/src/enums/frontendRoutes";
import { useAtom } from "jotai";

import { Button } from "../ui/button";

export const WeatherWidget: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [weather, setWeather] = useAtom(weatherAtom);

  if (!user) return <Card className="h-fit w-full max-w-screen-sm rounded-xl p-4 ring">Chargement de la météo...</Card>;

  useEffect(() => {
    if (!weather) fetchWeather();
  }, [user.city, weather]);

  const fetchWeather = async () => {
    try {
      WeatherApi.get(user.city).then((data) => setWeather(data));
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo", error);
    }
  };

  // IF NO CITY SET
  if (user.city === "") {
    return (
      <Card className="h-fit w-full max-w-screen-sm rounded-xl p-4 ring">
        <CardContent>
          <div className="flex flex-col items-center text-center">
            <span className="mb-3 text-6xl font-bold">🏙️</span>

            <h3 className="text-lg font-semibold">Météo non disponible</h3>

            <p className="mt-2 text-gray-500">
              Pour afficher la météo, veuillez renseigner votre ville dans les informations de votre compte.
            </p>

            <Link href={Route.ACCOUNT}>
              <Button className="mt-5" variant="secondary">
                Ajouter une ville
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    weather && (
      <Card className="h-fit w-full max-w-screen-sm rounded-xl p-4 ring">
        <CardContent>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-5xl font-bold">{(weather.main.temp - 273.15).toFixed(0)}°C</span>

              <span className="font-semibold text-secondary-foreground">
                {weather.name}, {weather.sys.country}
              </span>
            </div>

            <WeatherLogo className="h-20 w-20" />
          </div>
        </CardContent>
      </Card>
    )
  );
};
