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
