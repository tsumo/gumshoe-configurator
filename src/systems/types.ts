export type Languages = "en" | "ru";

export type Term = Record<Languages, string>;

export type Skill = Term & {
  value?: number;
  freePoints?: number;
  occupational?: boolean;
};

export type SkillList = { name: Term; skills: Skill[] };

export type SystemSkills = {
  general: SkillList;
  investigative: { name: Term; branches: SkillList[] };
  generalPoints: { available: number; used: number };
  investigativePoints: {
    playersToPoints: { 2: number; 3: number; "4plus": number };
    available: number;
    used: number;
  };
};
