import Link from 'next/link'
import { LangSwitcher } from './lang-switcher'
import { config } from '@/config'

export function TopNav() {
  const repoUrl = `https://github.com/${config.repoOwner}/${config.repoName}`
  return (
    <header className="sticky top-0 z-50 h-header-h bg-background px-4">
      <div className="mx-auto flex h-full max-w-container items-center justify-between">
        <Link href="/" className="flex items-center gap-1 font-mono text-sm uppercase text-foreground">
          <span className="text-[10px]">▼</span> Design.md
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="font-sans text-sm text-nav-link hover:text-foreground">Browse</Link>
          <Link href="/about" className="font-sans text-sm text-nav-link hover:text-foreground">About</Link>
          <a href={repoUrl} target="_blank" rel="noreferrer" className="font-sans text-sm text-nav-link hover:text-foreground">GitHub</a>
          <LangSwitcher />
        </nav>
      </div>
    </header>
  )
}
