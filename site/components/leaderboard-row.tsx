import Link from 'next/link'
import type { SearchEntry } from '@/lib/types'

interface Props {
  entry: SearchEntry
  index: number
  selected: boolean
}

export function LeaderboardRow({ entry, index, selected }: Props) {
  return (
    <Link
      href={`/${entry.domain}`}
      className={`grid grid-cols-[32px_1fr_auto] items-center gap-4 border-b border-border px-0 py-3 h-row-h ${selected ? 'bg-[#0a0a0a]' : ''}`}
    >
      <span className="font-mono text-sm text-muted-fg">{index + 1}</span>
      <div className="flex flex-col">
        <span className="font-sans text-base font-semibold text-foreground">{entry.domain}</span>
        <span className="font-mono text-xs uppercase text-muted-fg">{entry.tags.slice(0, 3).join(' · ')}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-1 sm:flex">
          {entry.palette.slice(0, 6).map((c, i) => (
            <span key={i} className="block h-3 w-3" style={{ backgroundColor: c }} aria-label={c} />
          ))}
        </div>
        <span className="font-mono text-sm text-muted-fg">{entry.colorCount}</span>
      </div>
    </Link>
  )
}
