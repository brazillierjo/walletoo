import { atom } from "jotai";
import { IUser } from "../interfaces/userInterface";

export const userAtom = atom<null | IUser>(null);
