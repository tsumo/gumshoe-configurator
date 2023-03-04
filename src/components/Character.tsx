import { SkillEngine } from "../engine/SkillEngine";
import { useGlobalStateSnapshot } from "../global-state";
import { SkillList } from "./SkillList";
import s from "./styles.module.css";

type Props = {
  skillEngine: SkillEngine;
};

export const Character = ({ skillEngine }: Props) => {
  const { lang } = useGlobalStateSnapshot();

  return (
    <div className={s.character}>
      <SkillList list={skillEngine.system.general} skillEngine={skillEngine} />

      {skillEngine.system.investigative.branches.map((list) => (
        <SkillList
          key={list.name[lang]}
          list={list}
          skillEngine={skillEngine}
        />
      ))}
    </div>
  );
};
