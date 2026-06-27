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
