import { proxy, useSnapshot } from 'valtio'
import { Language } from './systems/types'

// TODO: add SkillEngine
type GlobalState = {
  lang: Language
}

const lang: Language = /^ru\b/.test(navigator.language) ? 'ru' : 'en'

export const globalState = proxy<GlobalState>({ lang })

export const useGlobalStateSnapshot = () => useSnapshot(globalState)
