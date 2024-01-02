"use client";

import { useEffect } from "react";
import Link from "next/link";
import { WeatherApi } from "@/src/APIs/weatherApi";
import { userAtom } from "@/src/atoms/user.atom";
import { weatherAtom } from "@/src/atoms/weather.atom";
import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen";
import { WeatherLogo } from "@/src/components/Commons/WeatherLogos";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Route } from "@/src/enums/frontendRoutes";
import { convertTemperature, temperaturesUnit } from "@/src/utils/temperaturesUnit";
import { useAtom } from "jotai";

export const WeatherWidget: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [weather, setWeather] = useAtom(weatherAtom);

  if (!user) return <CardWithLoading />;
  if (user.city === "") return <CardWithNoCity />;

  useEffect(() => {
    if (user && user.city && !weather) fetchWeather();
  }, [user, weather]);

  const fetchWeather = async () => {
    try {
      const data = await WeatherApi.get(user.city);
      setWeather(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo", error);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}h${date.getMinutes().toString().padStart(2, "0")}`;
  };

  if (!weather) return <CardWithNoCity />;

  const temperature = convertTemperature(weather.main.temp, user.temperatureUnit);
  const temperatureSymbol = temperaturesUnit.find((unit) => unit.name === user.temperatureUnit)?.symbol;
  const feelsLike = convertTemperature(weather.main.feels_like, user.temperatureUnit);

  return (
    weather && (
      <Card className="h-fit min-h-[350px] w-full px-4 pb-2 pt-6">
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="flex flex-row justify-between gap-1 lg:flex-col">
              <div className="flex flex-col gap-1">
                <span className="text-5xl font-bold">
                  {temperature}
                  {temperatureSymbol}
                </span>

                <span className="mb-4 font-semibold text-secondary-foreground">
                  {weather.name}, {weather.sys.country}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-right text-sm opacity-80 lg:text-left">
                <p>
                  <b>Ressenti :</b> {feelsLike}
                  {temperatureSymbol}
                </p>
                <p>
                  <b>Humidité</b> : {weather.main.humidity}%
                </p>
                <p>
                  <b>Vent</b> : {weather.wind.speed.toString().replace(".", ",")} m/s
                </p>
                <p>
                  <b>Fuseau</b> : {weather.timezone / 3600}h
                </p>
                {weather.rain && weather.rain["1h"] && (
                  <p>
                    <b>Pluie tombée depuis 1h</b> : {weather.rain["1h"].toString().replace(".", ",")} mm
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center lg:mt-0">
              <WeatherLogo className="h-28 w-28" />

              <div className="mt-2 text-center text-sm opacity-80">
                <p>
                  Lever du soleil : <b>{formatTime(weather.sys.sunrise)}</b>
                </p>
                <p>
                  Coucher du soleil : <b>{formatTime(weather.sys.sunset)}</b>
                </p>
              </div>
            </div>
          </div>

          <Link href={Route.ACCOUNT}>
            <Button className="mt-5">Modifier la ville</Button>
          </Link>
        </CardContent>
      </Card>
    )
  );
};

const CardWithLoading = () => (
  <Card className="h-fit min-h-[250px] w-full px-4 pb-2 pt-6">
    <SpinnerLoadingScreen />
  </Card>
);

const CardWithNoCity = () => (
  <Card className="h-fit min-h-[250px] w-full px-4 pb-2 pt-6">
    <CardContent>
      <div className="flex flex-col items-center text-center">
        <span className="mb-3 text-6xl font-bold">🏙️</span>

        <h3 className="text-lg font-semibold">Météo non disponible</h3>

        <p className="mt-2 text-gray-500">
          Pour afficher la météo, veuillez renseigner votre ville dans les paramètres de votre compte.
        </p>

        <Link href={Route.ACCOUNT}>
          <Button className="mt-5" variant="outline">
            Ajouter une ville
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
);
