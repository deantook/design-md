import { AsciiWordmark } from '@/components/ascii-wordmark'
import { Leaderboard } from '@/components/leaderboard'

export default function HomePage() {
  return (
    <main className="mx-auto max-w-container px-container-px py-8">
      <section className="grid grid-cols-1 items-center gap-14 py-8 md:grid-cols-[auto_1fr]">
        <AsciiWordmark />
        <p className="font-sans text-base text-muted-fg">
          A directory of website design systems, extracted as design.md.
        </p>
      </section>
      <Leaderboard />
    </main>
  )
}
