import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-container flex-col items-center justify-center px-container-px text-center">
      <p className="font-mono text-sm uppercase text-muted-fg">404 / Site not in directory</p>
      <Link href="/" className="mt-4 font-mono text-sm text-foreground hover:underline">← Back to directory</Link>
    </main>
  )
}
