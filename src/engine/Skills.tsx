import { SystemSkills } from "../systems/types";

export class CharacterSkills {
  readonly skills: SystemSkills;

  constructor(skills: SystemSkills) {
    this.skills = skills;
  }
}
