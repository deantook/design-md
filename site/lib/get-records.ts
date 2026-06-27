import { parseDesignsFromConfig } from './parse-designs'
import type { DesignRecord } from './types'

export function getRecords(): DesignRecord[] {
  return parseDesignsFromConfig()
}
