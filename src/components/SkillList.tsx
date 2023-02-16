import { useAppContext } from "../contexts/app-context";
import { SkillList as SkillListType } from "../systems/types";

type Props = { list: SkillListType };

export const SkillList = ({ list }: Props) => {
  const { lang } = useAppContext();

  return (
    <>
      <h1>{list.name[lang]}</h1>
      <ul>
        {list.skills
          .sort((a, b) => a[lang].localeCompare(b[lang]))
          .map((skill) => (
            <li key={skill[lang]}>{skill[lang]}</li>
          ))}
      </ul>
    </>
  );
};
