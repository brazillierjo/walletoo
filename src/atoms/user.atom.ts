import { atom } from "jotai";
import { IUser } from "@/src/interfaces/userInterface";

export const userAtom = atom<null | IUser>(null);
