import { useState } from "react";
import { useAppContext } from "../contexts/app-context";
import { CharacterSkills } from "../engine/Skills";
import { trailOfCthulhu } from "../systems/trail-of-cthulhu";
import { SkillList } from "./SkillList";

export const Character = () => {
  const [characterSkills] = useState(() => new CharacterSkills(trailOfCthulhu));
  const { lang } = useAppContext();

  return (
    <div>
      <SkillList list={characterSkills.skills.general} />
      {characterSkills.skills.investigative.branches.map((list) => (
        <SkillList key={list.name[lang]} list={list} />
      ))}
    </div>
  );
};
