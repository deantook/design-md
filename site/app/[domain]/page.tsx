import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getRecords } from '@/lib/get-records'
import { PaletteGrid } from '@/components/palette-grid'
import { CopyButton } from '@/components/copy-button'
import { LangSwitcherContent } from '@/components/lang-switcher-content'
import type { DesignRecord } from '@/lib/types'
import type { Lang } from '@/config'

export function generateStaticParams() {
  return getRecords().map((r) => ({ domain: r.domain }))
}

export function generateMetadata({ params }: { params: Promise<{ domain: string }> }) {
  return params.then((p) => ({ title: `${p.domain} — design.md` }))
}

export default async function DetailPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params
  const record = getRecords().find((r) => r.domain === domain)
  if (!record) notFound()
  return <DetailContent record={record!} />
}

function DetailContent({ record }: { record: DesignRecord }) {
  return (
    <LangSwitcherContent
      zh={<DetailSide record={record} lang="zh" />}
      en={<DetailSide record={record} lang="en" />}
    />
  )
}

function DetailSide({ record, lang }: { record: DesignRecord; lang: Lang }) {
  const side = lang === 'zh' ? record.zh : record.en
  if (!side.available) {
    return (
      <main className="mx-auto max-w-container px-container-py py-8">
        <Eyebrow>Site / {record.domain}</Eyebrow>
        <p className="mt-8 font-mono text-sm text-muted-fg">
          No {lang === 'zh' ? 'Chinese' : 'English'} version available yet.
        </p>
      </main>
    )
  }
  return (
    <main className="mx-auto max-w-container px-container-py py-8">
      <Eyebrow>Site / {record.domain}</Eyebrow>
      <h1 className="mt-4 font-sans text-2xl font-semibold text-foreground">{record.domain}</h1>
      <p className="mt-3 max-w-[640px] font-sans text-base leading-6 text-foreground">{side.description}</p>
      {side.tags.length > 0 && (
        <p className="mt-3 font-mono text-xs uppercase text-muted-fg">{side.tags.join(' · ')}</p>
      )}

      <section className="mt-10">
        <Eyebrow>Palette</Eyebrow>
        <div className="mt-4"><PaletteGrid colors={side.colors} /></div>
      </section>

      <section className="mt-10">
        <Eyebrow>Download</Eyebrow>
        <div className="mt-4 flex flex-col gap-4">
          <DownloadRow href={record.githubZh} label="中文版 design.md" available={record.zh.available} />
          <DownloadRow href={record.githubEn} label="English design.md" available={record.en.available} />
        </div>
      </section>

      <Link href="/" className="mt-12 inline-block font-mono text-sm text-muted-fg hover:text-foreground">← Back to directory</Link>
    </main>
  )
}

function DownloadRow({ href, label, available }: { href: string; label: string; available: boolean }) {
  if (!available) return null
  const short = href.replace('https://raw.githubusercontent.com/', '')
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
      <a href={href} target="_blank" rel="noreferrer" className="flex flex-col">
        <span className="font-sans text-base font-semibold text-muted-fg hover:text-foreground">{label}</span>
        <span className="font-mono text-xs text-muted-soft">{short}</span>
      </a>
      <CopyButton text={href} label="Copy raw URL" />
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-sm font-medium uppercase text-foreground">{children}</span>
}
