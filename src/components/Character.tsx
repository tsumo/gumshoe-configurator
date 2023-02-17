import { useAppContext } from "../contexts/app-context";
import { useCharacterSkills } from "../engine/CharacterSkills";
import { trailOfCthulhu } from "../systems/trail-of-cthulhu";
import { SkillList } from "./SkillList";

export const Character = () => {
  const characterSkills = useCharacterSkills(trailOfCthulhu);
  const { lang } = useAppContext();

  return (
    <div>
      <SkillList
        list={characterSkills.system.general}
        characterSkills={characterSkills}
      />
      {characterSkills.system.investigative.branches.map((list) => (
        <SkillList
          key={list.name[lang]}
          list={list}
          characterSkills={characterSkills}
        />
      ))}
    </div>
  );
};
