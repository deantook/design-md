# design.md directory site

Static Next.js site that lets users search website design.md files by URL and view metadata cards (description, tags, color palette) with bilingual GitHub raw download links.

## Develop

```bash
cd site
npm install
npm run dev
```

## Build

```bash
npm run build      # writes public/search-index.json then static export to out/
npx serve out
```

## Data source

Design files live in `../design/*.design.{zh,en}.md`. Add new sites via PR; see `/about`.

## Stack

Next.js 15 (static export) · TypeScript · Tailwind CSS v4 · Geist fonts · Vitest.
