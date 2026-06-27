import type { SearchEntry } from './types'

export interface ScoredEntry { entry: SearchEntry; score: number }

export function matchEntries(entries: SearchEntry[], query: string): SearchEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return entries
  const scored: ScoredEntry[] = []
  for (const entry of entries) {
    const domain = entry.domain.toLowerCase()
    const score = scoreEntry(entry, q, domain)
    if (score > 0) scored.push({ entry, score })
  }
  scored.sort((a, b) => b.score - a.score || a.entry.domain.localeCompare(b.entry.domain))
  return scored.map((s) => s.entry)
}

function scoreEntry(entry: SearchEntry, q: string, domain: string): number {
  if (domain.startsWith(q)) return 100 - (domain.length - q.length)
  if (q.startsWith(domain + '/')) return 80
  if (domain.includes(q)) return 50
  if (entry.name.toLowerCase().includes(q)) return 40
  if (entry.description.toLowerCase().includes(q)) return 20
  if (entry.tags.some((t) => t.toLowerCase() === q)) return 10
  if (entry.tags.some((t) => t.toLowerCase().includes(q))) return 5
  return 0
}
