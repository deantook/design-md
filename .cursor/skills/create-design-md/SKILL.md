---
name: create-design-md
description: Generate a pair of design.md design-system documents (Chinese + English) from a URL or reference image, for use as agent-coding design specs. Use when the user provides a website URL, screenshot, or reference image and asks to extract/analyze/generate a design.md, design system, design tokens, or visual spec. Produces `.design.zh.md` and `.design.en.md` files in the `design/` folder following the Cursor/Claude/skills.sh design.md structure. Can use the chrome-devtools MCP to navigate, snapshot, screenshot, and extract computed styles from live pages.
---

# create-design-md

Generate a pair of `design.md` design-system documents (`.design.zh.md` + `.design.en.md`) from a URL or reference image, strictly following the structure of the reference files in `design/`.

## When to use

Trigger when the user provides any of:
- A website URL (e.g. `https://example.com`) and asks for a design.md / design spec / design tokens / visual analysis
- A screenshot or reference image (file path or pasted) and asks to extract a design system from it
- A request like "为 X 网站生成 design.md" / "extract design tokens from X"

## Output

Two files written to the project's `design/` folder:
- `design/<domain>.design.zh.md` — Chinese version
- `design/<domain>.design.en.md` — English version

`<domain>` is derived from the URL host (e.g. `cursor.com`, `claude.com`, `skills.sh`) or, for image-only input, a short slug agreed with the user.

## Reference structure (mandatory)

Both files MUST follow the exact structure of these references in `design/`:
- `design/cursor.com.design.zh.md` (Chinese reference)
- `design/claude.com.design.en.md` (English reference)
- `design/skills.sh.design.zh.md` and `design/skills.sh.design.en.md` (paired zh/en reference)

Use `template.zh.md` and `template.en.md` (next to this SKILL.md) as the skeleton — fill every section, do not drop any.

### Required top-level sections (in order)

1. YAML frontmatter with `version`, `name`, `description`, then `colors` / `typography` / `rounded` / `spacing` / `components` token blocks
2. `## 概览` / `## Overview`
3. `## 颜色` / `## Colors` — sub-sections: 品牌与强调 / Brand & Accent, Surface, 描边/Hairline, 文本/Text, 语义色/Semantic
4. `## 字体` / `## Typography` — sub-sections: 字体族/Font Family, 层级/Hierarchy (table), 原则/Principles, 字体替代说明/Note on Font Substitutes
5. `## 布局` / `## Layout` — sub-sections: 间距体系/Spacing System, 网格与容器/Grid & Container, 留白哲学/Whitespace Philosophy
6. `## 高度与深度` / `## Elevation & Depth` — table + 装饰性深度/Decorative Depth
7. `## 形状` / `## Shapes` — sub-sections: 圆角刻度/Border Radius Scale (table), 摄影与插画/Photography & Illustration
8. `## 组件` / `## Components` — one `###` block per component, each references its YAML key
9. `## Do 与 Don't` / `## Do's and Don'ts`
10. `## 响应式行为` / `## Responsive Behavior` — 断点/Breakpoints (table), 触摸目标/Touch Targets, 折叠策略/Collapsing Strategy, 图像行为/Image Behavior
11. `## 迭代指南` / `## Iteration Guide`
12. `## 已知缺口` / `## Known Gaps`

## Token rules (non-negotiable)

These rules are what make the design.md usable by agent-coding — break them and the doc loses its value.

1. **All token references use `{token.refs}` syntax** — `{colors.canvas}`, `{typography.display-md}`, `{rounded.pill}`, `{spacing.section}`, `{component.button-primary}`. Never inline hex/px in the prose body; always cite the token key.
2. **YAML frontmatter is the single source of truth** — every color/typography/rounded/spacing/component value lives in the frontmatter. The prose references these keys.
3. **Components are separate entries, never merged** — variants (`-active`, `-disabled`, `-sm`, `-secondary`, `-on-dark`) each get their own key under `components:`.
4. **Record Default and Active/Pressed/Focused only — never hover.** Hover is intentionally out of scope (per reference files).
5. **Frontmatter `description` field** is a single dense paragraph (2–5 sentences) that captures the system's character: canvas tone, brand-color voltage, typographic voice, signature shape, and the system's defining contrast against common SaaS defaults.
6. **Hex values are uppercase where ambiguous; use the exact on-site value.** For derived/oklab values, use `color-mix(in oklab, #XXXXXX X%, transparent)` form (see `cursor.com.design.zh.md`).
7. **`{component.X}` blocks in frontmatter** list backgroundColor, textColor, typography, rounded, padding, height, border as applicable — same shape as the references.

## Workflow

### Phase 1 — Gather input

Determine the source:
- **URL** → proceed to Phase 2A
- **Image(s) only** → proceed to Phase 2B
- **Both** → use URL for live extraction, image(s) as visual corroboration

Determine `<domain>`:
- URL input → host without `www.` (e.g. `cursor.com`, `skills.sh`)
- Image-only → ask the user for a slug, or propose one based on visible branding

### Phase 2A — Live extraction via chrome-devtools MCP

Use the `user-chrome-devtools` MCP server. **Always read the tool's schema descriptor before calling** (per MCP rules). Recommended tools, in order:

