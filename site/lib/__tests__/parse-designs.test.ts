import { describe, it, expect } from 'vitest'
import path from 'node:path'
import { parseDesigns } from '../parse-designs'

const FIXTURES = path.resolve(__dirname, 'fixtures')

describe('parseDesigns', () => {
  it('pairs zh + en by domain', () => {
    const records = parseDesigns(FIXTURES)
    const example = records.find((r) => r.domain === 'example.com')
    expect(example).toBeDefined()
    expect(example?.zh.description).toBe('一个示例站点的设计分析。')
    expect(example?.en.description).toBe('An example site design analysis.')
    expect(example?.zh.available).toBe(true)
    expect(example?.en.available).toBe(true)
  })
  it('marks missing side as unavailable', () => {
    const records = parseDesigns(FIXTURES)
    const lonely = records.find((r) => r.domain === 'lonely.org')
    expect(lonely?.zh.available).toBe(true)
    expect(lonely?.en.available).toBe(false)
  })
  it('extracts + luminance-sorts colors', () => {
    const records = parseDesigns(FIXTURES)
    const example = records.find((r) => r.domain === 'example.com')!
    expect(example.zh.colors).toEqual(['#000000', '#1c1c1c', '#ededed'])
  })
  it('ignores files not matching naming convention', () => {
    const records = parseDesigns(FIXTURES)
    expect(records.find((r) => r.domain === 'badname')).toBeUndefined()
  })
  it('builds github raw urls', () => {
    const records = parseDesigns(FIXTURES)
    const example = records.find((r) => r.domain === 'example.com')!
    expect(example.githubZh).toContain('example.com.design.zh.md')
    expect(example.githubEn).toContain('example.com.design.en.md')
  })
  it('missing side has empty colors + empty tags', () => {
    const records = parseDesigns(FIXTURES)
    const lonely = records.find((r) => r.domain === 'lonely.org')!
    expect(lonely.en.colors).toEqual([])
    expect(lonely.en.tags).toEqual([])
    expect(lonely.en.description).toBe('')
  })
})
