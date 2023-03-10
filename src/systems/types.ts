export type Language = 'en' | 'ru'

export type Term = Record<Language, string>

export type SkillTemplate = Term & { freePoints?: number }

export type Skill = Term & {
  value: number
  freePoints: number
  occupational: boolean
  totalValue: number
}

export type SkillList = { name: Term; skills: Skill[] }

export type SystemSkills = {
  name: Term
  notes?: Term
  general: SkillList
  investigative: { name: Term; branches: SkillList[] }
  generalPoints: { available: number; used: number; notEnough: boolean }
  investigativePoints: {
    available: number
    used: number
    notEnough: boolean
    playersToPoints: { 2: number; 3: number; '4plus': number }
  }
}

export const convertSkillTemplatesToSkills = (templates: SkillTemplate[]): Skill[] =>
  templates.map((t) => ({
    en: t.en,
    ru: t.ru,
    freePoints: t.freePoints ?? 0,
    value: 0,
    occupational: false,
    totalValue: t.freePoints ?? 0,
  }))
