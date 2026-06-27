import { AsciiWordmark } from '@/components/ascii-wordmark'
import { Leaderboard } from '@/components/leaderboard'
import { getRecords } from '@/lib/get-records'
import { buildSearchIndex } from '@/lib/search-index'

export default function HomePage() {
  const records = getRecords()
  const entries = buildSearchIndex(records)
  return (
    <main className="mx-auto max-w-container px-container-py py-8">
      <section className="grid grid-cols-1 items-center gap-14 py-8 md:grid-cols-[auto_1fr]">
        <AsciiWordmark />
        <p className="font-sans text-base text-muted-fg">
          A directory of website design systems, extracted as design.md.
        </p>
      </section>
      <Leaderboard entries={entries} />
    </main>
  )
}
