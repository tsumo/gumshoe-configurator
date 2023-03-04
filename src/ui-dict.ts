import { Term } from "./systems/types";

export const uiDict = {
  language: { en: "Language", ru: "Язык" },
  playersCount: { en: "Number of players", ru: "Количество игроков" },
} satisfies Record<string, Term>;
