import { SelectedOperationAtom } from "@/src/interfaces/selectedOperationInterface";
import { atom } from "jotai";

export const selectedOperationAtom = atom<SelectedOperationAtom | null>(null);
