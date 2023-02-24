import clsx from "clsx";
import { useGlobalStateSnapshot } from "../global-state";
import { CharacterSkills } from "../engine/CharacterSkills";
import { Skill, SkillList as SkillListType } from "../systems/types";
import { SkillButton } from "./SkillButton";
import s from "./styles.module.css";
import { useCallback } from "react";

type Props = {
  list: SkillListType;
  characterSkills: CharacterSkills;
};

export const SkillList = ({ list, characterSkills }: Props) => {
  const { lang } = useGlobalStateSnapshot();

  const onOccupationalToggle = useCallback(
    (skill: Skill, isOccupational: boolean) => {
      characterSkills.setOccupationalSkill(skill.en, isOccupational);
    },
    [characterSkills]
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
                <SkillButton
                  onClick={() => characterSkills.decrementSkill(skill["en"])}
                  text="-"
                />
                <SkillButton
                  onClick={() => characterSkills.incrementSkill(skill["en"])}
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
