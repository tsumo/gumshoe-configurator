import React, { useContext } from "react";
import { Languages } from "../systems/types";

type AppContext = {
  lang: Languages;
};

const defaultValue: AppContext = { lang: "ru" };

const context = React.createContext<AppContext>(defaultValue);

export const LanguageContext = () => {
  return <context.Provider value={defaultValue}></context.Provider>;
};

export const useAppContext = () => useContext(context);
