import React from "react";
import { weatherAtom } from "@/src/atoms/weather.atom";
import { useAtom } from "jotai";
import { WiCloudy, WiDaySunny, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

type WeatherLogoProps = {
  className?: string;
};

export const WeatherLogo: React.FC<WeatherLogoProps> = ({ className }) => {
  let [weather] = useAtom(weatherAtom);

  if (!weather) return "...";

  let Icon, colorClass, subTitle;

  switch (weather.weather[0].main) {
    case "Clear":
      Icon = WiDaySunny;
      colorClass = "fill-yellow-400";
      subTitle = "Ensoleillé";
      break;
    case "Clouds":
      Icon = WiCloudy;
      colorClass = "fill-gray-500";
      subTitle = "Nuageux";
      break;
    case "Rain":
    case "Drizzle":
      Icon = WiRain;
      colorClass = "fill-blue-500";
      subTitle = "Pluvieux";
      break;
    case "Snow":
      Icon = WiSnow;
      colorClass = "fill-gray-200";
      subTitle = "Enneigé";
      break;
    case "Thunderstorm":
      Icon = WiThunderstorm;
      colorClass = "fill-purple-500";
      subTitle = "Orageux";
      break;
    default:
      Icon = WiDaySunny;
      colorClass = "fill-yellow-500";
      subTitle = "Ensoleillé";
  }

  const iconClasses = `${colorClass} ${className}`;

  return (
    <>
      <Icon className={iconClasses} />
      <p className="text-sm font-semibold opacity-80">{subTitle}</p>
    </>
  );
};
