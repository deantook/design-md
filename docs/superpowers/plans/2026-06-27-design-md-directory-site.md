# design.md 目录站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Next.js site that lets users search website design.md files by URL and view metadata cards (description, tags, color palette) with bilingual GitHub raw download links, styled after skills.sh's pure-black terminal aesthetic.

**Architecture:** Next.js 15 App Router static export (`output: 'export'`). Build-time scripts scan `design/*.design.{zh,en}.md`, parse YAML frontmatter with `gray-matter`, pair zh/en by domain, emit a `search-index.json` and static detail pages per domain. Client-side fuzzy search (self-written, zero-dep) filters the leaderboard. Visual system mirrors skills.sh tokens via Tailwind v4.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS v4, `geist` font package, `gray-matter`, Vitest for unit tests, Vercel deployment.

**Spec:** `docs/superpowers/specs/2026-06-27-design-md-directory-site-design.md`

**Repo facts:** remote `deantook/design-md`, default branch `main`, data dir `design/` at repo root, app lives in new `site/` subdirectory.

---

## File Structure

| File | Responsibility |
|---|---|
| `site/package.json` | Deps + scripts (dev/build/test/lint) |
| `site/config.ts` | Repo owner/name/branch + designDir path |
| `site/next.config.ts` | `output: 'export'`, font config |
| `site/tsconfig.json` | Strict TS config |
| `site/tailwind.config.ts` | skills.sh token mapping (colors/font/spacing) |
| `site/app/globals.css` | Tailwind directives + pure-black base + font faces |
| `site/app/layout.tsx` | Root layout: font injection, TopNav, Footer, lang provider |
| `site/app/page.tsx` | Home: hero + search + leaderboard + tabs |
| `site/app/[domain]/page.tsx` | Detail page (generateStaticParams) |
| `site/app/about/page.tsx` | About page |
| `site/app/not-found.tsx` | Custom 404 |
| `site/lib/types.ts` | Shared TS types (DesignRecord, SearchEntry, Lang) |
| `site/lib/parse-designs.ts` | Scan design/, parse frontmatter, pair zh/en, extract colors |
| `site/lib/github-url.ts` | Build raw GitHub URL per domain+lang |
| `site/lib/search-index.ts` | Build search-index.json from records |
| `site/lib/search.ts` | Client-side match function (prefix/substring/tag) |
| `site/lib/colors.ts` | Extract + validate + sort-by-luminance color values |
| `site/components/top-nav.tsx` | Sticky 56px nav + lang switcher + GitHub link |
| `site/components/footer.tsx` | 5-column footer |
| `site/components/lang-switcher.tsx` | 中文/EN toggle (localStorage, Accept-Language) |
| `site/components/ascii-wordmark.tsx` | Fira Mono "DESIGN.MD" hero art |
| `site/components/search-input.tsx` | Mono search box + keyboard shortcuts |
| `site/components/leaderboard.tsx` | Leaderboard table + tabs |
| `site/components/leaderboard-row.tsx` | Single row |
| `site/components/palette-grid.tsx` | Color swatch grid |
| `site/components/copy-button.tsx` | Copy-to-clipboard icon button |
| `site/components/lang-context.tsx` | React context for current lang |
| `site/lib/__tests__/parse-designs.test.ts` | Unit tests |
| `site/lib/__tests__/github-url.test.ts` | Unit tests |
| `site/lib/__tests__/search.test.ts` | Unit tests |
| `site/lib/__tests__/colors.test.ts` | Unit tests |
| `.github/workflows/ci.yml` | Lint + test + build |

---

## Task 1: Scaffold Next.js site with Tailwind + Vitest

**Files:**
- Create: `site/package.json`
- Create: `site/tsconfig.json`
- Create: `site/next.config.ts`
- Create: `site/tailwind.config.ts`
- Create: `site/vitest.config.ts`
- Create: `site/app/globals.css`
- Create: `site/app/layout.tsx`
- Create: `site/app/page.tsx`
- Create: `site/config.ts`
- Create: `site/.gitignore`

- [ ] **Step 1: Create `site/package.json`**

```json
{
  "name": "design-md-site",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "gray-matter": "^4.0.3",
    "geist": "^1.3.1"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "vitest": "^2.1.0",
    "@vitest/ui": "^2.1.0",
    "jsdom": "^25.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.6.0"
  }
}
```

- [ ] **Step 2: Create `site/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `site/next.config.ts`**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  // design/ lives outside site/; trace it so static export can read it at build
  outputFileTracingIncludes: { './**': ['../design/**/*'] },
  images: { unoptimized: true },
}

export default nextConfig
```

- [ ] **Step 4: Create `site/config.ts`**

