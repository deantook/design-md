'use client'
import { useLang } from './lang-context'
import type { Lang } from '@/config'

export function LangSwitcher() {
  const { lang, setLang } = useLang()
  const item = (l: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      className={`font-mono text-sm uppercase ${lang === l ? 'text-foreground' : 'text-nav-link hover:text-foreground'}`}
    >
      {label}
    </button>
  )
  return (
    <div className="flex items-center gap-2">
      {item('zh', '中文')}
      <span className="text-muted-soft">/</span>
      {item('en', 'EN')}
    </div>
  )
}
