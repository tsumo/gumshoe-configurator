import clsx from "clsx";
import { Fragment } from "react";
import { SkillEngine } from "../engine/SkillEngine";
import { useGlobalStateSnapshot } from "../global-state";
import { Skill } from "../systems/types";
import { Button } from "./Button";
import s from "./styles.module.css";

type Props = {
  skillEngine: SkillEngine;
};

const SkillName = ({ name }: { name: string }) => (
  <div className={s.skillNameWrapper}>
    <span className={s.skillName}>{name}</span>
  </div>
);

const SkillValueList = ({
  skillEngine,
  skills,
}: {
  skillEngine: SkillEngine;
  skills: Skill[];
}) => {
  return (
    <>
      <div />
      {skills.map((skill) => (
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
            onChange={(e) =>
              skillEngine.setOccupationalSkill(skill.en, e.target.checked)
            }
          />
        </div>
      ))}
    </>
  );
};

export const Character = ({ skillEngine }: Props) => {
  const { lang, playersCount } = useGlobalStateSnapshot();

  const gridRows =
    skillEngine.skillCount +
    1 +
    skillEngine.system.investigative.branches.length;
  const gridColumns = playersCount + 1;

  return (
    <div
      className={s.character}
      style={{
        gridTemplateRows: `repeat(${gridRows}, auto)`,
        gridTemplateColumns: `repeat(${gridColumns}, max-content)`,
      }}
    >
      <h1>{skillEngine.system.general.name[lang]}</h1>
      {skillEngine.system.general.skills.map((skill) => (
        <SkillName key={skill.en} name={skill[lang]} />
      ))}

      {skillEngine.system.investigative.branches.map((list) => (
        <Fragment key={list.name.en}>
          <h1>{list.name[lang]}</h1>
          {list.skills.map((skill) => (
            <SkillName key={skill.en} name={skill[lang]} />
          ))}
        </Fragment>
      ))}

      <SkillValueList
        skillEngine={skillEngine}
        skills={skillEngine.system.general.skills}
      />

      {skillEngine.system.investigative.branches.map((list) => (
        <SkillValueList
          key={list.name.en}
          skillEngine={skillEngine}
          skills={list.skills}
        />
      ))}
    </div>
  );
};