1. `new_page` or `navigate_page` — open the target URL at desktop size (default). Wait for load.
2. `resize_page` — set desktop viewport (1440×900 or 1200×800 depending on target's container-max). Then optionally re-snapshot at 768×1024 (tablet) and 390×844 (mobile) for responsive sections.
3. `take_screenshot` — `fullPage: true`, save to `design/.tmp/<domain>.full.png` for visual reference. Also capture viewport-only screenshots of hero, nav, footer, a feature section, and a product mockup if present.
4. `take_snapshot` — capture the a11y tree to understand page structure, nav items, headings, buttons. Save to `design/.tmp/<domain>.snapshot.txt` if large.
5. `evaluate_script` — run the extraction script at `scripts/extract.js` (pass its content as the `function` argument). It returns a JSON object with:
   - `fonts`: distinct font-family stacks in use, with the elements using each
   - `typeScale`: distinct `font-size`/`font-weight`/`line-height`/`letter-spacing` combos grouped by selector sample
   - `colors`: distinct `color` and `background-color` values (rgb/hex), with occurrence count and sample selectors
   - `radii`: distinct `border-radius` values with sample selectors
   - `spacing`: section/card padding values, container max-width, header height
   - `components`: heuristic component buckets (buttons, cards, inputs, nav, footer) with their computed styles

### Phase 2B — Image-only extraction

Use the Read tool on the provided image(s). Extract by visual inspection:
- Canvas tone, ink color, brand accent(s)
- Display vs body font voice (serif / sans / mono / mix)
- Button shape (pill / 8px / square), button color (brand / ink / surface)
- Card background tiers, surface band alternation pattern
- Section rhythm, container width, hero layout symmetry
- Footer treatment (same as canvas / flipped dark / flipped brand)
- Photography vs illustration vs product mockup vs pure typography

Note explicitly in `## 已知缺口` that image-only extraction cannot confirm exact hex / font-family / weight / line-height values, and that a live pass is recommended to refine.

### Phase 3 — Synthesize tokens

Map extracted data to the frontmatter token blocks:
- `colors:` — name each token semantically (`canvas`, `ink`, `primary`, `accent`, `surface-card`, `surface-dark`, `hairline`, `body`, `muted`, etc.). Pick names that match the reference conventions.
- `typography:` — name each combo by role (`display-xl`, `display-md`, `title-lg`, `body-md`, `eyebrow`, `button`, `nav-link`, `code`). Use role names from the references where applicable.
- `rounded:` — provide `xs sm md lg xl pill full` even if some are unused (mark usage in the table).
- `spacing:` — derive the site's base unit (4px / 8px / 10px) and name tokens accordingly.
- `components:` — one entry per distinct component variant. Cross-reference the snapshot for names.

### Phase 4 — Write the two files

1. Read `template.zh.md` and `template.en.md` (next to this SKILL.md).
2. Fill every section. Do not leave placeholder text.
3. Write `design/<domain>.design.zh.md` first, then `design/<domain>.design.en.md`.
4. The two files must be semantic mirrors: same token keys, same component list, same section order. Prose is localized (zh condensed analytical Chinese; en fluent English matching the Claude reference voice).
5. Clean up `design/.tmp/` once both files are written (keep only if the user asks for the screenshots).

### Phase 5 — Verify

- Both files start with `---` frontmatter and end with `## 已知缺口` / `## Known Gaps`.
- Every prose color/radius/spacing reference uses `{token.refs}` — no inlined hex/px in the body.
- Every `###` component block in `## 组件` / `## Components` references a frontmatter `{component.X}` key that actually exists.
- `description` frontmatter field is one dense paragraph, not a list.
- Files are co-located in `design/` and named `<domain>.design.zh.md` / `<domain>.design.en.md`.

## Style & voice

- **Chinese (zh)**: Match `cursor.com.design.zh.md` — dense, analytical,clause-heavy sentences with em-dash breaks; uses 「」/"" for quoted labels; references competing brands (Claude/Cursor/Anthropic) as contrast points where relevant. Avoid marketing fluff.
- **English (en)**: Match `claude.com.design.en.md` — declarative, present-tense, "The system anchors on...", "Brand voltage comes from...", "The signature X is Y." Avoid exclamation, avoid hedge words.

## Tools

- **chrome-devtools MCP** (`user-chrome-devtools` server): `new_page`, `navigate_page`, `resize_page`, `take_screenshot`, `take_snapshot`, `evaluate_script`. Read each tool's schema at `/Users/dean/.cursor/projects/Users-dean-code-design-md/mcps/user-chrome-devtools/tools/<tool>.json` before calling.
- **Read**: read reference design.md files and any user-provided images.
- **Write**: write the two output files.
- **No scripts to execute locally** — `scripts/extract.js` is passed as a string to `evaluate_script`'s `function` argument; it runs in the browser, not Node.

## Files in this skill

- `SKILL.md` — this file
- `template.zh.md` — Chinese skeleton (fill every section)
- `template.en.md` — English skeleton (fill every section)
- `scripts/extract.js` — computed-style extraction script for `evaluate_script`
