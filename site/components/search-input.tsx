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