```ts
export const config = {
  repoOwner: 'deantook',
  repoName: 'design-md',
  branch: 'main',
  designDir: '../design',
} as const

export type Lang = 'zh' | 'en'

export const CANONICAL_TAGS: Record<string, string[]> = {
  ALL: [],
  DARK: ['深色主题'],
  LIGHT: ['浅色主题'],
  SERIF: ['衬线'],
  SANS: ['无衬线'],
} as const
```

- [ ] **Step 5: Create `site/tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ededed',
        border: '#1c1c1c',
        'nav-link': '#a1a1aa',
        'muted-fg': '#8a8a8a',
        'muted-soft': '#787878',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        ascii: ['"Fira Mono"', 'ui-monospace', 'monospace'],
      },
      spacing: {
        'header-h': '56px',
        'row-h': '45px',
        'search-h': '45px',
        'container-max': '1152px',
        'container-px': '32px',
      },
      maxWidth: { container: '1152px' },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 6: Create `site/app/globals.css`**

```css
@import 'tailwindcss';

:root {
  --font-geist: 'Geist', system-ui, sans-serif;
  --font-geist-mono: 'Geist Mono', ui-monospace, monospace;
}

html { background-color: #000000; color-scheme: dark; }
body {
  background-color: #000000;
  color: #ededed;
  font-family: var(--font-geist);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 7: Create `site/vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts'],
  },
  resolve: { alias: { '@': './' } },
})
```

Also create `site/vitest-setup.ts`:
```ts
import '@testing-library/jest-dom/vitest'
```

Add `@vitejs/plugin-react` to devDeps in package.json:
```json
"@vitejs/plugin-react": "^4.3.0"
```

- [ ] **Step 8: Create minimal `site/app/layout.tsx`**

```tsx
import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata = {
  title: 'design.md — website design system directory',
  description: 'A directory of website design systems, extracted as design.md.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
```

- [ ] **Step 9: Create minimal `site/app/page.tsx`**

```tsx
export default function HomePage() {
  return <main className="mx-auto max-w-container px-container-py py-8">design.md</main>
}
```

- [ ] **Step 10: Create `site/.gitignore`**

```
node_modules
.next
out
public/search-index.json
*.tsbuildinfo
```

- [ ] **Step 11: Install deps and verify dev server boots**

Run: `cd site && npm install && npm run dev`
Expected: dev server starts on http://localhost:3000, renders "design.md" text on pure-black background.

- [ ] **Step 12: Commit**

```bash
git add site/
git commit -m "feat(site): scaffold Next.js static-export app with Tailwind + Vitest"
```

---

## Task 2: Color extraction + validation module

**Files:**
- Create: `site/lib/colors.ts`
- Create: `site/lib/__tests__/colors.test.ts`

- [ ] **Step 1: Write failing tests for `site/lib/__tests__/colors.test.ts`**

```ts
import { describe, it, expect } from 'vitest'
import { extractColors, isValidColor, luminanceOf, sortByLuminance } from '../colors'

describe('isValidColor', () => {
  it('accepts 6-digit hex', () => {
    expect(isValidColor('#000000')).toBe(true)
    expect(isValidColor('#ededed')).toBe(true)
  })
  it('accepts 3-digit hex', () => {
    expect(isValidColor('#fff')).toBe(true)
  })
  it('accepts 8-digit hex (with alpha)', () => {
    expect(isValidColor('#1c1c1cff')).toBe(true)
  })
  it('accepts rgba/hsl', () => {
    expect(isValidColor('rgba(28, 28, 28, 0.8)')).toBe(true)
    expect(isValidColor('hsl(0, 0%, 50%)')).toBe(true)
  })
  it('rejects color-mix', () => {
    expect(isValidColor('color-mix(in oklab, #26251e 60%, transparent)')).toBe(false)
  })
  it('rejects token refs and empty', () => {
    expect(isValidColor('{colors.background}')).toBe(false)
    expect(isValidColor('')).toBe(false)
    expect(isValidColor('inherit')).toBe(false)
  })
})

describe('extractColors', () => {
  it('extracts leaf string values from nested colors object', () => {
    const colors = {
      background: '#000000',
      foreground: '#ededed',
      border: '#1c1c1c',
      nested: { a: '#fff', b: 'color-mix(in oklab, #000 50%, transparent)' },
    }
    expect(extractColors(colors)).toEqual(['#000000', '#ededed', '#1c1c1c', '#fff'])
  })
  it('dedupes', () => {
    const colors = { a: '#000000', b: '#000000' }
    expect(extractColors(colors)).toEqual(['#000000'])
  })
  it('returns empty for non-object', () => {
    expect(extractColors(null)).toEqual([])
    expect(extractColors('x')).toEqual([])
  })
})

describe('luminanceOf + sortByLuminance', () => {
  it('black is darker than white', () => {
    expect(luminanceOf('#000000')).toBeLessThan(luminanceOf('#ededed'))
  })
  it('sorts dark → light', () => {
    const sorted = sortByLuminance(['#ededed', '#000000', '#1c1c1c'])
    expect(sorted).toEqual(['#000000', '#1c1c1c', '#ededed'])
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd site && npx vitest run lib/__tests__/colors.test.ts`
Expected: FAIL — modules not found.

- [ ] **Step 3: Implement `site/lib/colors.ts`**

```ts
const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
const RGB_RE = /^rgba?\(/i
const HSL_RE = /^hsla?\(/i

export function isValidColor(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const v = value.trim()
  if (!v) return false
  if (v.startsWith('{')) return false
  if (v.startsWith('color-mix')) return false
  if (HEX_RE.test(v)) return true
  if (RGB_RE.test(v) || HSL_RE.test(v)) return true
  return false
}

export function extractColors(colors: unknown): string[] {
  if (!colors || typeof colors !== 'object') return []
  const out: string[] = []
  const seen = new Set<string>()
  const walk = (node: unknown) => {
    if (node && typeof node === 'object') {
      for (const v of Object.values(node as Record<string, unknown>)) walk(v)
    } else if (isValidColor(node)) {
      const lower = node.toLowerCase()
      if (!seen.has(lower)) {
        seen.add(lower)
        out.push(node)
      }
    }
  }
  walk(colors)
  return out
}

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (h.length === 8) h = h.slice(0, 6)
  const n = parseInt(h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function parseRgb(s: string): [number, number, number] {
  const m = s.match(/(\d+(\.\d+)?)/g)
  if (!m) return [0, 0, 0]
  return [Number(m[0]), Number(m[1]), Number(m[2])]
}

export function luminanceOf(color: string): number {
  let [r, g, b] = [0, 0, 0]
  if (color.startsWith('#')) [r, g, b] = hexToRgb(color)
  else [r, g, b] = parseRgb(color)
  const toLin = (c: number) => {
    const cs = c / 255
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b)
}

export function sortByLuminance(colors: string[]): string[] {
  return [...colors].sort((a, b) => luminanceOf(a) - luminanceOf(b))
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd site && npx vitest run lib/__tests__/colors.test.ts`
Expected: PASS (all tests green).

- [ ] **Step 5: Commit**

```bash
git add site/lib/colors.ts site/lib/__tests__/colors.test.ts
git commit -m "feat(site): add color extraction, validation, luminance sort"
```

---

## Task 3: GitHub raw URL builder

**Files:**
- Create: `site/lib/github-url.ts`
- Create: `site/lib/__tests__/github-url.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, it, expect } from 'vitest'
import { buildRawUrl } from '../github-url'

describe('buildRawUrl', () => {
  it('builds zh raw url', () => {
    expect(buildRawUrl('claude.com', 'zh')).toBe(
      'https://raw.githubusercontent.com/deantook/design-md/main/design/claude.com.design.zh.md'
    )
  })
  it('builds en raw url', () => {
    expect(buildRawUrl('cursor.com', 'en')).toBe(
      'https://raw.githubusercontent.com/deantook/design-md/main/design/cursor.com.design.en.md'
    )
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `cd site && npx vitest run lib/__tests__/github-url.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `site/lib/github-url.ts`**

```ts
import { config, type Lang } from '@/config'

export function buildRawUrl(domain: string, lang: Lang): string {
  return `https://raw.githubusercontent.com/${config.repoOwner}/${config.repoName}/${config.branch}/design/${domain}.design.${lang}.md`
}
```

- [ ] **Step 4: Run to verify pass**

Run: `cd site && npx vitest run lib/__tests__/github-url.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add site/lib/github-url.ts site/lib/__tests__/github-url.test.ts
git commit -m "feat(site): add GitHub raw URL builder"
```

---

## Task 4: Shared types

**Files:**
- Create: `site/lib/types.ts`

- [ ] **Step 1: Create `site/lib/types.ts`**

```ts
import type { Lang } from '@/config'

export interface DesignSide {
  name: string
  description: string
  tags: string[]
  colors: string[]          // validated, luminance-sorted hex/rgb values
  available: boolean        // false if file missing/invalid
}

export interface DesignRecord {
  domain: string
  zh: DesignSide
  en: DesignSide
  githubZh: string
  githubEn: string
}

export interface SearchEntry {
  domain: string
  name: string
  description: string
  tags: string[]
  colorCount: number
  palette: string[]         // first 8 swatches for leaderboard thumbnail
}

export type { Lang }
```

- [ ] **Step 2: Commit**

```bash
git add site/lib/types.ts
git commit -m "feat(site): add shared design record types"
```

---

## Task 5: Design parser (scan + frontmatter + pair zh/en)

**Files:**
- Create: `site/lib/parse-designs.ts`
- Create: `site/lib/__tests__/parse-designs.test.ts`
- Create: `site/lib/__tests__/fixtures/` (test design.md files)

- [ ] **Step 1: Create test fixtures**

Create `site/lib/__tests__/fixtures/example.com.design.zh.md`:
```markdown
---
version: alpha
tags:
  - 开发者
  - 深色主题
name: example-design-analysis
description: 一个示例站点的设计分析。
colors:
  background: "#000000"
  foreground: "#ededed"
  border: "#1c1c1c"
---
## 概览
示例正文。
```

Create `site/lib/__tests__/fixtures/example.com.design.en.md`:
```markdown
---
version: alpha
tags:
  - developer
  - dark theme
name: example-design-analysis
description: An example site design analysis.
colors:
  background: "#000000"
  foreground: "#ededed"
---
## Overview
Example body.
```

Create `site/lib/__tests__/fixtures/lonely.org.design.zh.md`:
```markdown
---
tags:
  - 浅色主题
name: lonely-design
description: 单语站点。
colors:
  canvas: "#f7f7f4"
---
正文。
```

Create `site/lib/__tests__/fixtures/badname.txt`:
```
not a design md
```

- [ ] **Step 2: Write failing tests**

```ts
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
```

- [ ] **Step 3: Run to verify failure**

Run: `cd site && npx vitest run lib/__tests__/parse-designs.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `site/lib/parse-designs.ts`**

```ts
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { config } from '@/config'
import { extractColors, sortByLuminance } from './colors'
import { buildRawUrl } from './github-url'
import type { DesignRecord, DesignSide } from './types'

const FILE_RE = /^(.+?)\.design\.(zh|en)\.md$/

const EMPTY_SIDE: DesignSide = {
  name: '', description: '', tags: [], colors: [], available: false,
}

export function parseDesigns(designDir: string): DesignRecord[] {
  const dir = path.resolve(designDir)
  if (!fs.existsSync(dir)) return []
  const byDomain = new Map<string, { zh?: DesignSide; en?: DesignSide }>()

  for (const file of fs.readdirSync(dir)) {
    const m = file.match(FILE_RE)
    if (!m) {
      console.warn(`WARN: skipped ${file} (invalid naming)`)
      continue
    }
    const [, domain, lang] = m
    const full = path.join(dir, file)
    let parsed
    try {
      parsed = matter(fs.readFileSync(full, 'utf8'))
    } catch (e) {
      console.warn(`WARN: skipped ${file} (invalid frontmatter)`, e)
      continue
    }
    const data = parsed.data || {}
    const colors = sortByLuminance(extractColors(data.colors))
    const side: DesignSide = {
      name: typeof data.name === 'string' ? data.name : '',
      description: typeof data.description === 'string' ? data.description : '',
      tags: Array.isArray(data.tags) ? data.tags.filter((t: unknown): t is string => typeof t === 'string') : [],
      colors,
      available: true,
    }
    const entry = byDomain.get(domain) || {}
    if (lang === 'zh' && entry.zh) console.warn(`WARN: duplicate zh for ${domain}`)
    if (lang === 'en' && entry.en) console.warn(`WARN: duplicate en for ${domain}`)
    entry[lang as 'zh' | 'en'] = side
    byDomain.set(domain, entry)
  }

  const records: DesignRecord[] = []
  for (const [domain, sides] of byDomain) {
    records.push({
      domain,
      zh: sides.zh || { ...EMPTY_SIDE },
      en: sides.en || { ...EMPTY_SIDE },
      githubZh: buildRawUrl(domain, 'zh'),
      githubEn: buildRawUrl(domain, 'en'),
    })
  }
  return records.sort((a, b) => a.domain.localeCompare(b.domain))
}

export function parseDesignsFromConfig(): DesignRecord[] {
  return parseDesigns(path.resolve(process.cwd(), config.designDir))
}
```

- [ ] **Step 5: Run to verify pass**

Run: `cd site && npx vitest run lib/__tests__/parse-designs.test.ts`
Expected: PASS (all tests green).

- [ ] **Step 6: Commit**

```bash
git add site/lib/parse-designs.ts site/lib/__tests__/parse-designs.test.ts site/lib/__tests__/fixtures/
git commit -m "feat(site): add design.md parser with zh/en pairing + color extraction"
```

---

## Task 6: Search index builder + client search

**Files:**
- Create: `site/lib/search-index.ts`
- Create: `site/lib/search.ts`
- Create: `site/lib/__tests__/search.test.ts`

- [ ] **Step 1: Write failing tests for search match function**

```ts
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
```

- [ ] **Step 2: Run to verify failure**

Run: `cd site && npx vitest run lib/__tests__/search.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `site/lib/search.ts`**

```ts
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
  // path fragment: query contains domain
  if (q.startsWith(domain + '/')) return 80
  if (domain.includes(q)) return 50
  if (entry.name.toLowerCase().includes(q)) return 40
  if (entry.description.toLowerCase().includes(q)) return 20
  if (entry.tags.some((t) => t.toLowerCase() === q)) return 10
  if (entry.tags.some((t) => t.toLowerCase().includes(q))) return 5
  return 0
}
```

- [ ] **Step 4: Implement `site/lib/search-index.ts`**

```ts
import type { DesignRecord, SearchEntry } from './types'

