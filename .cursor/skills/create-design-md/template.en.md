---
version: alpha
tags:
  - <tag1>
  - <tag2>
  - <tag3>
  - <tag4>
  - <tag5>
  - <tag6>
name: <domain>-design-analysis
description: <A 2–5 sentence dense paragraph: canvas tone, brand voltage source, typographic voice, signature shape, the system's defining contrast against common SaaS defaults. English, match claude.com.design.en.md voice.>

colors:
  primary: "#XXXXXX"
  primary-on: "#XXXXXX"
  accent: "#XXXXXX"
  ink: "#XXXXXX"
  body: "#XXXXXX"
  body-strong: "#XXXXXX"
  muted: "#XXXXXX"
  muted-soft: "#XXXXXX"
  hairline: "#XXXXXX"
  hairline-soft: "#XXXXXX"
  canvas: "#XXXXXX"
  surface-soft: "#XXXXXX"
  surface-card: "#XXXXXX"
  surface-dark: "#XXXXXX"
  surface-dark-elevated: "#XXXXXX"
  on-primary: "#XXXXXX"
  on-dark: "#XXXXXX"
  on-dark-soft: "#XXXXXX"
  accent-teal: "#XXXXXX"
  success: "#XXXXXX"
  warning: "#XXXXXX"
  error: "#XXXXXX"

typography:
  display-xl:
    fontFamily: "Copernicus, Tiempos Headline, serif"
    fontSize: 64px
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -1.5px
  display-lg:
    fontFamily: "Copernicus, Tiempos Headline, serif"
    fontSize: 48px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -1px
  display-md:
    fontFamily: "Copernicus, Tiempos Headline, serif"
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.5px
  display-sm:
    fontFamily: "Copernicus, Tiempos Headline, serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.3px
  title-lg:
    fontFamily: "StyreneB, Inter, sans-serif"
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "StyreneB, Inter, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "StyreneB, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "StyreneB, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "StyreneB, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  caption:
    fontFamily: "StyreneB, Inter, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "StyreneB, Inter, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 1.5px
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  button:
    fontFamily: "StyreneB, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "StyreneB, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px
  container-max: 1200px
  header-height: 64px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 40px
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 40px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-xl}"
    padding: 96px
  hero-illustration-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
  feature-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  product-mockup-card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  code-window-card:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.code}"
    rounded: "{rounded.lg}"
    padding: 24px
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 10px 14px
    height: 40px
    border: 1px solid {colors.hairline}
  badge-pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  badge-coral:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption-uppercase}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  cta-band-coral:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.display-sm}"
    rounded: "{rounded.lg}"
    padding: 64px
  footer:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark-soft}"
    typography: "{typography.body-sm}"
    padding: 64px
---

## Overview

<2–4 dense analytical paragraphs. Paragraph 1: base atmosphere, canvas tone, brand voltage source, typographic voice. Paragraph 2: the system's defining contrast against the AI-product category (Claude/Cursor/skills.sh). Paragraph 3: surface modes, whitespace philosophy, signature shape. Match the claude.com.design.en.md Overview density — declarative present-tense, "The system anchors on...", "Brand voltage comes from...", "The signature X is Y".>

