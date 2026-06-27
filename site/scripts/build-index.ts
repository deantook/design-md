import fs from 'node:fs'
import path from 'node:path'
import { parseDesignsFromConfig } from '../lib/parse-designs'
import { serializeSearchIndex } from '../lib/search-index'

const outDir = path.resolve(process.cwd(), 'public')
fs.mkdirSync(outDir, { recursive: true })
const records = parseDesignsFromConfig()
fs.writeFileSync(path.join(outDir, 'search-index.json'), serializeSearchIndex(records))
console.log(`Wrote search-index.json with ${records.length} entries`)