export function buildSearchIndex(records: DesignRecord[]): SearchEntry[] {
  return records.map((r) => {
    const side = r.zh.available ? r.zh : r.en
    return {
      domain: r.domain,
      name: side.name,
      description: side.description,
      tags: side.tags,
      colorCount: side.colors.length,
      palette: side.colors.slice(0, 8),
    }
  })
}

export function serializeSearchIndex(records: DesignRecord[]): string {
  return JSON.stringify(buildSearchIndex(records))
}
```

- [ ] **Step 5: Run tests to verify pass**

Run: `cd site && npx vitest run lib/__tests__/search.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add site/lib/search.ts site/lib/search-index.ts site/lib/__tests__/search.test.ts
git commit -m "feat(site): add client-side search match + search index builder"
```

---

## Task 7: Build script to emit search-index.json

**Files:**
- Create: `site/scripts/build-index.ts`
- Modify: `site/package.json` (add `build:index` script)

- [ ] **Step 1: Create `site/scripts/build-index.ts`**

```ts
import fs from 'node:fs'
import path from 'node:path'
import { parseDesignsFromConfig } from '../lib/parse-designs'
import { serializeSearchIndex } from '../lib/search-index'

const outDir = path.resolve(process.cwd(), 'public')
fs.mkdirSync(outDir, { recursive: true })
const records = parseDesignsFromConfig()
fs.writeFileSync(path.join(outDir, 'search-index.json'), serializeSearchIndex(records))
console.log(`Wrote search-index.json with ${records.length} entries`)
```

- [ ] **Step 2: Add scripts to `site/package.json`**

Update the `"scripts"` block to include:
```json
"build:index": "tsx scripts/build-index.ts",
"prebuild": "npm run build:index"
```

Add devDep:
```json
"tsx": "^4.19.0"
```

- [ ] **Step 3: Run build:index and verify output**

Run: `cd site && npm install && npm run build:index`
Expected: `public/search-index.json` written, console prints `Wrote search-index.json with 4 entries` (claude.com, cursor.com, skills.sh + any others).

Verify file contents look like valid JSON array with `domain`/`name`/`tags`/`colorCount`/`palette` fields.

- [ ] **Step 4: Commit**

```bash
git add site/scripts/build-index.ts site/package.json
git commit -m "feat(site): add build script to emit search-index.json"
```

---

## Task 8: Language context + switcher

**Files:**
- Create: `site/components/lang-context.tsx`
- Create: `site/components/lang-switcher.tsx`

- [ ] **Step 1: Create `site/components/lang-context.tsx`**

```tsx
'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang } from '@/config'

