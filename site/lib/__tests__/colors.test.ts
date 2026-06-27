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
