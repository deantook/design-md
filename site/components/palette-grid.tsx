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