interface LangCtx { lang: Lang; setLang: (l: Lang) => void }
const Ctx = createContext<LangCtx>({ lang: 'zh', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh')

  useEffect(() => {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('lang') : null
    if (stored === 'zh' || stored === 'en') {
      setLangState(stored)
      return
    }
    const al = typeof navigator !== 'undefined' ? navigator.language : 'zh'
    setLangState(al.toLowerCase().startsWith('en') ? 'en' : 'zh')
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch {}
  }

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>
}

export function useLang() {
  return useContext(Ctx)
}
```

- [ ] **Step 2: Create `site/components/lang-switcher.tsx`**

```tsx
'use client'
import { useLang } from './lang-context'
import type { Lang } from '@/config'

export function LangSwitcher() {
  const { lang, setLang } = useLang()
  const item = (l: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      className={`font-mono text-sm uppercase ${lang === l ? 'text-foreground' : 'text-nav-link hover:text-foreground'}`}
    >
      {label}
    </button>
  )
  return (
    <div className="flex items-center gap-2">
      {item('zh', '中文')}
      <span className="text-muted-soft">/</span>
      {item('en', 'EN')}
    </div>
  )
}
```

- [ ] **Step 3: Wrap layout in LangProvider**

Modify `site/app/layout.tsx` body to wrap children:
```tsx
import { LangProvider } from '@/components/lang-context'
// ...
<body className="bg-background text-foreground">
  <LangProvider>{children}</LangProvider>
</body>
```

- [ ] **Step 4: Run dev server and verify switcher toggles**

Run: `cd site && npm run dev`
Expected: page loads without errors. (Switcher has no visible effect yet until detail/home use lang context — verify no console errors.)

- [ ] **Step 5: Commit**

```bash
git add site/components/lang-context.tsx site/components/lang-switcher.tsx site/app/layout.tsx
git commit -m "feat(site): add language context + switcher with localStorage"
```

---

## Task 9: TopNav + Footer

**Files:**
- Create: `site/components/top-nav.tsx`
- Create: `site/components/footer.tsx`

- [ ] **Step 1: Create `site/components/top-nav.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `site/components/footer.tsx`**

```tsx
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
```

- [ ] **Step 3: Add TopNav + Footer to layout**

Modify `site/app/layout.tsx`:
```tsx
import { TopNav } from '@/components/top-nav'
import { Footer } from '@/components/footer'
// inside LangProvider:
<LangProvider>
  <TopNav />
  <div className="min-h-[calc(100vh-56px)]">{children}</div>
  <Footer />
</LangProvider>
```

- [ ] **Step 4: Run dev + verify**

Run: `cd site && npm run dev`
Expected: sticky black nav with wordmark + links + lang switcher; footer with 5 columns at bottom; no errors.

- [ ] **Step 5: Commit**

```bash
git add site/components/top-nav.tsx site/components/footer.tsx site/app/layout.tsx
git commit -m "feat(site): add top nav + 5-column footer"
```

---

## Task 10: ASCII wordmark + Home page (hero + leaderboard + tabs + search)

**Files:**
- Create: `site/components/ascii-wordmark.tsx`
- Create: `site/components/search-input.tsx`
- Create: `site/components/leaderboard.tsx`
- Create: `site/components/leaderboard-row.tsx`
- Create: `site/app/page.tsx` (rewrite)
- Create: `site/lib/get-records.ts` (server-side helper)

- [ ] **Step 1: Create `site/lib/get-records.ts`** (server-only data accessor)

```ts
import { parseDesignsFromConfig } from './parse-designs'
import type { DesignRecord } from './types'

export function getRecords(): DesignRecord[] {
  return parseDesignsFromConfig()
}
```

- [ ] **Step 2: Create `site/components/ascii-wordmark.tsx`**

The ASCII art spells `DESIGN.MD` in figlet block style. Use a preformatted string with `-1px` letter spacing.

```tsx
export function AsciiWordmark() {
  // figlet-style block letters for "DESIGN.MD" — kept compact for hero
  const art = [
    '███████╗██╗  ██╗██████╗  ██████╗ ██╗    ██╗ ██████╗ ███╗   ███╗██╗  ██╗',
    '██╔════╝██║  ██║██╔══██╗██╔═══██╗██║    ██║██╔═══██╗████╗ ████║██║ ██╔╝',
    '██║     ███████║██████╔╝██║   ██║██║ █╗ ██║██║   ██║██╔████╔██║█████╔╝ ',
    '██║     ██╔══██║██╔══██╗██║   ██║██║███╗██║██║   ██║██║╚██╔╝██║██╔═██╗ ',
    '╚██████╗██║  ██║██║  ██║╚██████╔╝╚███╔███╔╝╚██████╔╝██║ ╚═╝ ██║██║  ██╗',
    ' ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝  ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝',
  ].join('\n')
  return (
    <pre className="font-ascii text-[10px] leading-none text-foreground sm:text-xs md:text-sm" style={{ letterSpacing: '-1px' }} aria-label="DESIGN.MD">
      {art}
    </pre>
  )
}
```

- [ ] **Step 3: Create `site/components/search-input.tsx`**

```tsx
'use client'
import { useEffect, useRef } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
  onEnter: () => void
  onArrowDown: () => void
  onArrowUp: () => void
}

export function SearchInput({ value, onChange, onEnter, onArrowDown, onArrowUp }: Props) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== ref.current) {
        const tag = (document.activeElement as HTMLElement)?.tagName
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault()
          ref.current?.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="relative flex items-center">
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnter()
          else if (e.key === 'ArrowDown') { e.preventDefault(); onArrowDown() }
          else if (e.key === 'ArrowUp') { e.preventDefault(); onArrowUp() }
          else if (e.key === 'Escape') { onChange(''); ref.current?.blur() }
        }}
        placeholder="search by url or tag…"
        className="h-search-h w-full bg-transparent px-8 font-mono text-sm text-foreground placeholder:text-muted-soft focus:outline-none"
      />
      <span className="absolute right-0 font-mono text-xs text-muted-soft">/</span>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </div>
  )
}
```

- [ ] **Step 4: Create `site/components/leaderboard-row.tsx`**

```tsx
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
```

- [ ] **Step 5: Create `site/components/leaderboard.tsx`** (client: handles search state + tabs + keyboard nav)

```tsx
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
```

- [ ] **Step 6: Rewrite `site/app/page.tsx`**

```tsx
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
```

- [ ] **Step 7: Run dev + verify home renders**

Run: `cd site && npm run dev`
Expected: ASCII art hero + description + search box + tab bar + leaderboard rows for all 4 sites. Search filtering live. Tab filtering live. `/` focuses search.

- [ ] **Step 8: Run full test suite**

Run: `cd site && npm test`
Expected: all unit tests still pass.

- [ ] **Step 9: Commit**

```bash
git add site/components/ascii-wordmark.tsx site/components/search-input.tsx site/components/leaderboard.tsx site/components/leaderboard-row.tsx site/lib/get-records.ts site/app/page.tsx
git commit -m "feat(site): add home page with ASCII hero, search, leaderboard, tabs"
```

---

## Task 11: Copy button + Palette grid

**Files:**
- Create: `site/components/copy-button.tsx`
- Create: `site/components/palette-grid.tsx`

- [ ] **Step 1: Create `site/components/copy-button.tsx`**

```tsx
'use client'
import { useState } from 'react'

interface Props { text: string; label?: string }

export function CopyButton({ text, label = 'Copy' }: Props) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      aria-label={label}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {}
      }}
      className="h-7 w-7 rounded-sm text-muted-fg hover:text-foreground"
    >
      {copied ? '✓' : '⧉'}
    </button>
  )
}
```

- [ ] **Step 2: Create `site/components/palette-grid.tsx`**

```tsx
interface Props { colors: string[] }

export function PaletteGrid({ colors }: Props) {
  if (colors.length === 0) {
    return <p className="font-mono text-sm text-muted-fg">No palette data.</p>
  }
  const shown = colors.slice(0, 24)
  const overflow = colors.length - shown.length
  return (
    <div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 md:grid-cols-12">
        {shown.map((c) => (
          <div key={c} className="flex flex-col items-center gap-1">
            <span className="h-12 w-12" style={{ backgroundColor: c }} aria-label={c} />
            <span className="font-mono text-xs text-muted-fg">{c}</span>
          </div>
        ))}
      </div>
      {overflow > 0 && (
        <p className="mt-3 font-mono text-xs text-muted-fg">+{overflow} more in design.md</p>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add site/components/copy-button.tsx site/components/palette-grid.tsx
git commit -m "feat(site): add copy button + palette grid"
```

---

## Task 12: Detail page (`/[domain]`)

**Files:**
- Create: `site/app/[domain]/page.tsx`

- [ ] **Step 1: Create `site/app/[domain]/page.tsx`**

```tsx
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
  const github = lang === 'zh' ? record.githubZh : record.githubEn
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
```

- [ ] **Step 2: Create `site/components/lang-switcher-content.tsx`** (client bridge: picks side by lang context)

```tsx
'use client'
import { useLang } from './lang-context'
import type { ReactNode } from 'react'

interface Props { zh: ReactNode; en: ReactNode }

export function LangSwitcherContent({ zh, en }: Props) {
  const { lang } = useLang()
  return <>{lang === 'zh' ? zh : en}</>
}
```

- [ ] **Step 3: Run dev + verify detail pages**

Run: `cd site && npm run dev`
Visit: `http://localhost:3000/claude.com`, `/cursor.com`, `/skills.sh`
Expected: eyebrow `SITE / <domain>`, domain title, description, tags, palette grid, two download rows with copy buttons. Lang switcher toggles zh/en content live. Missing side shows the "No X version" message.

- [ ] **Step 4: Verify 404 for unknown domain**

Visit: `http://localhost:3000/nonexistent.com`
Expected: 404 (custom not-found added in Task 13).

- [ ] **Step 5: Commit**

```bash
git add site/app/[domain]/page.tsx site/components/lang-switcher-content.tsx
git commit -m "feat(site): add detail page with metadata card + bilingual downloads"
```

---

## Task 13: About page + custom 404

**Files:**
- Create: `site/app/about/page.tsx`
- Create: `site/app/not-found.tsx`

- [ ] **Step 1: Create `site/app/about/page.tsx`**

```tsx
import { config } from '@/config'

export default function AboutPage() {
  const repoUrl = `https://github.com/${config.repoOwner}/${config.repoName}`
  return (
    <main className="mx-auto max-w-container px-container-py py-8">
      <span className="font-mono text-sm font-medium uppercase text-foreground">About</span>
      <h1 className="mt-4 font-sans text-2xl font-semibold text-foreground">design.md directory</h1>
      <p className="mt-4 max-w-[640px] font-sans text-base leading-6 text-muted-fg">
        A community-curated directory of website design system documents. Each entry is a
        <span className="font-mono text-sm"> design.md </span> file extracted from a real website,
        capturing its color tokens, typography, spacing, and component spec.
      </p>
      <section className="mt-10">
        <span className="font-mono text-sm font-medium uppercase text-foreground">Contribute</span>
        <p className="mt-4 max-w-[640px] font-sans text-base leading-6 text-muted-fg">
          Add a file named <span className="font-mono text-sm">{'<domain>.design.zh.md'}</span> and
          <span className="font-mono text-sm"> {'<domain>.design.en.md'}</span> to the
          <span className="font-mono text-sm"> design/ </span> directory, then open a pull request on
          <a href={repoUrl} target="_blank" rel="noreferrer" className="text-foreground hover:underline"> GitHub</a>.
          Files must follow the existing frontmatter schema (tags, name, description, colors).
        </p>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Create `site/app/not-found.tsx`**

```tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-container flex-col items-center justify-center px-container-py text-center">
      <p className="font-mono text-sm uppercase text-muted-fg">404 / Site not in directory</p>
      <Link href="/" className="mt-4 font-mono text-sm text-foreground hover:underline">← Back to directory</Link>
    </main>
  )
}
```

- [ ] **Step 3: Run dev + verify**

Run: `cd site && npm run dev`
Visit: `/about` and `/nonexistent.com`
Expected: about page renders with project description + contribute section; unknown domain shows 404 page with mono text + back link.

- [ ] **Step 4: Commit**

```bash
git add site/app/about/page.tsx site/app/not-found.tsx
git commit -m "feat(site): add about page + custom 404"
```

---

## Task 14: Static export build verification

**Files:**
- None (verification task)

- [ ] **Step 1: Run production build**

Run: `cd site && npm run build`
Expected: `prebuild` writes `public/search-index.json`, then `next build` with `output: 'export'` produces `site/out/` containing:
- `index.html`
- `claude.com/index.html` (and each domain)
- `about/index.html`
- `404.html`
- `search-index.json`

- [ ] **Step 2: Serve export and smoke test**

Run: `cd site && npx serve out`
Visit: `http://localhost:3000`, `/claude.com`, `/about`, search filtering, tab switching, lang toggle.
Expected: all pages render correctly with no console errors; search works offline (loads local `search-index.json`).

- [ ] **Step 3: Fix any export issues**

Common fixes: dynamic params not pre-rendered → ensure `generateStaticParams` returns all domains; image config → already `unoptimized: true`; trailing client components missing `'use client'`.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A site/
git commit -m "fix(site): resolve static export issues"
```

(Skip if no fixes needed.)

---

## Task 15: CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Create `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: site
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: site/package-lock.json
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

- [ ] **Step 2: Verify locally that lint+test+build all pass**

Run: `cd site && npm run lint && npm test && npm run build`
Expected: all green.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add lint+test+build workflow for site"
```

---

## Task 16: README for the site

**Files:**
- Create: `site/README.md`

- [ ] **Step 1: Create `site/README.md`**

```markdown
# design.md directory site

Static Next.js site that lets users search website design.md files by URL and view metadata cards (description, tags, color palette) with bilingual GitHub raw download links.

## Develop

\`\`\`bash
cd site
npm install
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build      # writes public/search-index.json then static export to out/
npx serve out
\`\`\`

## Data source

Design files live in \`../design/*.design.{zh,en}.md\`. Add new sites via PR; see \`/about\`.

## Stack

Next.js 15 (static export) · TypeScript · Tailwind CSS v4 · Geist fonts · Vitest.
```

- [ ] **Step 2: Commit**

```bash
git add site/README.md
git commit -m "docs(site): add README"
```

---

## Self-Review

**Spec coverage check:**
- §1 IA/routes → Tasks 10 (home), 12 (detail), 13 (about + 404) ✓
- §2 data model + build → Tasks 4, 5, 7 ✓
- §3 search → Task 6 (match), Task 10 (search-input + keyboard) ✓
- §4 detail page layout → Task 12 ✓
- §5 visual system → Task 1 (tailwind tokens), Task 10 (ascii + leaderboard + tabs + eyebrows) ✓
- §6 bilingual + downloads → Task 8 (lang context), Task 12 (download rows + missing side), Task 3 (raw urls) ✓
- §7 tech stack + structure → Task 1 (scaffold), all file paths match §7 structure ✓
- §8 edge cases → Task 5 (parser warnings, missing side), Task 11 (palette edge), Task 13 (404), Task 10 (empty search) ✓

**Placeholder scan:** No TBD/TODO; all code blocks contain real implementation. ✓

**Type consistency:** `DesignRecord`/`DesignSide`/`SearchEntry`/`Lang` defined in Task 4, used consistently in Tasks 5/6/10/12. `buildRawUrl(domain, lang)` signature matches usage in Task 5. `matchEntries(entries, query)` matches Task 10 usage. ✓

**One gap fixed:** Task 12 references `LangSwitcherContent` — added its creation as Step 2 in Task 12.
