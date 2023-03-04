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
            const totalValue =
              (skill.occupational ? skill.value * 2 : skill.value) +
              skill.freePoints;
            return (
              <li key={skill[lang]}>
                <span
                  className={clsx(
                    skill.freePoints !== 0 && s.underlined,
                    skill.occupational && s.bold,
                    totalValue === 0 && s.muted
                  )}
                >
                  {skill[lang]}: {totalValue}
                </span>
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
                  checked={skill.occupational}
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