**Key Characteristics:**
- <Canvas color + ink color, luminance relationship>
- <Primary CTA color — brand color or ink? Where does the brand color appear?>
- <Type family and weight strategy — single family or split? Is display ever bold?>
- <Signature shape — button radius, card radius, shape language>
- <Product mockup / illustration / photography strategy>
- <Container width, section padding, vertical rhythm>
- <Footer treatment — same as canvas / flipped dark / flipped brand>

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}` — #XXXXXX): <where used, scarcity level>
- **Accent** (`{colors.accent}` — #XXXXXX): <secondary accent, whether independent>
- <Other brand color variants — active / disabled>

### Surface
- **Canvas** (`{colors.canvas}` — #XXXXXX): <default page floor, color temperature>
- **Surface Card** (`{colors.surface-card}` — #XXXXXX): <card background, luminance step from canvas>
- **Surface Dark** (`{colors.surface-dark}` — #XXXXXX): <whether dark surface exists, where used>
- <Whether the page has dark-band alternation rhythm>

### Border / Hairline
<Border system — independent gray hex or oklab-derived? How many tiers? Reference cursor's oklab derivation or claude's independent hairline hex.>
- **Hairline** (`{colors.hairline}` — #XXXXXX): <use>

### Text
- **Ink** (`{colors.ink}` — #XXXXXX): <primary text, color temperature>
- **Body** (`{colors.body}` — #XXXXXX): <running text, whether same as ink or lighter>
- **Muted** (`{colors.muted}` — #XXXXXX): <sub-headings, breadcrumbs>
- <Whether the page has any cool-gray text — are all muted values derived from ink>

### Semantic
- **Success** (`{colors.success}` — #XXXXXX): <use>
- **Warning** (`{colors.warning}` — #XXXXXX): <use>
- **Error** (`{colors.error}` — #XXXXXX): <use>

## Typography

### Font Family
<Type strategy: single family / serif display + sans body split / three-way division? Reference the three samples' differences. Fallback stacks.>
- <Display face> (weight <X>) → <use>
- <Body face> (weight <X>) → <use>
- <Mono face> → <code and terminal>

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 400 | 1.05 | -1.5px | Homepage h1 — <face> |
| `{typography.display-md}` | 36px | 400 | 1.15 | -0.5px | Section heads — <face> |
| `{typography.title-md}` | 18px | 500 | 1.4 | 0 | Feature card titles — <face> |
| `{typography.body-md}` | 16px | 400 | 1.55 | 0 | Default running text — <face> |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Footer body — <face> |
| `{typography.caption}` | 13px | 500 | 1.4 | 0 | Badge labels — <face> |
| `{typography.caption-uppercase}` | 12px | 500 | 1.4 | 1.5px | Category tags — <face> |
| `{typography.code}` | 14px | 400 | 1.6 | 0 | Code blocks — <face> |
| `{typography.button}` | 14px | 500 | 1.0 | 0 | Button labels — <face> |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | Top-nav items — <face> |

### Principles
<Is display ever bold? Negative letter-spacing rules? Is font-family switching itself hierarchy? Reference the three samples' Principles paragraphs.>

### Note on Font Substitutes
<If proprietary fonts are used, list the closest open substitutes (Inter / Geist Sans / JetBrains Mono / EB Garamond / Cormorant Garamond / Söhne). If fully open-source, state explicitly that there is no proprietary gap.>

## Layout

### Spacing System
<Base unit (4px / 8px / 10px), token naming (g1/g2/g3 or xxs/xs/sm), whether horizontal and vertical systems are separate, section padding value. Reference the three samples' differences.>

### Grid & Container
- **Max content width**: <XXXX>px centered (`{spacing.container-max}`).
- **Hero**: <6/6 symmetric or auto/1fr asymmetric?>
- **Feature sections**: <3-up card grid / single-column narrative + mockup / editorial horizontal section?>
- **Footer**: <how many link columns, desktop/mobile collapse strategy>

### Whitespace Philosophy
<Is rhythm created by surface contrast (Claude-style band alternation) or by vertical padding alone (Cursor-style no-band)? Does it read like a magazine column / engineering doc / terminal man page?>

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | <no shadow no border / no shadow no background difference> | <use> |
| Soft hairline | 1px `{colors.hairline}` border | <use> |
| Cream card | `{colors.surface-card}` background — no shadow | <use> |
| Dark surface card | `{colors.surface-dark}` background — no shadow | <use> |
| Subtle drop shadow | faint shadow at low alpha | <use, if any> |

**The elevation philosophy is "<borders first / zero shadow / color-block first>".** <One paragraph of philosophy.>

### Decorative Depth
- <Brand glyph / mark — whether it appears, how it's rendered>
- <Product mockup internal depth>
- <Line art / photography / abstract bitmap / pure typography — what form does social proof take>

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | <use> |
| `{rounded.sm}` | 6px | <use> |
| `{rounded.md}` | 8px | <use> |
| `{rounded.lg}` | 12px | <use> |
| `{rounded.xl}` | 16px | <use> |
| `{rounded.pill}` | 9999px | <use / whether used> |
| `{rounded.full}` | 9999px / 50% | <use> |

**<Signature shape description — pill buttons / 8px-uniform / square-first? Reference the three samples' shape language contrast.>**

### Photography & Illustration
<Does the hero use photography? Is the main visual a product mockup / line art / abstract bitmap / ASCII wordmark / pure data table? Reference the three samples' main-visual differences.>

## Components

### Top Navigation
**`top-nav`** — <description: height, background, layout, menu items, type family, whether border-bottom / shadow / sticky.>

### Buttons
**`button-primary`** — <background, text, type family, padding, height, radius, border. Where used.>
**`button-secondary`** — <whether outlined, whether same dimensions.>
**`text-link`** — <inline link color, whether underlined.>

### Cards & Containers
**`hero-band`** — <Hero section background, padding, grid layout.>
**`feature-card`** — <background, radius, internal padding, content structure.>
**`product-mockup-card-dark`** — <whether dark product mockup card exists, what it carries.>

### Inputs & Forms
**`text-input`** — <background, border, radius, height, focus state.>

### Tags / Badges
**`badge-pill`** — <pill container / pure text + uppercase / coral fill? Reference the three samples' badge paradigm differences.>

### CTA / Footer
**`footer`** — <whether flipped dark / same color / flipped brand? How many link columns? Bottom copyright row structure? Reference the three samples' footer treatment differences.>

## Do's and Don'ts

### Do
- <Anchor every page on `{colors.canvas}` (#XXXXXX).>
- <Primary CTA color rule — what's reserved for what>
- <Type rules — display weight, family division>
- <Shape rules — button radius, card radius>
- <Whitespace rules — section padding, card padding>

### Don't
- <5–8 counter-intuitive rules — reference the three samples' Don't sections>
- <Don't use brand color for X>
- <Don't make X radius>
- <Don't switch to X theme>
- <Don't add shadow to X>

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | <changes> |
| Tablet | 768–1024px | <changes> |
| Desktop | 1024–1440px | <changes> |
| Wide | > 1440px | <changes> |

### Touch Targets
- <Button height, WCAG 44 compliance>
- <Input height>
- <Nav item touch target>
- <Elements below WCAG 44 and their mitigation>

### Collapsing Strategy
- <Nav collapse behavior>
- <Hero grid collapse>
- <Card grid column count changes>
- <Footer column collapse>

### Image Behavior
- <Whether code blocks horizontally scroll on mobile>
- <Whether illustrations scale proportionally>
- <Whether avatars crop to circles at every breakpoint>

## Iteration Guide

1. Focus on ONE component at a time. Reference its YAML key (`{component.feature-card}`, `{component.code-window-card}`).
2. Variants of an existing component (`-active`, `-disabled`, `-focused`) live as separate entries in `components:`.
3. Use `{token.refs}` everywhere — never inline hex.
4. Never document hover. Default and Active/Pressed states only.
5. <Type rule unbreakable — specific to this system>
6. <Color palette rule unbreakable — three-color cycle / two-color cycle / achromatic>
7. <Shape rule unbreakable — pills / 8px / square>
8. When in doubt about emphasis: <bigger size / switch family / add weight / introduce color — specific to this system>
9. <Border rule — independent hex or oklab-derived, how many tiers>

## Known Gaps

- <Proprietary font gap — if proprietary, list open substitutes; if fully open, state so>
- <Dark / light theme — whether a toggle exists, which theme this document records>
- <Whether animation and transition timings are in scope>
- <Whether form validation states are in scope>
- <Whether sub-page / content-page visual styles are in scope>
- <Which tokens the actual product surface (app body) shares, which are out of scope>
- <If image-only extraction, state explicitly which exact values cannot be confirmed and recommend a live pass to refine>
