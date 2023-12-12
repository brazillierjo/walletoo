"use client";

import { useEffect } from "react";
import Link from "next/link";
import { WeatherApi } from "@/src/APIs/weatherApi";
import { userAtom } from "@/src/atoms/user.atom";
import { weatherAtom } from "@/src/atoms/weather.atom";
import { WeatherLogo } from "@/src/components/Commons/WeatherLogos";
import { Card, CardContent } from "@/src/components/ui/card";
import { Route } from "@/src/enums/frontendRoutes";
import { WeatherResponse } from "@/src/interfaces/weatherInterface";
import { useAtom } from "jotai";

import SpinnerLoadingScreen from "../Commons/LoadingScreen";
import { Button } from "../ui/button";

export const WeatherWidget: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [weather, setWeather] = useAtom(weatherAtom);

  if (!user) return <CardWithLoading />;

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

  const formatTemperature = (temp: number) => (temp - 273.15).toFixed(0);
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}h${date.getMinutes().toString().padStart(2, "0")}`;
  };
  const formatTimeZone = (timezone: number) => {
    const sign = timezone >= 0 ? "+" : "-";
    const hours = Math.floor(Math.abs(timezone) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = ((Math.abs(timezone) % 3600) / 60).toString().padStart(2, "0");
    return `${sign}${hours}:${minutes}`;
  };

  if (user.city === "") return <CardWithNoCity />;
  if (!weather) return <CardWithNoCity />;

  return (
    weather && (
      <WeatherCard
        weather={weather}
        formatTemperature={formatTemperature}
        formatTime={formatTime}
        formatTimezone={formatTimeZone}
      />
    )
  );
};

const WeatherCard = ({
  weather,
  formatTemperature,
  formatTime,
  formatTimezone,
}: {
  weather: WeatherResponse;
  formatTemperature: (temp: number) => string;
  formatTime: (timestamp: number) => string;
  formatTimezone: (timezone: number) => string;
}) => (
  <Card className="h-fit w-full max-w-screen-sm rounded-xl p-4 ring">
    <CardContent>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-row justify-between gap-1 lg:flex-col">
          <div className="flex flex-col gap-1">
            <span className="text-5xl font-bold">{formatTemperature(weather.main.temp)}°C</span>

            <span className="mb-4 font-semibold text-secondary-foreground">
              {weather.name}, {weather.sys.country}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-right text-sm opacity-80 lg:text-left">
            <p>
              <b>Ressenti :</b> {(weather.main.feels_like - 273.15).toFixed(0)}°C
            </p>
            <p>
              <b>Humidité</b> : {weather.main.humidity}%
            </p>
            <p>
              <b>Vent</b> : {weather.wind.speed.toString().replace(".", ",")} m/s
            </p>
            <p>
              <b>Fuseau</b> : {formatTimezone(weather.timezone)}
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
            <p>Lever du soleil: {formatTime(weather.sys.sunrise)}</p>
            <p>Coucher du soleil: {formatTime(weather.sys.sunset)}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CardWithLoading = () => (
  <Card className="h-fit min-h-[300px] w-full max-w-screen-sm rounded-xl p-4 ring">
    <SpinnerLoadingScreen />
  </Card>
);

const CardWithNoCity = () => (
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
