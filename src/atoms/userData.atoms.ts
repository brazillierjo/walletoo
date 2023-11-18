import { atom } from "jotai";
import { IUserSchema } from "../mongoDB/userSchema";

export const userDataAtom = atom<null | IUserSchema>(null);
