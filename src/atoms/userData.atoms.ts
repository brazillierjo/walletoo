import { atom } from "jotai";
import { IUser } from "../interfaces/userInterface";

export const userDataAtom = atom<null | IUser>(null);
