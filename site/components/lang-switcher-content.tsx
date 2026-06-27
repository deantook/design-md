'use client'
import { useLang } from './lang-context'
import type { ReactNode } from 'react'

interface Props { zh: ReactNode; en: ReactNode }

export function LangSwitcherContent({ zh, en }: Props) {
  const { lang } = useLang()
  return <>{lang === 'zh' ? zh : en}</>
}
