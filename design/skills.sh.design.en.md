---
version: alpha
name: skills-sh-design-analysis
description: An "open agent skills directory" landing page built by Vercel. The system anchors on a pure black canvas (#000000) — fully dark, no light theme toggle. The palette is strictly achromatic: white-ish foreground, dark-gray border, mid-gray secondary text. Zero brand color, zero accent color, zero gradient. The typographic voice is carried by three typefaces working together: Geist handles all body, headings, and navigation in a humanist sans voice; Geist Mono carries every eyebrow, terminal command, search input, tab, and footer column heading in a monospaced voice; Fira Mono is used exclusively for the central ASCII art wordmark "SKILLS" — a figlet-style block character banner that serves as the page's only "image" hero. All eyebrows are mono / uppercase / 14px, manufacturing a "terminal / CLI / developer tool" voice. The visual main act is the leaderboard table: rank, skill name, 8-week activity sparkline, install count — purely data-driven, zero marketing illustration. Partner agent logos are rendered in grayscale by default and recover their brand color on hover.

colors:
  background: "#000000"
  foreground: "#ededed"
  border: "#1c1c1c"
  border-soft: "#1c1c1c"
  muted: "#1c1c1c"
  foreground-strong: "#ededed"
  nav-link: "#a1a1aa"
  muted-foreground: "#8a8a8a"
  muted-foreground-soft: "#787878"
  code-block-bg: "#1c1c1c"
  code-block-bg-alpha: "rgba(28, 28, 28, 0.8)"
  on-dark: "#ededed"
  accent: "#ededed"
  success: "#ededed"
  error: "#ededed"
  warning: "#ededed"

typography:
  display-ascii:
    fontFamily: '"Fira Mono", "Fira Mono Fallback", ui-monospace, monospace'
    fontSize: "auto (fluid)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -1px
  eyebrow-md:
    fontFamily: '"Geist Mono", "Geist Mono Fallback", ui-monospace, monospace'
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0
    textTransform: uppercase
  eyebrow-sm:
    fontFamily: '"Geist Mono", "Geist Mono Fallback", ui-monospace, monospace'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0
    textTransform: uppercase
  body-md:
    fontFamily: 'Geist, "Geist Fallback", system-ui, sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0
  body-sm:
    fontFamily: 'Geist, "Geist Fallback", system-ui, sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0
  body-xs:
    fontFamily: 'Geist, "Geist Fallback", system-ui, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0
  skill-name:
    fontFamily: 'Geist, "Geist Fallback", system-ui, sans-serif'
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0
  nav-link:
    fontFamily: 'Geist, "Geist Fallback", system-ui, sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0
  mono-md:
    fontFamily: '"Geist Mono", "Geist Mono Fallback", ui-monospace, monospace'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0
  code:
    fontFamily: '"Geist Mono", "Geist Mono Fallback", ui-monospace, SFMono-Regular, Menlo, monospace'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0

rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  pill: 9999px

spacing:
  g1: 4px
  g2: 8px
  g3: 12px
  g4: 16px
  g5: 20px
  g6: 24px
  g8: 32px
  g10: 40px
  g12: 48px
  g14: 56px
  header-height: 56px
  row-height: 45px
  search-height: 45px
  container-max: 1152px
  container-px: 32px
  section-py: 32px
  footer-py: 48px

components:
  top-nav:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.nav-link}"
    height: 56px
    position: sticky
  ascii-wordmark:
    fontFamily: "{typography.display-ascii.fontFamily}"
    textColor: "{colors.foreground}"
    letterSpacing: -1px
  eyebrow-md:
    fontFamily: "{typography.eyebrow-md.fontFamily}"
    textColor: "{colors.foreground}"
    fontSize: 14px
    fontWeight: 500
    textTransform: uppercase
  terminal-code-block:
    backgroundColor: "{colors.code-block-bg-alpha}"
    textColor: "{colors.foreground}"
    fontFamily: "{typography.mono-md.fontFamily}"
    fontSize: 14px
    rounded: "{rounded.md}"
    padding: 12px 16px
    maxWidth: 348px
  copy-button:
    backgroundColor: transparent
    textColor: "{colors.muted-foreground}"
    rounded: "{rounded.sm}"
    padding: 6px
    height: 28px
  search-input:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    placeholderColor: "{colors.muted-foreground-soft}"
    fontFamily: "{typography.mono-md.fontFamily}"
    fontSize: 14px
    height: 45px
    padding: 12px 32px
    borderBottom: 1px solid {colors.border}
  leaderboard-row:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    display: grid
    gridTemplateColumns: "repeat(16, minmax(0, 1fr))"
    gap: 16px
    padding: 12px 0
    height: 45px
    borderBottom: 1px solid {colors.border}
  tab-active:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    fontFamily: "{typography.mono-md.fontFamily}"
    fontSize: 14px
    borderBottom: 2px solid {colors.foreground}
    paddingBottom: 4px
  tab-inactive:
    backgroundColor: transparent
    textColor: "{colors.nav-link}"
    fontFamily: "{typography.mono-md.fontFamily}"
    fontSize: 14px
    borderBottom: 2px solid transparent
    paddingBottom: 4px
  agent-logo-tile:
    backgroundColor: transparent
    filter: grayscale(100%)
    hover-filter: grayscale(0%)
    transition: 300ms
  sparkline:
    stroke: "{colors.muted-foreground}"
    width: 18px
    height: 18px (per bar, scales to row)
  footer:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    borderTop: 1px solid {colors.border}
    padding: 48px 32px
    maxWidth: 1152px
  footer-heading:
    fontFamily: "{typography.eyebrow-sm.fontFamily}"
    fontSize: 12px
    fontWeight: 400
    textTransform: uppercase
    textColor: "{colors.foreground}"
  footer-link:
    fontFamily: "{typography.body-sm.fontFamily}"
    fontSize: 14px
    fontWeight: 400
    textColor: "{colors.muted-foreground}"
    hover-textColor: "{colors.foreground}"
