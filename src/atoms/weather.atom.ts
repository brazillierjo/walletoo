import { WeatherResponse } from "@/src/interfaces/weatherInterface";
import { atom } from "jotai";

export const weatherAtom = atom<null | WeatherResponse>(null);
