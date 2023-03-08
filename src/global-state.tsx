import { proxy, useSnapshot } from "valtio";
import { Language } from "./systems/types";

type GlobalState = {
  lang: Language;
  playersCount: number;
};

export const globalState = proxy<GlobalState>({ lang: "ru", playersCount: 2 });

export const useGlobalStateSnapshot = () => useSnapshot(globalState);
