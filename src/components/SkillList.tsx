import clsx from "clsx";
import { useAppContext } from "../contexts/app-context";
import { SkillList as SkillListType } from "../systems/types";
import s from "./SkillList.module.css";

type Props = { list: SkillListType };

export const SkillList = ({ list }: Props) => {
  const { lang } = useAppContext();

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
              </li>
            );
          })}
      </ul>
    </>
  );
};
