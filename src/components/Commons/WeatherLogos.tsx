import { PiSunBold } from "react-icons/pi";

type WeatherLogoProps = {
  className?: string;
};

export const SunLogo: React.FC<WeatherLogoProps> = ({ className }) => <PiSunBold className={className} />;
