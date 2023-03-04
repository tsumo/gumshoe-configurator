import clsx from "clsx";
import { useGlobalStateSnapshot } from "../global-state";
import { SkillEngine } from "../engine/SkillEngine";
import { Skill, SkillList as SkillListType } from "../systems/types";
import { Button } from "./Button";
import s from "./styles.module.css";
import { useCallback } from "react";

type Props = {
  list: SkillListType;
  skillEngine: SkillEngine;
};

export const SkillList = ({ list, skillEngine }: Props) => {
  const { lang } = useGlobalStateSnapshot();

  const onOccupationalToggle = useCallback(
    (skill: Skill, isOccupational: boolean) => {
      skillEngine.setOccupationalSkill(skill.en, isOccupational);
    },
    [skillEngine]
  );

  return (
    <>
      <h1>{list.name[lang]}</h1>
      <ul>
        {list.skills
          .sort((a, b) => a[lang].localeCompare(b[lang]))
          .map((skill) => {
            const value = skill.value ?? 0;
            const totalValue =
              (skill.occupational ? value * 2 : value) +
              (skill.freePoints ?? 0);
            return (
              <li
                key={skill[lang]}
                className={clsx(
                  skill.freePoints !== undefined && s.underlined,
                  skill.occupational && s.bold,
                  totalValue === 0 && s.muted
                )}
              >
                {skill[lang]}: {totalValue}
                <Button
                  onClick={() => skillEngine.decrementSkill(skill["en"])}
                  text="-"
                />
                <Button
                  onClick={() => skillEngine.incrementSkill(skill["en"])}
                  text="+"
                />
                <input
                  type="checkbox"
                  checked={skill.occupational ?? false}
                  onChange={(e) =>
                    onOccupationalToggle(skill, e.target.checked)
                  }
                />
              </li>
            );
          })}
      </ul>
    </>
  );
};
