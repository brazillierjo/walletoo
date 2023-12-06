interface AdminCodes {
  [key: string]: string;
}

interface GeoName {
  adminCode1: string;
  lng: string;
  geonameId: number;
  toponymName: string;
  countryId: string;
  fcl: string;
  population: number;
  countryCode: string;
  name: string;
  fclName: string;
  adminCodes1: AdminCodes;
  countryName: string;
  fcodeName: string;
  adminName1: string;
  lat: string;
  fcode: string;
}

export interface GeoNamesResponse {
  totalResultsCount: number;
  geonames: GeoName[];
}
