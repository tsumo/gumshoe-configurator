import clsx from "clsx";
import { useGlobalStateSnapshot } from "../global-state";
import { CharacterSkills } from "../engine/CharacterSkills";
import { SkillList as SkillListType } from "../systems/types";
import { SkillButton } from "./SkillButton";
import s from "./styles.module.css";

type Props = {
  list: SkillListType;
  characterSkills: CharacterSkills;
};

export const SkillList = ({ list, characterSkills }: Props) => {
  const { lang } = useGlobalStateSnapshot();

  return (
    <>
      <h1>{list.name[lang]}</h1>
      <ul>
        {list.skills
          .sort((a, b) => a[lang].localeCompare(b[lang]))
          .map((skill) => {
            const totalValue = (skill.value ?? 0) + (skill.freePoints ?? 0);
            return (
              <li
                key={skill[lang]}
                className={clsx(
                  skill.freePoints !== undefined && s.bold,
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
              </li>
            );
          })}
      </ul>
    </>
  );
};
