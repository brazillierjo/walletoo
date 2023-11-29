import { IUser } from "@/src/interfaces/userInterface";
import { atom } from "jotai";

export const userAtom = atom<null | IUser>(null);
