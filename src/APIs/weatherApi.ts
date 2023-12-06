import { WeatherResponse } from "@/src/interfaces/weatherInterface";

export class WeatherApi {
  static async get(city: string): Promise<WeatherResponse> {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7a9d3c1e4675496c6cfd573745127b7e`
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données météo");
    }

    return response.json() as Promise<WeatherResponse>;
  }
}
