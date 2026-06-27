import { describe, it, expect } from 'vitest'
import { buildRawUrl } from '../github-url'

describe('buildRawUrl', () => {
  it('builds zh raw url', () => {
    expect(buildRawUrl('claude.com', 'zh')).toBe(
      'https://raw.githubusercontent.com/deantook/design-md/main/design/claude.com.design.zh.md'
    )
  })
  it('builds en raw url', () => {
    expect(buildRawUrl('cursor.com', 'en')).toBe(
      'https://raw.githubusercontent.com/deantook/design-md/main/design/cursor.com.design.en.md'
    )
  })
})
