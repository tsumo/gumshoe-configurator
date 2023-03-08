import { useEffect, useReducer, useState } from 'react'
import { useGlobalStateSnapshot } from '../global-state'
import { Language, Skill, SkillList, SystemSkills } from '../systems/types'
import { randomStr, range } from '../utils'

const sumSkills = (list: SkillList): number =>
  list.skills.reduce((prev, curr) => prev + curr.value, 0)

const DEFAULT_PLAYER_COUNT = 2

export class SkillEngine {
  readonly systemTemplate: SystemSkills
  readonly trigger: VoidFunction
  readonly skillCount: number
  lang: Language
  notEnoughGeneralPoints = false
  notEnoughInvestigativePoints = false

  players: Player[]

  constructor(system: SystemSkills, lang: Language, trigger: VoidFunction) {
    this.systemTemplate = structuredClone(system)
    this.lang = lang
    this.trigger = trigger
    this.skillCount =
      system.general.skills.length +
      system.investigative.branches.reduce((prev, curr) => prev + curr.skills.length, 0)
    this.players = range(DEFAULT_PLAYER_COUNT).map(() => new Player(this, structuredClone(system)))
    this.players.forEach((p) => p.recalculate())
  }

  addPlayer() {
    this.players.push(new Player(this, structuredClone(this.systemTemplate)))
    this.players.forEach((p) => p.recalculate())
  }

  removePlayer() {
    if (this.players.length === 1) {
      throw new Error('Cannot delete last player')
    }
    this.players.pop()
    this.players.forEach((p) => p.recalculate())
  }

  setLanguage(lang: Language) {
    this.lang = lang
    this.players.forEach((p) => p.recalculate())
  }
}

export class Player {
  readonly parent: SkillEngine
  readonly system: SystemSkills
  readonly randomId: string
  notEnoughGeneralPoints = false
  notEnoughInvestigativePoints = false

  constructor(parent: SkillEngine, system: SystemSkills) {
    this.parent = parent
    this.system = structuredClone(system)
    this.randomId = randomStr()
  }

  recalculate() {
    this.sortSkills(this.system.general.skills)

    this.system.investigative.branches.forEach((branch) => this.sortSkills(branch.skills))

    this.system.general.skills.forEach((skill) => this.updateSkillTotalValue(skill))

    this.system.investigative.branches.forEach((branch) =>
      branch.skills.forEach((skill) => this.updateSkillTotalValue(skill)),
    )

    this.system.generalPoints.used = sumSkills(this.system.general)

    this.system.investigativePoints.used = this.system.investigative.branches.reduce(
      (prev, branch) => prev + sumSkills(branch),
      0,
    )

    this.notEnoughGeneralPoints =
      this.system.generalPoints.used > this.system.generalPoints.available

    this.system.investigativePoints.available =
      this.parent.players.length <= 2
        ? this.system.investigativePoints.playersToPoints[2]
        : this.parent.players.length === 3
        ? this.system.investigativePoints.playersToPoints[3]
        : this.system.investigativePoints.playersToPoints['4plus']

    this.notEnoughInvestigativePoints =
      this.system.investigativePoints.used > this.system.investigativePoints.available

    this.parent.trigger()
  }

  private updateSkillTotalValue(skill: Skill) {
    skill.totalValue = (skill.occupational ? skill.value * 2 : skill.value) + skill.freePoints
  }

  private sortSkills(skills: Skill[]) {
    skills.sort((a, b) => a[this.parent.lang].localeCompare(b[this.parent.lang]))
  }

  private findGeneralSkill(skillName: string): Skill | undefined {
    return this.system.general.skills.find((s) => s.en === skillName)
  }

  private findInvestigativeSkill(skillName: string): Skill | undefined {
    let skill: Skill | undefined
    this.system.investigative.branches.forEach((branch) =>
      branch.skills.forEach((s) => {
        if (s.en === skillName) {
          skill = s
        }
      }),
    )
    return skill
  }

  private findSkill(skillName: string): Skill {
    const skill = this.findGeneralSkill(skillName) || this.findInvestigativeSkill(skillName)
    if (!skill) throw new Error(`Skill not found: ${skillName}`)
    return skill
  }

  incrementSkill(skillName: string) {
    const skill = this.findSkill(skillName)
    skill.value += 1
    this.recalculate()
  }

  decrementSkill(skillName: string) {
    const skill = this.findSkill(skillName)
    skill.value > 0 && (skill.value -= 1)
    this.recalculate()
  }

  setOccupationalSkill(skillName: string, isOccupational: boolean) {
    const skill = this.findSkill(skillName)
    skill.occupational = isOccupational
    this.recalculate()
  }
}

export const useSkillEngine = (system: SystemSkills) => {
  const { lang } = useGlobalStateSnapshot()
  const [_, trigger] = useReducer((prev) => prev + 1, 0)
  const [skillEngine] = useState(() => new SkillEngine(system, lang, trigger))

  useEffect(() => {
    skillEngine.setLanguage(lang)
  }, [skillEngine, lang])

  return skillEngine
}
