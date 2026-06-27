import type { Lang } from '@/config'

export interface DesignSide {
  name: string
  description: string
  tags: string[]
  colors: string[]
  available: boolean
}

export interface DesignRecord {
  domain: string
  zh: DesignSide
  en: DesignSide
  githubZh: string
  githubEn: string
}

export interface SearchEntry {
  domain: string
  name: string
  description: string
  tags: string[]
  colorCount: number
  palette: string[]
}

export type { Lang }
