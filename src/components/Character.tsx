import { useEffect } from "react";
import clsx from "clsx";
import { useGlobalStateSnapshot } from "../global-state";
import { useCharacterSkills } from "../engine/CharacterSkills";
import { trailOfCthulhu } from "../systems/trail-of-cthulhu";
import { SkillList } from "./SkillList";
import s from "./styles.module.css";

export const Character = () => {
  const characterSkills = useCharacterSkills(trailOfCthulhu);
  const { lang, playersCount } = useGlobalStateSnapshot();

  useEffect(() => {
    characterSkills.setPlayersCount(playersCount);
  }, [characterSkills, playersCount]);

  return (
    <div>
      <p className={clsx(characterSkills.notEnoughGeneralPoints && s.warning)}>
        {`${characterSkills.system.general.name[lang]} ${characterSkills.system.generalPoints.used} / ${characterSkills.system.generalPoints.available}`}
      </p>
      <SkillList
        list={characterSkills.system.general}
        characterSkills={characterSkills}
      />
      <p
        className={clsx(
          characterSkills.notEnoughInvestigativePoints && s.warning
        )}
      >
        {`${characterSkills.system.investigative.name[lang]} ${characterSkills.system.investigativePoints.used} / ${characterSkills.system.investigativePoints.available}`}
      </p>
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
