'use client'
import { useState, useMemo, useEffect } from 'react'
import { SearchInput } from './search-input'
import { LeaderboardRow } from './leaderboard-row'
import { matchEntries } from '@/lib/search'
import { CANONICAL_TAGS } from '@/config'
import type { SearchEntry } from '@/lib/types'

interface Props { entries: SearchEntry[] }

const TABS = Object.keys(CANONICAL_TAGS)

export function Leaderboard({ entries }: Props) {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('ALL')
  const [activeIdx, setActiveIdx] = useState(0)

  const tabFiltered = useMemo(() => {
    const tags = CANONICAL_TAGS[tab] || []
    if (tags.length === 0) return entries
    return entries.filter((e) => tags.some((t) => e.tags.includes(t)))
  }, [entries, tab])

  const matched = useMemo(() => matchEntries(tabFiltered, query), [tabFiltered, query])

  useEffect(() => { setActiveIdx(0) }, [query, tab])

  const go = (i: number) => {
    if (matched.length === 0) return
    const next = (i + matched.length) % matched.length
    setActiveIdx(next)
  }

  return (
    <section className="py-8">
      <span className="font-mono text-sm font-medium uppercase text-foreground">Sites Leaderboard</span>
      <div className="mt-4">
        <SearchInput
          value={query}
          onChange={setQuery}
          onEnter={() => { if (matched[activeIdx]) window.location.href = `/${matched[activeIdx].domain}` }}
          onArrowDown={() => go(activeIdx + 1)}
          onArrowUp={() => go(activeIdx - 1)}
        />
      </div>
      <div className="mt-4 flex gap-6">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`border-b-2 pb-1 font-mono text-sm ${tab === t ? 'border-foreground text-foreground' : 'border-transparent text-nav-link hover:text-foreground'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-2">
        {matched.length === 0 ? (
          <p className="py-8 text-center font-mono text-sm text-muted-fg">No matches found.</p>
        ) : (
          matched.map((e, i) => (
            <LeaderboardRow key={e.domain} entry={e} index={i} selected={i === activeIdx} />
          ))
        )}
      </div>
    </section>
  )
}
