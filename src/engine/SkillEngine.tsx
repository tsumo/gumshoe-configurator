import { useReducer, useState } from "react";
import { Skill, SkillList, SystemSkills } from "../systems/types";

const sumSkills = (list: SkillList): number =>
  list.skills.reduce((prev, curr) => prev + curr.value, 0);

export class SkillEngine {
  readonly system: SystemSkills;
  readonly trigger: VoidFunction;
  playersCount = 2;
  notEnoughGeneralPoints = false;
  notEnoughInvestigativePoints = false;

  constructor(system: SystemSkills, trigger: VoidFunction) {
    this.system = structuredClone(system);
    this.trigger = trigger;
    this.recalculate();
  }

  private recalculate() {
    this.system.general.skills.forEach((skill) =>
      this.updateSkillTotalValue(skill)
    );

    this.system.investigative.branches.forEach((branch) =>
      branch.skills.forEach((skill) => this.updateSkillTotalValue(skill))
    );

    this.system.generalPoints.used = sumSkills(this.system.general);

    this.system.investigativePoints.used =
      this.system.investigative.branches.reduce(
        (prev, branch) => prev + sumSkills(branch),
        0
      );

    this.notEnoughGeneralPoints =
      this.system.generalPoints.used > this.system.generalPoints.available;

    this.system.investigativePoints.available =
      this.playersCount <= 2
        ? this.system.investigativePoints.playersToPoints[2]
        : this.playersCount === 3
        ? this.system.investigativePoints.playersToPoints[3]
        : this.system.investigativePoints.playersToPoints["4plus"];

    this.notEnoughInvestigativePoints =
      this.system.investigativePoints.used >
      this.system.investigativePoints.available;

    this.trigger();
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

  private findSkill(skillName: string): Skill {
    const skill =
      this.findGeneralSkill(skillName) ||
      this.findInvestigativeSkill(skillName);
    if (!skill) throw new Error(`Skill not found: ${skillName}`);
    return skill;
  }

  private updateSkillTotalValue(skill: Skill) {
    skill.totalValue =
      (skill.occupational ? skill.value * 2 : skill.value) + skill.freePoints;
  }

  incrementSkill(skillName: string) {
    const skill = this.findSkill(skillName);
    skill.value += 1;
    this.recalculate();
  }

  decrementSkill(skillName: string) {
    const skill = this.findSkill(skillName);
    skill.value > 0 && (skill.value -= 1);
    this.recalculate();
  }

  setPlayersCount(n: number) {
    this.playersCount = n;
    this.recalculate();
  }

  setOccupationalSkill(skillName: string, isOccupational: boolean) {
    const skill = this.findSkill(skillName);
    skill.occupational = isOccupational;
    this.recalculate();
  }
}

export const useSkillEngine = (system: SystemSkills) => {
  const reducer = useReducer((prev) => prev + 1, 0);
  const [skillEngine] = useState(() => new SkillEngine(system, reducer[1]));
  return skillEngine;
};
