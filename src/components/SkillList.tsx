import clsx from "clsx";
import { useGlobalStateSnapshot } from "../global-state";
import { SkillEngine } from "../engine/SkillEngine";
import { Skill, SkillList as SkillListType } from "../systems/types";
import { Button } from "./Button";
import s from "./styles.module.css";
import { useCallback, useMemo } from "react";

type Props = {
  list: SkillListType;
  skillEngine: SkillEngine;
};

export const SkillList = ({ list, skillEngine }: Props) => {
  const { lang, playersCount } = useGlobalStateSnapshot();

  const onOccupationalToggle = useCallback(
    (skill: Skill, isOccupational: boolean) => {
      skillEngine.setOccupationalSkill(skill.en, isOccupational);
    },
    [skillEngine]
  );

  const sortedSkills = useMemo(
    () => list.skills.sort((a, b) => a[lang].localeCompare(b[lang])),
    [lang, list.skills]
  );

  const gridRows = list.skills.length;
  const gridColumns = playersCount + 1;

  return (
    <>
      <h1>{list.name[lang]}</h1>

      <div
        className={s.skillListContainer}
        style={{
          gridTemplateRows: `repeat(${gridRows}, 1fr)`,
          gridTemplateColumns: `repeat(${gridColumns}, max-content)`,
        }}
      >
        {sortedSkills.map((skill) => (
          <div key={skill.en} className={s.skillName}>
            <span className={s.skillValue}>{skill[lang]}</span>
          </div>
        ))}

        {sortedSkills.map((skill) => (
          <div key={skill.en}>
            <Button
              onClick={() => skillEngine.decrementSkill(skill["en"])}
              text="-"
            />
            <span
              className={clsx(
                s.number,
                skill.freePoints !== 0 && s.bold,
                skill.totalValue === 0 && s.muted
              )}
            >
              {skill.totalValue}
            </span>
            <Button
              onClick={() => skillEngine.incrementSkill(skill["en"])}
              text="+"
            />
            <input
              type="checkbox"
              checked={skill.occupational}
              onChange={(e) => onOccupationalToggle(skill, e.target.checked)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
