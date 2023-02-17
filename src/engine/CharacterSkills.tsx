import { useReducer, useState } from "react";
import { Skill, SystemSkills } from "../systems/types";

export class CharacterSkills {
  readonly system: SystemSkills;
  readonly trigger: VoidFunction;

  constructor(system: SystemSkills, trigger: VoidFunction) {
    this.system = system;
    this.trigger = trigger;
  }

  private findGeneralSkill(skillName: string): Skill | undefined {
    return this.system.general.skills.find((s) => s.en === skillName);
  }

  private findInvestigativeSkill(skillName: string): Skill | undefined {
    let skill: Skill | undefined;
    this.system.investigative.branches.forEach((branch) =>
      branch.skills.forEach((s) => {
        if (s.en === skillName) {
          skill = s;
        }
      })
    );
    return skill;
  }

  incrementSkill(skillName: string) {
    const skill =
      this.findGeneralSkill(skillName) ||
      this.findInvestigativeSkill(skillName);
    if (!skill) throw new Error(`Skill not found: ${skillName}`);
    skill.value === undefined ? (skill.value = 1) : (skill.value += 1);
    this.trigger();
  }

  decrementSkill(skillName: string) {
    const skill =
      this.findGeneralSkill(skillName) ||
      this.findInvestigativeSkill(skillName);
    if (!skill) throw new Error(`Skill not found: ${skillName}`);
    skill.value !== undefined && skill.value > 0 && (skill.value -= 1);
    this.trigger();
  }
}

export const useCharacterSkills = (system: SystemSkills) => {
  const reducer = useReducer((prev) => prev + 1, 0);
  const [characterSkills] = useState(
    () => new CharacterSkills(system, reducer[1])
  );
  return characterSkills;
};
