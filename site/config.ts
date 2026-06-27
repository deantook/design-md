export const config = {
  repoOwner: 'deantook',
  repoName: 'design-md',
  branch: 'main',
  designDir: '../design',
} as const

export type Lang = 'zh' | 'en'

export const CANONICAL_TAGS: Record<string, string[]> = {
  ALL: [],
  DARK: ['深色主题'],
  LIGHT: ['浅色主题'],
  SERIF: ['衬线'],
  SANS: ['无衬线'],
} as const