---

## Overview

skills.sh is Vercel's "open agent skills directory" — a restrained, fully black, zero-marketing-color developer catalog. The base atmosphere is a **pure black canvas** (`{colors.background}` — #000000), not a dark gray, not zinc-950, not a blue-tinted dark slate — pure black. All content floats on #000, with the foreground rendered in near-white (`{colors.foreground}` — #ededed) and borders / secondary dividers using Vercel gray-900 dark gray (`{colors.border}` — #1c1c1c). The page has **no brand color, no accent color, no gradient** — brand voltage is deliberately zeroed, surrendering all visual attention to the data itself (skill names, install counts, sparklines).

The typographic voice is carried by **three typefaces working together**: **Geist** carries all body text, skill names, and navigation in a humanist sans voice; **Geist Mono** carries every eyebrow ("TRY IT NOW" / "AVAILABLE FOR THESE AGENTS" / "SKILLS LEADERBOARD"), the terminal command, the search input, tabs, and footer column headings in a monospaced voice; **Fira Mono** is used **exclusively** for the central ASCII art wordmark "SKILLS" — a figlet-style block character banner with -1px negative letter-spacing, serving as the page's only "image" hero. All eyebrows are mono / uppercase / 14px / weight 500, manufacturing a "terminal / CLI / developer tool" voice — this is skills.sh's defining contrast against Claude (serif display + literary voice) and Cursor (single humanist sans + engineering voice): it wants the **hacker / command-line voice**.

The page has **no 64px display headline, no marketing illustration, no product mockup** — the visual main act is the leaderboard table: rank, skill name (Geist 600), 8-week install activity sparkline, total install count. All 18 partner agent logos (Claude Code / Cursor / Codex / Copilot / Windsurf / Gemini, etc.) are rendered in grayscale by default and recover their brand color on hover — this is the only "color breathing" the page permits, and only on hover. The page is a closed loop of **pure data + pure typography + pure grayscale**, with no bitmap illustration and no colored CTA.

