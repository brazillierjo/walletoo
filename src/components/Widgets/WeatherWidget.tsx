import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "path-to-ui-components";

export const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null); // Ici, 'weather' stockera les données météorologiques

  const fetchWeather = async () => {
    // Logique pour récupérer les données météorologiques
    // Exemple : setWeather(await fetchWeatherData(city));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Météo</CardTitle>
        <CardDescription>Saisissez une ville pour obtenir les informations météorologiques</CardDescription>
      </CardHeader>
      <CardContent>
        <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Entrez une ville" />
        <Button onClick={fetchWeather}>Rechercher</Button>
        {/* Affichage des données météo ici */}
        {weather && (
          <div>
            <p>Température: {weather.temp}°C</p>
            <p>Condition: {weather.description}</p>
            {/* Autres détails météo */}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p>Météo à jour</p>
      </CardFooter>
    </Card>
  );
};
