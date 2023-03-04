import React, { useCallback } from "react";
import clsx from "clsx";
import { SkillEngine } from "../engine/SkillEngine";
import { globalState, useGlobalStateSnapshot } from "../global-state";
import { uiDict } from "../ui-dict";
import { Button } from "./Button";
import s from "./styles.module.css";

type Props = {
  skillEngine: SkillEngine;
};

export const ConfigPanel = ({ skillEngine }: Props) => {
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
    <div className={s.configPanel}>
      <div>
        <span>{uiDict.language[lang]}: </span>
        <select onChange={onLangSelect} defaultValue="ru">
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>
      </div>

      <div>
        <span>{uiDict.playersCount[lang]}: </span>
        <Button text="-" onClick={decrementPlayersCount} />
        {playersCount}
        <Button text="+" onClick={incrementPlayersCount} />
      </div>

      <div className={clsx(skillEngine.notEnoughGeneralPoints && s.warning)}>
        {`${skillEngine.system.general.name[lang]} ${skillEngine.system.generalPoints.used} / ${skillEngine.system.generalPoints.available}`}
      </div>

      <div
        className={clsx(skillEngine.notEnoughInvestigativePoints && s.warning)}
      >
        {`${skillEngine.system.investigative.name[lang]} ${skillEngine.system.investigativePoints.used} / ${skillEngine.system.investigativePoints.available}`}
      </div>
    </div>
  );
};
