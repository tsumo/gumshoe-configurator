import React, { useCallback } from "react";
import { globalState, useGlobalStateSnapshot } from "../global-state";
import { uiDict } from "../ui-dict";

export const ConfigPanel = () => {
  const { lang, playersCount } = useGlobalStateSnapshot();

  const onLangSelect = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      if (e.target.value === "en" || e.target.value === "ru") {
        globalState.lang = e.target.value;
      }
    },
    []
  );

  const incrementPlayersCount = useCallback(() => {
    globalState.playersCount += 1;
  }, []);

  const decrementPlayersCount = useCallback(() => {
    globalState.playersCount = Math.max(2, playersCount - 1);
  }, [playersCount]);

  return (
    <div>
      <select onChange={onLangSelect} defaultValue="ru">
        <option value="en">EN</option>
        <option value="ru">RU</option>
      </select>
      {uiDict.playersCount[lang]}
      <button onClick={decrementPlayersCount}>-</button>
      {playersCount}
      <button onClick={incrementPlayersCount}>+</button>
    </div>
  );
};
