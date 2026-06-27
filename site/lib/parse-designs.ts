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
