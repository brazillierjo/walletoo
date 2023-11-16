import { ITransaction } from "../interfaces/transaction";
import { atom } from "jotai";

export const incomesAtom = atom<null | ITransaction[]>(null);
export const expensesAtom = atom<null | ITransaction[]>(null);
