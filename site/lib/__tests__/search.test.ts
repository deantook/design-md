import { describe, it, expect } from 'vitest'
import { matchEntries } from '../search'
import type { SearchEntry } from '../types'

const entries: SearchEntry[] = [
  { domain: 'claude.com', name: 'claude', description: 'anthropic', tags: ['衬线', '浅色主题'], colorCount: 12, palette: ['#000'] },
  { domain: 'cursor.com', name: 'cursor', description: 'ai editor', tags: ['无衬线', '浅色主题'], colorCount: 20, palette: ['#fff'] },
  { domain: 'skills.sh', name: 'skills', description: 'agent skills', tags: ['深色主题', '无衬线'], colorCount: 6, palette: ['#000'] },
]

describe('matchEntries', () => {
  it('empty query returns all', () => {
    expect(matchEntries(entries, '')).toHaveLength(3)
  })
  it('whitespace-only returns all', () => {
    expect(matchEntries(entries, '   ')).toHaveLength(3)
  })
  it('domain prefix ranks first', () => {
    const r = matchEntries(entries, 'claud')
    expect(r[0].domain).toBe('claude.com')
  })
  it('domain substring matches', () => {
    const r = matchEntries(entries, 'laude')
    expect(r.map((x) => x.domain)).toEqual(['claude.com'])
  })
  it('path fragment matches domain with slash', () => {
    expect(matchEntries(entries, 'cursor.com/docs')[0]?.domain).toBe('cursor.com')
  })
  it('tag matches as lowest priority', () => {
    const r = matchEntries(entries, '深色主题')
    expect(r.map((x) => x.domain)).toEqual(['skills.sh'])
  })
  it('no match returns empty', () => {
    expect(matchEntries(entries, 'zzz')).toEqual([])
  })
  it('prefix outranks substring outranks tag', () => {
    const e: SearchEntry[] = [
      { domain: 'a.com', name: '', description: '', tags: [], colorCount: 0, palette: [] },
      { domain: 'abc.com', name: '', description: '', tags: [], colorCount: 0, palette: [] },
    ]
    const r = matchEntries(e, 'a')
    expect(r[0].domain).toBe('a.com')
  })
})
