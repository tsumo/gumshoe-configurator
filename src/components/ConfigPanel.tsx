import React, { useCallback } from 'react'
import { SkillEngine } from '../engine/SkillEngine'
import { globalState, useGlobalStateSnapshot } from '../global-state'
import { uiDict } from '../ui-dict'
import { Button } from './Button'
import s from './styles.module.css'

type Props = {
  skillEngine: SkillEngine
}

export const ConfigPanel = ({ skillEngine }: Props) => {
  const { lang } = useGlobalStateSnapshot()

  const onLangSelect = useCallback<React.ChangeEventHandler<HTMLSelectElement>>((e) => {
    if (e.target.value === 'en' || e.target.value === 'ru') {
      globalState.lang = e.target.value
    }
  }, [])

  const incrementPlayersCount = useCallback(() => {
    skillEngine.addPlayer()
  }, [skillEngine])

  const decrementPlayersCount = useCallback(() => {
    if (skillEngine.players.length > 2) {
      skillEngine.removePlayer()
    }
  }, [skillEngine])

  return (
    <div className={s.configPanel}>
      <div>
        <span>{uiDict.language[lang]}: </span>
        <select onChange={onLangSelect} defaultValue={lang}>
          <option value='en'>EN</option>
          <option value='ru'>RU</option>
        </select>
      </div>

      <div>
        <span>{uiDict.playersCount[lang]}: </span>
        <Button text='-' onClick={decrementPlayersCount} />
        <span className={s.number}>{skillEngine.players.length}</span>
        <Button text='+' onClick={incrementPlayersCount} />
      </div>

      {/* <div className={clsx(skillEngine.notEnoughGeneralPoints && s.warning)}>
        {skillEngine.system.general.name[lang]}{' '}
        <span className={s.number}>{skillEngine.system.generalPoints.used}</span>
        <span> / </span>
        <span className={s.number}>{skillEngine.system.generalPoints.available}</span>
      </div>

      <div className={clsx(skillEngine.notEnoughInvestigativePoints && s.warning)}>
        {skillEngine.system.investigative.name[lang]}{' '}
        <span className={s.number}>{skillEngine.system.investigativePoints.used}</span>
        <span> / </span>
        <span className={s.number}>{skillEngine.system.investigativePoints.available}</span>
      </div> */}
    </div>
  )
}
