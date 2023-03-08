import { Term } from './systems/types'

export const uiDict = {
  language: { en: 'Language', ru: 'Язык' },
  game: { en: 'Game', ru: 'Игра' },
  playersCount: { en: 'Number of players', ru: 'Количество игроков' },
  setOccupationalSkill: {
    en: 'Set skill as occupational',
    ru: 'Отметить навык как профессиональный',
  },
} satisfies Record<string, Term>
