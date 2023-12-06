import { GeoNamesResponse } from "@/src/interfaces/geonamesInterface";

export class CitiesApi {
  static async get(inputValue: string): Promise<GeoNamesResponse> {
    const response = await fetch(
      `http://api.geonames.org/searchJSON?q=${inputValue}&maxRows=3&username=dovah&cities=cities1000`
    );

    if (!response.ok) {
      throw new Error("Error while fetching geonames data");
    }

    return response.json();
  }
}
