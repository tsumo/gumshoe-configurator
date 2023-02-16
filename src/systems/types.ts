export type Languages = "en" | "ru";

export type Term = Record<Languages, string>;

export type SkillList = { name: Term; skills: Term[] };

export type SystemSkills = {
  general: SkillList;
  investigative: { name: Term; branches: SkillList[] };
};
