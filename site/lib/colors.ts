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

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

function parseColor(s: string): [number, number, number] {
  if (s.startsWith('hsl')) {
    const m = s.match(/(\d+(\.\d+)?)/g)
    if (!m) return [0, 0, 0]
    return hslToRgb(Number(m[0]), Number(m[1]), Number(m[2]))
  }
  const m = s.match(/(\d+(\.\d+)?)/g)
  if (!m) return [0, 0, 0]
  return [Number(m[0]), Number(m[1]), Number(m[2])]
}

export function luminanceOf(color: string): number {
  let [r, g, b] = [0, 0, 0]
  if (color.startsWith('#')) [r, g, b] = hexToRgb(color)
  else [r, g, b] = parseColor(color)
  const toLin = (c: number) => {
    const cs = c / 255
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b)
}

export function sortByLuminance(colors: string[]): string[] {
  return [...colors].sort((a, b) => luminanceOf(a) - luminanceOf(b))
}
