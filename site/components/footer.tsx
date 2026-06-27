import Link from 'next/link'
import { config } from '@/config'

const COLS: { heading: string; links: { label: string; href: string }[] }[] = [
  { heading: 'BROWSE', links: [{ label: 'All sites', href: '/' }] },
  { heading: 'TOPICS', links: [{ label: 'Dark', href: '/' }, { label: 'Light', href: '/' }, { label: 'Serif', href: '/' }] },
  { heading: 'ABOUT', links: [{ label: 'About', href: '/about' }] },
  { heading: 'DOCS', links: [{ label: 'How to contribute', href: '/about' }] },
  { heading: 'PROJECT', links: [{ label: 'GitHub', href: `https://github.com/${config.repoOwner}/${config.repoName}` }] },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-container-px py-12">
      <div className="mx-auto grid max-w-container grid-cols-2 gap-8 md:grid-cols-5">
        {COLS.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase text-foreground">{col.heading}</span>
            {col.links.map((l) => (
              <Link key={l.label} href={l.href} className="font-sans text-sm text-muted-fg hover:text-foreground">{l.label}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-container font-sans text-xs text-muted-soft">
        design.md — open source on GitHub
      </div>
    </footer>
  )
}
