"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

export const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState<null | string>(null);
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {};

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Météo</CardTitle>
        <CardDescription>Saisissez une ville pour obtenir les informations météorologiques</CardDescription>
      </CardHeader>

      <CardContent>
        <Input value={city ?? ""} onChange={(e) => setCity(e.target.value)} placeholder="Entrez une ville" />
        <Button onClick={fetchWeather}>Rechercher</Button>
        {weather && <div></div>}
      </CardContent>

      <CardFooter>
        <p>Météo à jour</p>
      </CardFooter>
    </Card>
  );
};
