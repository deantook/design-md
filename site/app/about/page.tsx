import { config } from '@/config'

export default function AboutPage() {
  const repoUrl = `https://github.com/${config.repoOwner}/${config.repoName}`
  return (
    <main className="mx-auto max-w-container px-container-py py-8">
      <span className="font-mono text-sm font-medium uppercase text-foreground">About</span>
      <h1 className="mt-4 font-sans text-2xl font-semibold text-foreground">design.md directory</h1>
      <p className="mt-4 max-w-[640px] font-sans text-base leading-6 text-muted-fg">
        A community-curated directory of website design system documents. Each entry is a
        <span className="font-mono text-sm"> design.md </span> file extracted from a real website,
        capturing its color tokens, typography, spacing, and component spec.
      </p>
      <section className="mt-10">
        <span className="font-mono text-sm font-medium uppercase text-foreground">Contribute</span>
        <p className="mt-4 max-w-[640px] font-sans text-base leading-6 text-muted-fg">
          Add a file named <span className="font-mono text-sm">{'<domain>.design.zh.md'}</span> and
          <span className="font-mono text-sm"> {'<domain>.design.en.md'}</span> to the
          <span className="font-mono text-sm"> design/ </span> directory, then open a pull request on
          <a href={repoUrl} target="_blank" rel="noreferrer" className="text-foreground hover:underline"> GitHub</a>.
          Files must follow the existing frontmatter schema (tags, name, description, colors).
        </p>
      </section>
    </main>
  )
}
