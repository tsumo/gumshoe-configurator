import clsx from 'clsx'
import { Fragment } from 'react'
import { Player, SkillEngine } from '../engine/SkillEngine'
import { useGlobalStateSnapshot } from '../global-state'
import { Skill } from '../systems/types'
import { uiDict } from '../ui-dict'
import { Button } from './Button'
import s from './styles.module.css'

type Props = {
  skillEngine: SkillEngine
}

const SkillName = ({ name }: { name: string }) => (
  <div className={s.skillNameWrapper}>
    <span className={s.skillName}>{name}</span>
  </div>
)

type PointsType = 'generalPoints' | 'investigativePoints'

const SkillPoints = ({ player, type }: { player: Player; type: PointsType }) => (
  <div className={clsx(s.skillPoints, s.skillColumnMargin)}>
    <span className={clsx(player.system[type].notEnough && s.warning)}>
      <span className={s.number}>{player.system[type].used}</span>
      <span> / </span>
      <span className={s.number}>{player.system[type].available}</span>
    </span>
  </div>
)

const SkillValueList = ({
  player,
  skills,
  type,
}: {
  player: Player
  skills: Skill[]
  type: PointsType
}) => {
  const { lang } = useGlobalStateSnapshot()

  return (
    <>
      <SkillPoints player={player} type={type} />
      {skills.map((skill) => (
        <div key={skill.en} className={s.skillColumnMargin}>
          <Button onClick={() => player.decrementSkill(skill['en'])} text='-' />
          <span
            className={clsx(
              s.number,
              skill.freePoints !== 0 && s.bold,
              skill.totalValue === 0 && s.muted,
            )}
          >
            {skill.totalValue}
          </span>
          <Button onClick={() => player.incrementSkill(skill['en'])} text='+' />
          <input
            type='checkbox'
            checked={skill.occupational}
            onChange={(e) => player.setOccupationalSkill(skill.en, e.target.checked)}
            title={uiDict.setOccupationalSkill[lang]}
          />
        </div>
      ))}
    </>
  )
}

export const Characters = ({ skillEngine }: Props) => {
  const { lang } = useGlobalStateSnapshot()

  const gridRows =
    skillEngine.skillCount + 1 + skillEngine.systemTemplate.investigative.branches.length
  const gridColumns = skillEngine.players.length + 1

  return (
    <div className={s.character}>
      <div
        className={s.skillGrid}
        style={{
          gridTemplateRows: `repeat(${gridRows}, auto)`,
          gridTemplateColumns: `repeat(${gridColumns}, max-content)`,
        }}
      >
        <h1>{skillEngine.players[0].system.general.name[lang]}</h1>
        {skillEngine.players[0].system.general.skills.map((skill) => (
          <SkillName key={skill.en} name={skill[lang]} />
        ))}

        {skillEngine.players[0].system.investigative.branches.map((list) => (
          <Fragment key={list.name.en}>
            <h1>{list.name[lang]}</h1>
            {list.skills.map((skill) => (
              <SkillName key={skill.en} name={skill[lang]} />
            ))}
          </Fragment>
        ))}

        {skillEngine.players.map((player) => (
          <Fragment key={player.randomId}>
            <SkillValueList
              player={player}
              skills={player.system.general.skills}
              type='generalPoints'
            />

            {player.system.investigative.branches.map((list) => (
              <SkillValueList
                key={list.name.en}
                player={player}
                skills={list.skills}
                type='investigativePoints'
              />
            ))}
          </Fragment>
        ))}
      </div>

      {skillEngine.systemTemplate.notes && <p>{skillEngine.systemTemplate.notes[lang]}</p>}
    </div>
  )
}
