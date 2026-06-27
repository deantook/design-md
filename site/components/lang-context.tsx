'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang } from '@/config'

interface LangCtx { lang: Lang; setLang: (l: Lang) => void }
const Ctx = createContext<LangCtx>({ lang: 'zh', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh')

  useEffect(() => {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null
    if (stored === 'zh' || stored === 'en') {
      setLangState(stored)
      return
    }
    const al = typeof navigator !== 'undefined' ? navigator.language : 'zh'
    setLangState(al.toLowerCase().startsWith('en') ? 'en' : 'zh')
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch {}
  }

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export function useLang() {
  return useContext(Ctx)
}
