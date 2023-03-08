import { useEffect } from 'react'
import { Characters } from './components/Characters'
import { ConfigPanel } from './components/ConfigPanel'
import { useSkillEngine } from './engine/SkillEngine'
import { useGlobalStateSnapshot } from './global-state'
import { trailOfCthulhu } from './systems/trail-of-cthulhu'

export const App = () => {
  const { lang } = useGlobalStateSnapshot()
  const skillEngine = useSkillEngine(trailOfCthulhu)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <>
      <ConfigPanel skillEngine={skillEngine} />
      <Characters skillEngine={skillEngine} />
    </>
  )
}
