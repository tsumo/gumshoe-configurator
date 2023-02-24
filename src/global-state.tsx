import { proxy, useSnapshot } from "valtio";
import { Languages } from "./systems/types";

type GlobalState = {
  lang: Languages;
  playersCount: number;
};

export const globalState = proxy<GlobalState>({ lang: "ru", playersCount: 1 });

export const useGlobalStateSnapshot = () => useSnapshot(globalState);