**Key Characteristics:**
- Pure black canvas (`{colors.background}` — #000000) with near-white foreground (`{colors.foreground}` — #ededed). **Fully dark, no light theme toggle** — a stark contrast to Cursor and Claude, both light-by-default.
- Strictly achromatic palette. Zero brand color, zero accent color, zero gradient. Every "gray" comes from the Vercel Geist gray system, on a luminance gradient from #000 → #1c1c1c → #787878 → #a1a1aa → #ededed.
- Three-typeface system: Geist (sans), Geist Mono (mono / eyebrow / code), Fira Mono (ASCII art only). **No serif display, no bold giant hero headline.**
- The hero visual is ASCII art "SKILLS" — pure text block characters with -1px letter-spacing. **The only place Fira Mono is used on the entire page.**
- Hero terminal command block: `$ npx skills add <owner/repo>`, Geist Mono, semi-transparent dark-gray background (`{colors.code-block-bg-alpha}` — rgba(28,28,28,0.8)), 6px radius, max-width 348px, with a copy button.
- All eyebrows use Geist Mono uppercase 14px / 500 — "TRY IT NOW", "AVAILABLE FOR THESE AGENTS", "SKILLS LEADERBOARD", and the footer's "BROWSE" / "TOPICS" / "AGENTS" / "DOCS" / "PROJECT".
- The leaderboard table is the page's main visual: 16-column grid (grid-cols-16), 45px row height, 12px 0 padding, 1px bottom border. Columns include #, SKILL, 8W ACTIVITY (sparkline), INSTALLS (with a hexagonal icon).
- Partner agent logos are grayscale by default, recovering brand color on hover via `grayscale-0` — **color appears only as a hover reward.**
- Container max-width 1152px (max-w-6xl), horizontal padding 32px (px-8). Top navigation 56px high (h-14), sticky, no border-bottom.
- Tabs use `border-b-2` underline instead of filled pills — active is a foreground-colored underline, inactive is a transparent underline with mid-gray text.
- Footer is the same pure black, separated only by a 1px top border, with a 5-column link grid whose column headings use Geist Mono 12px uppercase.

## Colors

### Brand & Accent
skills.sh **has no brand color and no accent color** — its most counter-intuitive design choice. In a category where AI product pages typically use purple / orange / green CTAs, skills.sh compresses the entire palette to pure grayscale. Every "emphasis" is created by **weight** (skill-name 600) and **font-family switching** (eyebrow → Geist Mono uppercase), never by color.

- **Background** (`{colors.background}` — #000000): pure black canvas. Not #0a0a0a, not #111, not a blue-tinted dark slate — pure #000. This is Vercel Geist dark theme's gray-1000.
- **Foreground** (`{colors.foreground}` — #ededed): near-white primary text. All headings, skill names, body copy, default links. Vercel Geist gray-100.
- **Accent** (`{colors.accent}` — #ededed): identical to foreground — **there is no separate accent token.** "Emphasis" means switching to full-brightness foreground.
- **No primary / secondary CTA color.** The page contains no colored CTA button.

### Surface
- **Background** (`{colors.background}` — #000000): the only surface. Every section, header, main, and footer shares this color — there is no elevated surface tier, no card background.
- **Code block bg** (`{colors.code-block-bg-alpha}` — rgba(28,28,28,0.8)): the semi-transparent dark-gray background of the terminal command block — the page's only "non-pure-black" surface, and it only appears inside the hero command block.
- **The page has no dark-band alternation rhythm** — every section background is pure black, and rhythm is created entirely by vertical padding and 1px borders.

### Border / Hairline
The border system comes from Vercel Geist gray-900. The page has **exactly one border color**:
- **Border** (`{colors.border}` — #1c1c1c): every 1px divider — leaderboard row bottoms, footer top, search input bottom, tab underline (active switches to foreground). No second hairline tier.

### Text
- **Foreground** (`{colors.foreground}` — #ededed): all primary text, skill names, active tab, active links.
- **Nav link** (`{colors.nav-link}` — #a1a1aa): top navigation menu items in their default state. Mid-gray, lifting to foreground on hover.
- **Muted foreground** (`{colors.muted-foreground}` — #8a8a8a): skill repository paths, default footer column links.
- **Muted foreground soft** (`{colors.muted-foreground-soft}` — #787878): search placeholder and the most de-emphasized helper text.

### Semantic Colors
- **No separate success / error / warning colors.** The page is fully achromatic — state is communicated by text content ("available", "deprecated") and the mono font itself, not by color. The semantic color tokens in this system all map to foreground.

## Typography

### Typeface Families
The system uses **three typefaces** with a strict division of labor:

- **Geist** (humanist sans, weight 400–600) → all body text, skill names, navigation, default links. The voice's main body.
- **Geist Mono** (monospaced, weight 400–500) → every eyebrow ("TRY IT NOW", etc.), the terminal command, the search input, tabs, footer column headings, leaderboard column headers. Manufactures the "CLI / terminal" voice.
- **Fira Mono** (monospaced) → **only** the central hero ASCII art wordmark "SKILLS". letter-spacing -1px. This is the only place Fira Mono appears on the entire page, deliberately distinguished from Geist Mono's "tool" feel to evoke an "early Unix / figlet banner" retro-hacker vibe.
- fallbacks: `Geist Fallback`, `Geist Mono Fallback`, `Fira Mono Fallback`, `system-ui`, `ui-monospace`, `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`, `monospace`.

No serif display, no bold giant hero headline — skills.sh's hero is ASCII art plus mono eyebrow, **with no 64px / 48px / 36px serif headline tier at all.** This is its shared rejection of both Claude (Copernicus serif) and Cursor (CursorGothic sans at 26px).

### Hierarchy

| Token | Size | Weight | Line height | Tracking | Usage |
|---|---|---|---|---|---|
| `{typography.display-ascii}` | fluid | 400 | 1 | -1px | Hero ASCII "SKILLS" — Fira Mono |
| `{typography.eyebrow-md}` | 14px | 500 | 20px | 0 | Hero / section eyebrows (uppercase) — Geist Mono |
| `{typography.eyebrow-sm}` | 12px | 400 | 16px | 0 | Footer column headings (uppercase) — Geist Mono |
| `{typography.skill-name}` | 16px | 600 | 24px | 0 | Leaderboard skill names — Geist |
| `{typography.body-md}` | 16px | 400 | 24px | 0 | Default body, paragraph description — Geist |
| `{typography.body-sm}` | 14px | 400 | 20px | 0 | Secondary text, footer links — Geist |
| `{typography.body-xs}` | 12px | 400 | 16px | 0 | Smallest helper text (footer "Made with care by…") — Geist |
| `{typography.nav-link}` | 14px | 400 | 20px | 0 | Top navigation menu items — Geist |
| `{typography.mono-md}` | 14px | 400 | 20px | 0 | Terminal command, search input, tabs, column headers — Geist Mono |
| `{typography.code}` | 14px | 400 | 20px | 0 | Inline code — Geist Mono |

### Principles
- **There is no display-size tier.** The largest text is the ASCII wordmark (fluid, sized by the character blocks themselves) and the mono eyebrows (only 14px). The page's font-size ceiling is intentionally low — this is the restraint a developer directory deserves.
- **The only 600 weight** is applied to skill names (`{typography.skill-name}`) — the page's strongest weight-based hierarchy. All other text is 400 / 500.
- **uppercase is applied only to mono eyebrows** — Geist Mono 14px / 500 / uppercase is the "label / section head" signature; footer column headings drop to 12px / 400 / uppercase.
- Negative letter-spacing **is applied only to the ASCII wordmark** (-1px); body and mono text all have zero tracking.
- **Font-family switching IS hierarchy.** Switching from Geist to Geist Mono + uppercase is itself the signal that "this is a label, not content."

### Font Substitution Notes
Geist and Geist Mono are both Vercel open-source fonts (SIL OFL 1.1), publicly available via the `geist` npm package — **there is no proprietary gap comparable to CursorGothic / berkeleyMono.** Fira Mono is also open-source (Mozilla, OFL 1.1). If substitution is needed: the closest open substitute for Geist is **Inter** (humanist sans, screen-optimized); for Geist Mono, **JetBrains Mono** or **IBM Plex Mono**; for Fira Mono, **Fira Mono itself** (already open) or **JetBrains Mono**.

## Layout

### Spacing System
skills.sh's spacing system follows the Vercel / Tailwind default 4px-based scale:
- Horizontal: `g1` 4px · `g2` 8px · `g3` 12px · `g4` 16px · `g5` 20px · `g6` 24px · `g8` 32px · `g10` 40px · `g12` 48px · `g14` 56px.
- Container horizontal padding: 32px (`px-8` / `{spacing.container-px}`), with breakpoint switching via `px-4 sm:px-6 lg:px-8`.
- Section vertical padding: 32px (main `{spacing.section-py}`). Footer vertical padding: 48px (`{spacing.footer-py}`).
- Hero grid gap: 56px (`gap-14` / `{spacing.g14}`).

### Grid & Container
- **Container max-width**: 1152px (`max-w-6xl` / `{spacing.container-max}`), centered.
- **Top navigation**: 56px high (`h-14` / `{spacing.header-height}`), sticky, pure black background, 16px horizontal padding, logo + main menu on the left, nav items on the right.
- **Hero**: asymmetric layout with ASCII wordmark on the left and descriptive text on the right. Desktop uses `grid-cols-[auto_1fr]` with a 56px gap.
- **Hero command block**: max-width 348px, 6px radius, semi-transparent dark-gray background, with a copy button.
- **Agent logo wall**: horizontal flex of 18 logos, grayscale by default, recovering brand color on hover with a 300ms transition.
- **Leaderboard**: 16-column grid (`grid-cols-16`), 45px row height, 12px 0 padding, 1px bottom border, 16px gap. Columns: rank / skill name + repo + sparkline / install count.
- **Footer**: 5-column link grid (BROWSE / TOPICS / AGENTS / DOCS / PROJECT), block layout on desktop, collapsing to vertical stack on mobile.

### Whitespace Philosophy
Whitespace is generous but **rhythm is never created by surface contrast** — every section background is pure black, and rhythm comes entirely from vertical padding and 1px borders. This is a "no-band rhythm" — unlike Claude's "cream → dark → coral → dark footer" band alternation, and unlike Cursor's "constant cream + vertical padding," skills.sh uses "constant pure black + 1px borders + mono eyebrow sectioning." It reads like a **long-scrolling terminal man page**, not a marketing landing page.

## Height & Depth

| Tier | Treatment | Usage |
|---|---|---|
| Flat | no shadow, no border, no background difference | Section backgrounds, hero text area, top navigation, footer |
| Hairline | 1px `{colors.border}` (#1c1c1c) | Leaderboard row bottoms, footer top, search input bottom, tab underline when active |
| Code block | `{colors.code-block-bg-alpha}` (rgba(28,28,28,0.8)) + 6px radius | Hero terminal command block |
| Logo tile | transparent background + grayscale filter | Agent logo wall |
| Hover | filter: grayscale(0%) / color: foreground | Logo hover, link hover, tab hover |
| Sticky | position: sticky, top: 0 | Top navigation |

**The depth philosophy is "zero shadow, zero elevation."** No box-shadow is used on any button, card, navigation, or footer. Depth is created by 1px hairlines and the single semi-transparent dark-gray background (the command block). This is Vercel's "flat-first" design-system approach taken to its extreme on skills.sh.

### Decorative Depth
- The ASCII wordmark "SKILLS" is the page's only "visual decoration" — but it's fundamentally **pure text characters**, not a bitmap, not an SVG, not an illustration.
- The 8-week activity sparklines are data visualization, not decoration — pure gray strokes, no gradient fill.
- The grayscale treatment of the agent logo wall is itself a form of "decorative depth" — hover-recovered color is the page's only color interaction.
- No hand-drawn line art, no people photography, no avatar portraits, no abstract brand bitmaps — partner credibility is shown via the logo wall, and skill credibility is shown via install counts and sparklines.

## Shape

### Radius Scale

| Token | Value | Usage |
|---|---|---|
| `{rounded.none}` | 0px | Default — all sections, table rows, footer, navigation |
| `{rounded.sm}` | 4px | Copy button, small icon buttons |
| `{rounded.md}` | 6px | Hero terminal command block |
| `{rounded.lg}` | 8px | (Reserved, unused on this page) |
| `{rounded.pill}` | 9999px | (Unused — skills.sh has no pill buttons) |

**The page's shape language is "square-first."** Leaderboard rows, footer, sections, and the search input all have zero radius. The only radii appear on the hero terminal command block (6px) and the copy button (4px) — both small interactive widgets. This is the opposite of Cursor's "all buttons are pills": skills.sh **has no pill buttons** because the page has almost no traditional CTA buttons in the first place — the main interactions are the search input, tabs, and table-row clicks.

### Photography & Illustration
skills.sh **uses no photography or illustration.** The visual main acts are:
- **ASCII art wordmark** — the figlet-style "SKILLS" block character banner in the hero.
- **Sparklines** — the 8-week install-activity mini line chart on each leaderboard row.
- **Grayscale logo wall** — 18 partner agent logos in monochrome.
- **The data itself** — skill names, repository paths, and install-count numbers ("2.2M", "595.5K").

No product mockup, no IDE simulation, no abstract brand bitmap, no people avatars — this is a **pure-typography + pure-data** directory page.

## Components

### Top Navigation
**`top-nav`** — a fixed pure-black navigation bar at the top. 56px high (`{spacing.header-height}`), background `{colors.background}` (#000), **no border-bottom, no shadow, no backdrop-blur**, blending with the page. Layout: "Skills" wordmark (with a small triangle icon) + main menu (Topics / Official / Audits / Docs) on the left, nav items on the right at `{typography.nav-link}` (Geist 14px / 400) in mid-gray (`{colors.nav-link}` — #a1a1aa), lifting to foreground on hover. Sticky positioned.

### ASCII Wordmark
**`ascii-wordmark`** — the "SKILLS" block character banner in the hero. Fira Mono, letter-spacing -1px, color foreground. It is the page's only "image" hero, but fundamentally pure text — readable to screen readers (as "S K I L L S" character art). This is skills.sh's strongest brand signature: in an era when AI product pages use 3D renders, abstract waves, or gradient meshes for hero visuals, it uses figlet-style ASCII character art.

### Hero Command Block
**`terminal-code-block`** — the terminal command block at the lower-left of the hero. Background `{colors.code-block-bg-alpha}` (rgba(28,28,28,0.8)), 6px radius, max-width 348px, padding 12px × 16px. Content: `$ npx skills add <owner/repo>`, Geist Mono 14px. The right side carries a `{component.copy-button}` — transparent background, 28px high, 4px radius, grayscale icon, lifting to foreground on hover. This is the page's **only rounded container** and the only non-pure-black background.

### Eyebrow
**`eyebrow-md`** — section-head label. Geist Mono 14px / 500 / uppercase, color foreground. Used for "TRY IT NOW", "AVAILABLE FOR THESE AGENTS", "SKILLS LEADERBOARD". **No pill container, no background, no border** — the eyebrow's signature is "pure text + uppercase + mono family" alone.

### Search Input
**`search-input`** — the search input at the top of the leaderboard. Transparent background, Geist Mono 14px, 45px high, padding 12px × 32px, placeholder color `{colors.muted-foreground-soft}` (#787878). A 1px `{colors.border}` divider sits below. The right side carries a "/" shortcut hint (mono). **Mono font instead of sans** — skills.sh's counter-intuitive choice: a search input is a developer tool, and should look like a terminal input rather than a marketing-page search field.

### Tab
**`tab-active}` / `{tab-inactive}`** — the leaderboard's All Time / Trending / Hot switcher. Geist Mono 14px, no background, no pill container. **State is differentiated by a 2px underline**: active uses a `{colors.foreground}` underline + foreground text; inactive uses a transparent underline + `{colors.nav-link}` text. This is a third tab paradigm distinct from both Cursor's pill buttons and Claude's filled buttons — **pure underline tabs**, closest to GitHub's repository tab visual language.

### Leaderboard Row
**`leaderboard-row`** — a single leaderboard row. display: grid, 16 columns (`grid-cols-16`), 16px gap, padding 12px 0, 45px high, 1px `{colors.border}` bottom border. Column allocation: rank (#, mono mid-gray) / skill name (`{typography.skill-name}` 16px / 600, Geist) + repo path (mono 14px, muted) / 8W sparkline (SVG, grayscale) / install count ("2.2M", with hexagonal icon). The whole row is clickable; on hover the background does not change (stays pure black), with readability carried by borders and font size.

### Sparkline
**`sparkline`** — the 8-week install-activity mini chart on each leaderboard row. SVG, roughly 80–120px wide (responsive to column width), stroke `{colors.muted-foreground}` grayscale, no fill, no gradient. It is data visualization, not decoration — telling the reader whether a skill is trending up, down, or flat.

### Agent Logo Wall
**`agent-logo-tile`** — a partner agent logo tile. Transparent background, `filter: grayscale(100%)` default, `hover: grayscale(0%)` recovering brand color, 300ms transition. Each logo is wrapped in an `<a>` linking to the `/agent/<name>` subdirectory page. **Grayscale default + color hover is the page's only color interaction** — color is treated as a reward for active exploration, not as default decoration.

### Copy Button
**`copy-button`** — the copy button on the right side of the terminal command block. Transparent background, `{colors.muted-foreground}` grayscale icon, 28px high, 4px radius, padding 6px. Lifts to foreground on hover. No fill, no border — a pure icon button.

### Footer
**`footer`** — pure black footer, same color as the canvas (`{colors.background}` — #000), **not flipped to gray or white.** A 1px `{colors.border}` top border separates it, padding 48px × 32px, max-width 1152px centered. A 5-column link grid: BROWSE / TOPICS / AGENTS / DOCS / PROJECT, with column headings at `{typography.eyebrow-sm}` (Geist Mono 12px / 400 / uppercase) and links at `{typography.body-sm}` (Geist 14px / 400) in muted color, lifting to foreground on hover. The bottom row carries the copyright + "Made with care by Vercel" + "Skills are open source on GitHub" — at `{typography.body-xs}` (12px), the most de-emphasized helper text.

## Do & Don't

### Do
- Anchor to the `{colors.background}` (#000000) pure black canvas. Keep color temperature constant — no blue-tinted dark slate, no elevated surface tier.
- Reserve "emphasis" for **weight** (skill-name 600) and **font-family switching** (eyebrow → Geist Mono uppercase). Never emphasize by color.
- Use `{typography.eyebrow-md}` (Geist Mono 14px / 500 / uppercase) for all eyebrows. This is the brand's "terminal voice" signature.
- Use `{component.ascii-wordmark}` (Fira Mono, -1px tracking) for the hero visual — ASCII art is the page's strongest visual signature.
- Use `{colors.border}` (#1c1c1c) 1px for all borders — there is exactly one hairline tier; do not derive additional tiers.
- Render partner logos in grayscale by default and color on hover. Treat color as a reward for active exploration.
- Use `border-b-2` underline tabs — never filled pill tabs.
- Use Geist Mono (not Geist) for the search input — a search field is a developer tool and should look like a terminal input.
- Use 6px radius + rgba(28,28,28,0.8) semi-transparent background for the terminal command block — the only "non-pure-black + rounded" combination allowed on the page.

### Don't
- Do not introduce any brand color, accent color, or CTA color. skills.sh is an achromatic system; color appears only as a logo-hover reward.
- Do not build a 64px / 48px / 36px serif or sans display headline. The largest text is the ASCII wordmark and the mono eyebrows.
- Do not make buttons pill-shaped. The page's shape language is square — pills would immediately break the "terminal man page" feel.
- Do not switch to a light theme or offer a light/dark toggle. skills.sh is fully dark — this is the developer-directory voice.
- Do not add box-shadow to cards / rows / buttons. Depth is created by 1px hairlines and the single semi-transparent background.
- Do not wrap eyebrows in pill containers, backgrounds, or borders. The eyebrow's signature is "pure text + uppercase + mono."
- Do not introduce bitmap illustrations, people photography, or abstract brand images on the marketing page. The visual main acts are ASCII art + sparklines + grayscale logo wall + the data itself.
- Do not flip the footer to white or gray. The footer matches the canvas (#000), separated only by a 1px top border.
- Do not substitute Inter / system-ui for Geist — Geist is Vercel's own open-source font and the typographic base of skills.sh; substitution loses Vercel's字形 character.

## Responsive Behavior

### Breakpoints

| Name | Width | Key changes |
|---|---|---|
| Mobile | < 640px (sm) | Container padding tightens to 16px (px-4); hero ASCII wordmark horizontally overflow-scrolls or scales; hero asymmetric layout stacks to a single column; agent logo wall scrolls horizontally; leaderboard may collapse or hide some columns (sparkline, install count); footer 5 columns stack vertically |
| Tablet | 640–1024px (sm–lg) | Container padding 24px (px-6); hero maintains asymmetric layout with compressed proportions; logo wall remains horizontal; leaderboard maintains full columns |
| Desktop | 1024px+ (lg) | Container padding 32px (px-8); hero `grid-cols-[auto_1fr]`, 56px gap; leaderboard 16-column grid fully expanded; footer 5 columns; container 1152px |
| Wide | > 1280px (xl) | Same as desktop, with expanded side gutters; container still capped at 1152px |

### Touch Targets
- Leaderboard row 45px high (`{spacing.row-height}`), whole row clickable — slightly below WCAG 44 but close, and the page is primarily desktop.
- Search input 45px high — adequate touch target.
- Copy button 28px high — **below WCAG 44**, used only inside the desktop hero command block.
- Tab link height is padding-driven, around 36px, marginally meeting touch target.
- Agent logo tiles are fully clickable with adequate touch target.

### Collapse Strategy
- Top navigation tightens padding on narrow screens; main menu items remain visible (only 4 items).
- Hero's left-ASCII + right-description asymmetric layout stacks to a single column on mobile: ASCII wordmark first, then description + command block.
- Leaderboard may hide the sparkline column and some helper columns on narrow screens, keeping rank + skill name + install count.
- Footer 5 columns collapse to vertical stack or a 2-column grid on mobile; the bottom copyright and "Made with care by" line stays as one or two rows.
- ASCII wordmark allows horizontal scrolling on narrow screens rather than scaling font size — preserving the square character-block feel.

### Image Behavior
- ASCII wordmark keeps its character blocks intact, allowing horizontal scroll on narrow screens.
- Sparklines keep fixed font size and stroke width on narrow screens, with width adapting to the column.
- Agent logos keep grayscale-default + color-hover behavior at all breakpoints, with tile size scaling by breakpoint.

## Iteration Guide

1. Change one component at a time, referencing its YAML key (`{component.leaderboard-row}`, `{component.terminal-code-block}`).
2. Variants of the same component (`tab-active` / `tab-inactive`, `eyebrow-md` / `eyebrow-sm`) are listed as separate entries under `components:`, never merged.
3. Use `{token.refs}` throughout — never inline hex values.
4. Do not record hover. Record only Default and Active/Pressed/Focused states.
5. The three-typeface division of labor is unbreakable: Geist for body / headings / navigation, Geist Mono for eyebrows / code / search / tabs / footer headings, Fira Mono only for the ASCII wordmark. Never use Fira Mono in a second place.
6. The achromatic palette is unbreakable: pure black + gray luminance gradient + near-white foreground. Do not introduce any colored token.
7. The shape cycle is unbreakable: sections / rows / footer / navigation use 0 radius, command block uses 6px, copy button uses 4px. Do not make buttons pill-shaped.
8. When unsure "how to emphasize": first switch to Geist Mono + uppercase (turn it into an eyebrow), or add weight up to 600 — **never introduce color.**
9. All borders use `{colors.border}` (#1c1c1c) 1px. Do not derive a second hairline tier; do not introduce a separate gray hex.

## Known Gaps

- No light theme exists — skills.sh is fully dark with no theme toggle. This document records only the (sole) dark theme.
- The visual style of leaderboard sub-pages (`/trending`, `/hot`, `/agent/<name>`, `/topic/<topic>`, `/<owner>/<repo>/<skill>`) is not fully extracted here — this document is based on the homepage `/`. Sub-pages most likely reuse the same token set, but skill-detail pages may include README rendering, multi-tab install commands, dependency graphs, and other dedicated components.
- The exact narrow-screen scaling strategy for the ASCII wordmark (horizontal scroll vs font-size scaling vs hiding) requires mobile-breakpoint testing; this document is extracted from the desktop breakpoint (1200×736).
- The hover / active visual state of leaderboard rows (whether background lifts, whether border lifts, whether sparkline highlights) requires interactive-state testing; this document records only the default state.
- Form-validation states (empty search results, no skill matched) are out of scope.
- Content pages such as "Docs" / "About" / "Contact" / "Privacy" / "Terms" may introduce long-form reading components (h1 / h2 / paragraphs / code blocks / lists) that are out of scope here.
- The actual output and color scheme of the skills.sh backend CLI (`npx skills`) is out of scope for this marketing-surface document.
- Geist / Geist Mono / Fira Mono are all open-source fonts with no proprietary gap; however, Vercel Geist's字形 details (notably 0/O distinction, 1/I/l distinction, ligature behavior) may differ across fallback fonts.
