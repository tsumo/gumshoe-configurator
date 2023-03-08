import { proxy, useSnapshot } from 'valtio'
import { Language } from './systems/types'

type GlobalState = {
  lang: Language
  playersCount: number
}

const lang: Language = /^ru\b/.test(navigator.language) ? 'ru' : 'en'

export const globalState = proxy<GlobalState>({ lang, playersCount: 2 })

export const useGlobalStateSnapshot = () => useSnapshot(globalState)
