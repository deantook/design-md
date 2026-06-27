---
version: alpha
name: skills-sh-design-analysis
description: 一个由 Vercel 打造的"开放 Agent 技能目录"落地页。系统锚定在纯黑画布（#000000）之上，全程深色、无浅色主题切换；色板严格无彩色（achromatic）——前景白、边界深灰、副文本中灰，零品牌色、零强调色、零渐变。字体声线由三套字体共同构成：Geist 担任全部正文与标题的人文无衬线声线；Geist Mono 担任所有 eyebrow、终端命令、搜索框、tab、footer 列标题的等宽声线；Fira Mono 仅用于 hero 中央的 ASCII 艺术字 "SKILLS"——一套 figlet 风格的块状字符，是整页唯一的"图像"主视觉。所有 eyebrow 一律 mono / uppercase / 14px，制造"终端 / CLI / 开发者工具"声线。视觉主力是排行榜表格：序号、技能名、8 周活动 sparkline、安装量——纯数据驱动，零营销插画。客户/合作 logo 一律灰度处理，hover 时恢复品牌色。

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

## 概览

skills.sh 是 Vercel 出品的"开放 Agent 技能目录"——一份克制、纯黑、零营销色的开发者目录页。基底氛围是**纯黑画布**（`{colors.background}` — #000000），不是暗灰、不是 zinc-950、不是带蓝调的 dark slate——就是纯黑。所有内容浮在 #000 之上，前景一律用近白色（`{colors.foreground}` — #ededed），描边与次要分隔一律用 Vercel gray-900 深灰（`{colors.border}` — #1c1c1c）。整页**没有任何品牌色、没有任何强调色、没有任何渐变**——品牌电压被刻意归零，把所有视觉注意力让给数据本身（技能名、安装量、sparkline）。

字体声线由**三套字体协同**构成：**Geist** 担任全部正文、技能名、导航的人文无衬线声线；**Geist Mono** 担任所有 eyebrow（"TRY IT NOW" / "AVAILABLE FOR THESE AGENTS" / "SKILLS LEADERBOARD"）、终端命令、搜索框、tab、footer 列标题的等宽声线；**Fira Mono** **仅**用于 hero 中央那组 ASCII 艺术字 "SKILLS"——一套 figlet 风格的块状字符，加 -1px 负字距压缩，是整页唯一的"图像"主视觉。所有 eyebrow 一律 mono / uppercase / 14px / weight 500，制造一种"终端 / CLI / 开发者工具"的声线——这是 skills.sh 与 Claude（衬线 display + 文学声线）、Cursor（单一无衬线 + 工程声线）最显著的分野：它要的是**黑客 / 命令行声线**。

整页**没有 hero 大字 64px display，没有营销插画，没有产品 mockup**——视觉主力是排行榜表格：序号、技能名（Geist 600）、8 周安装活动 sparkline、累计安装量。所有合作 agent logo（Claude Code / Cursor / Codex / Copilot / Windsurf / Gemini 等 18 个）一律灰度处理，hover 时恢复品牌色——这是整页唯一允许的"色彩呼吸"，且只在 hover 态出现。整页是**纯数据 + 纯排版 + 纯灰度**的循环，不引入任何位图插画与任何彩色 CTA。

**关键特征：**
- 纯黑画布（`{colors.background}` — #000000）配近白前景（`{colors.foreground}` — #ededed）。**全程深色，无浅色主题切换**——与 Cursor/Claude 默认浅色截然相反。
- 严格无彩色（achromatic）色板。零品牌色、零强调色、零渐变。所有"灰"来自 Vercel Geist gray 体系，从 #000 → #1c1c1c → #787878 → #a1a1aa → #ededed 的明度梯度。
- 三字体系统：Geist（无衬线）、Geist Mono（等宽 / eyebrow / 代码）、Fira Mono（仅 ASCII 艺术字）。**无衬线 display 字体、无粗体大字 hero**。
- Hero 主视觉是 ASCII 艺术字 "SKILLS"——纯文本块状字符，加 -1px 负字距。**整页唯一一处 Fira Mono**。
- Hero 命令块：`$ npx skills add <owner/repo>`，Geist Mono，深灰半透背景（`{colors.code-block-bg-alpha}` — rgba(28,28,28,0.8)），6px 圆角，max-w 348px，附复制按钮。
- 所有 eyebrow 用 Geist Mono uppercase 14px / 500——"TRY IT NOW"、"AVAILABLE FOR THESE AGENTS"、"SKILLS LEADERBOARD"、footer 的 "BROWSE" / "TOPICS" / "AGENTS" / "DOCS" / "PROJECT"。
- 排行榜表格为整页主视觉：16 列网格（grid-cols-16），行高 45px，padding 12px 0，1px 底边描边。列含 #、SKILL、8W ACTIVITY（sparkline）、INSTALLS（带六边形图标）。
- 合作 agent logo 一律 grayscale，hover 时 grayscale-0 恢复品牌色——**色彩仅作为 hover 奖励出现**。
- 容器最大宽度 1152px（max-w-6xl），横向 padding 32px（px-8）。顶部导航 56px 高（h-14），sticky，无 border-bottom。
- Tab 切换用 `border-b-2` 下划线而非胶囊填充——active 为前景色下划线，inactive 为透明下划线 + 中灰文字。
- Footer 纯黑同色，1px 顶边分隔，5 列链接网格，列标题用 Geist Mono 12px uppercase。

## 颜色

### 品牌与强调
skills.sh **没有品牌色，也没有强调色**——这是它最反直觉的设计选择。在一个 AI 产品页普遍用紫色 / 橙色 / 绿色做 CTA 的时代，skills.sh 把整页色彩压缩到纯灰度，所有"强调"靠**字重**（skill-name 600）与**字族切换**（eyebrow 切到 Geist Mono uppercase）制造，而非靠颜色。

- **Background**（`{colors.background}` — #000000）：纯黑画布。不是 #0a0a0a、不是 #111、不是带蓝调的 dark slate——就是 #000。这是 Vercel Geist dark theme 的 gray-1000。
- **Foreground**（`{colors.foreground}` — #ededed）：近白主文本。所有标题、技能名、正文、链接 default 态。Vercel Geist gray-100。
- **Accent**（`{colors.accent}` — #ededed）：与 foreground 同色——**没有独立的 accent token**。所谓的"强调"就是切到 foreground 全亮。
- **没有 primary / secondary CTA 色。** 整页不存在彩色 CTA 按钮。

### Surface
- **Background**（`{colors.background}` — #000000）：唯一 surface。整页所有 section、header、main、footer 同色——没有 surface 提升档，没有 elevated card 背景。
- **Code block bg**（`{colors.code-block-bg-alpha}` — rgba(28,28,28,0.8)）：终端命令块的半透深灰背景，是整页唯一一处"非纯黑" surface，且仅在 hero 命令块内出现。
- **整页没有深色 band 切换节奏**——所有段背景同为纯黑，节奏完全靠纵向 padding 与 1px 描边塑造。

### 描边 / Hairline
描边体系来自 Vercel Geist gray-900，整页**仅一档描边色**：
- **Border**（`{colors.border}` — #1c1c1c）：所有 1px 分隔线——leaderboard 行底边、footer 顶边、搜索框下边、tab 下划线（active 时改用 foreground）。无第二档 hairline。

### 文本
- **Foreground**（`{colors.foreground}` — #ededed）：所有主文本、技能名、active tab、active 链接。
- **Nav link**（`{colors.nav-link}` — #a1a1aa）：顶部导航菜单项 default 态。中灰，hover 时升至 foreground。
- **Muted foreground**（`{colors.muted-foreground}` — #8a8a8a）：技能仓库路径、footer 列内链接 default 态。
- **Muted foreground soft**（`{colors.muted-foreground-soft}` — #787878）：搜索框 placeholder、最弱化的辅助文本。

### 语义色
- **没有独立的 success / error / warning 色。** 整页 achromatic——状态变化靠文本内容（"available"、"deprecated"）与 mono 字体本身，而非颜色。语义色 token 在此系统里全部映射为 foreground。

## 字体

### 字体族
系统使用**三套字体**，分工明确：

- **Geist**（人文无衬线，weight 400–600）→ 全部正文、技能名、导航、链接 default。是声线主体。
- **Geist Mono**（等宽，weight 400–500）→ 所有 eyebrow（"TRY IT NOW" 等）、终端命令、搜索框、tab、footer 列标题、leaderboard 列头。制造"CLI / 终端"声线。
- **Fira Mono**（等宽）→ **仅** hero 中央 ASCII 艺术字 "SKILLS"。letter-spacing -1px 压缩。这是整页唯一使用 Fira Mono 的位置，刻意区别于 Geist Mono 的"工具感"，制造"早期 Unix / figlet banner"的复古黑客感。
- fallback：`Geist Fallback`、`Geist Mono Fallback`、`Fira Mono Fallback`、`system-ui`、`ui-monospace`、`SFMono-Regular`、`Menlo`、`Monaco`、`Consolas`、monospace。

无衬线 display 字体、无粗体大字 hero——skills.sh 的 hero 是 ASCII 艺术字 + mono eyebrow，**不存在 64px / 48px / 36px 的衬线大标题层**。这是它对 Claude（Copernicus 衬线）与 Cursor（CursorGothic 无衬线 26px）两者的共同否定。

### 层级

| Token | 字号 | 字重 | 行高 | 字距 | 用途 |
|---|---|---|---|---|---|
| `{typography.display-ascii}` | fluid | 400 | 1 | -1px | Hero ASCII "SKILLS" — Fira Mono |
| `{typography.eyebrow-md}` | 14px | 500 | 20px | 0 | Hero / 段 eyebrow（uppercase） — Geist Mono |
| `{typography.eyebrow-sm}` | 12px | 400 | 16px | 0 | Footer 列标题（uppercase） — Geist Mono |
| `{typography.skill-name}` | 16px | 600 | 24px | 0 | 排行榜技能名 — Geist |
| `{typography.body-md}` | 16px | 400 | 24px | 0 | 默认正文、段落描述 — Geist |
| `{typography.body-sm}` | 14px | 400 | 20px | 0 | 副文本、footer 链接 — Geist |
| `{typography.body-xs}` | 12px | 400 | 16px | 0 | 最小辅助文本（footer 底部"Made with care by…"） — Geist |
| `{typography.nav-link}` | 14px | 400 | 20px | 0 | 顶部导航菜单项 — Geist |
| `{typography.mono-md}` | 14px | 400 | 20px | 0 | 终端命令、搜索框、tab、列头 — Geist Mono |
| `{typography.code}` | 14px | 400 | 20px | 0 | 行内代码 — Geist Mono |

### 原则
- **没有 display 字号层**。最大文本是 ASCII 艺术字（fluid，靠字符块自撑尺寸）与 mono eyebrow（仅 14px）。整页字号天花板很低——这是开发者目录该有的克制。
- **唯一的 600 字重**施加在技能名上（`{typography.skill-name}`）——这是整页靠字重制造层级的最强一处。其余文本全为 400 / 500。
- **uppercase 只施加于 mono eyebrow**——Geist Mono 14px / 500 / uppercase 是"标签 / 段头"签名，footer 列标题降到 12px / 400 / uppercase。
- 负字距**只施加于 ASCII 艺术字**（-1px），正文与 mono 文本字距全部为 0。
- **字族切换即层级**：从 Geist 切到 Geist Mono + uppercase，本身就是"这是标签、不是内容"的信号。

### 字体替代说明
Geist 与 Geist Mono 均为 Vercel 开源字体（SIL OFL 1.1），通过 `geist` npm 包公开提供——**不存在 CursorGothic / berkeleyMono 那样的专有缺口**。Fira Mono 同样为开源（Mozilla 公募 OFL 1.1）。若需替代：Geist 最接近的开放替代是 **Inter**（人文无衬线、屏幕优化），Geist Mono 最接近的开放替代是 **JetBrains Mono** 或 **IBM Plex Mono**，Fira Mono 的开放替代是 **Fira Mono** 本身（已开源）或 **JetBrains Mono**。

## 布局

### 间距体系
skills.sh 的间距体系沿用 Vercel / Tailwind 默认 4px 基底刻度：
- 横向：`g1` 4px · `g2` 8px · `g3` 12px · `g4` 16px · `g5` 20px · `g6` 24px · `g8` 32px · `g10` 40px · `g12` 48px · `g14` 56px。
- 容器横向 padding：32px（`px-8` / `{spacing.container-px}`），断点切换为 `px-4 sm:px-6 lg:px-8`。
- Section 纵向 padding：32px（main `{spacing.section-py}`）。Footer 纵向 padding：48px（`{spacing.footer-py}`）。
- Hero 网格 gap：56px（`gap-14` / `{spacing.g14}`）。

### 网格与容器
- **容器最大宽度**：1152px（`max-w-6xl` / `{spacing.container-max}`），居中。
- **顶部导航**：56px 高（`h-14` / `{spacing.header-height}`），sticky，纯黑背景，左右 16px padding，logo + 主菜单左对齐，导航项右对齐。
- **Hero**：左 ASCII 艺术字 + 右描述文字的非对称布局。桌面 `grid-cols-[auto_1fr]`，gap 56px。
- **Hero 命令块**：max-w 348px，6px 圆角，深灰半透背景，附复制按钮。
- **Agent logo wall**：横向 flex 排列 18 个 logo，grayscale default，hover 时恢复彩色，transition 300ms。
- **Leaderboard**：16 列网格（`grid-cols-16`），每行 45px 高，padding 12px 0，1px 底边描边，gap 16px。列分配：序号 / 技能名 + 仓库 + sparkline / 安装量。
- **Footer**：5 列链接网格（BROWSE / TOPICS / AGENTS / DOCS / PROJECT），桌面 block 布局，移动端折叠为竖排。

### 留白哲学
整页留白慷慨但**不靠 surface 对比制造节奏**——所有段背景同为纯黑，节奏完全靠纵向 padding 与 1px 描边塑造。这是一种"无 band 的节奏"——与 Claude 的"cream → dark → coral → dark footer"band 交替法、Cursor 的"奶油恒定 + 纵向 padding"都不同，skills.sh 是"纯黑恒定 + 1px 描边 + mono eyebrow 分段"。读起来像一份**长卷终端 man page**而非营销页。

## 高度与深度

| 层级 | 处理 | 用途 |
|---|---|---|
| 平面 | 无阴影、无描边、无背景差 | Section 背景、hero 文字区、顶部导航、footer |
| Hairline | 1px `{colors.border}` (#1c1c1c) | leaderboard 行底边、footer 顶边、搜索框下边、tab 下划线 active |
| Code block | `{colors.code-block-bg-alpha}` (rgba(28,28,28,0.8)) + 6px 圆角 | Hero 终端命令块 |
| Logo tile | 透明背景 + grayscale filter | Agent logo wall |
| Hover | filter: grayscale(0%) / color: foreground | Logo hover、链接 hover、tab hover |
| Sticky | position: sticky, top: 0 | 顶部导航 |

**高度哲学是"零阴影、零 elevation"**。整页主按钮、卡片、导航、footer 均无 box-shadow；深度由 1px hairline + 唯一一处半透深灰背景（命令块）共同制造。这是 Vercel 设计系统一贯的"flat-first"取向在 skills.sh 上的极致体现。

### 装饰性深度
- ASCII 艺术字 "SKILLS" 是整页唯一的"视觉装饰"——但它本质是**纯文本字符**，不是位图、不是 SVG、不是插画。
- 8 周活动 sparkline 是数据可视化，不是装饰——纯灰色描边，无渐变填充。
- Agent logo wall 的灰度处理本身构成一种"装饰性深度"——hover 时恢复彩色是整页唯一的色彩交互。
- 无手绘 line-art、无人物摄影、无 avatar 头像、无抽象品牌位图——客户背书用 logo wall，技能背书用安装量数字与 sparkline。

## 形状

### 圆角刻度

| Token | 值 | 用途 |
|---|---|---|
| `{rounded.none}` | 0px | 默认——所有 section、表格行、footer、导航 |
| `{rounded.sm}` | 4px | 复制按钮、小型图标按钮 |
| `{rounded.md}` | 6px | Hero 终端命令块 |
| `{rounded.lg}` | 8px | （预留，本页未使用） |
| `{rounded.pill}` | 9999px | （未使用——skills.sh 不做胶囊按钮） |

**整页形状语言是"方正优先"**。leaderboard 行、footer、section、搜索框均无圆角；唯一的圆角施加在 hero 终端命令块（6px）与复制按钮（4px）——两处都是"可交互小元件"。这与 Cursor 的"按钮全胶囊"截然相反：skills.sh **不做胶囊按钮**，因为整页几乎没有传统 CTA 按钮，主交互是搜索框 + tab + 表格行点击。

### 摄影与插画
skills.sh **不使用任何摄影与插画**。视觉主力是：
- **ASCII 艺术字**——hero 中央的 figlet 风格 "SKILLS" 块状字符。
- **Sparkline**——leaderboard 每行的 8 周安装活动迷你折线。
- **Grayscale logo wall**——18 个合作 agent 的灰度单色 logo。
- **数据本身**——技能名、仓库路径、安装量数字（"2.2M"、"595.5K"）。

无产品 mockup、无 IDE 模拟、无抽象品牌位图、无人物头像——这是一份**纯排版 + 纯数据**的目录页。

## 组件

### 顶部导航
**`top-nav`** — 固定顶部的纯黑导航条。56px 高（`{spacing.header-height}`），背景 `{colors.background}` (#000)，**无 border-bottom、无阴影、无 backdrop-blur**，与页面同色融合。布局：左侧 "Skills" wordmark（含小三角图标）+ 主菜单（Topics / Official / Audits / Docs），右侧导航项 `{typography.nav-link}` (Geist 14px / 400) 中灰色（`{colors.nav-link}` — #a1a1aa），hover 时升至 foreground。sticky 定位。

### ASCII 艺术字
**`ascii-wordmark`** — Hero 中央的 "SKILLS" 块状字符。Fira Mono，letter-spacing -1px，色 foreground。是整页唯一的"图像"主视觉，但本质是纯文本——可被屏幕阅读器读出（"S K I L L S" 字符画）。这是 skills.sh 最强的品牌签名：在一个 AI 产品页普遍用 3D 渲染 / 抽象波纹 / 渐变 mesh 做 hero 视觉的时代，它用 figlet 风格的 ASCII 字符画。

### Hero 命令块
**`terminal-code-block`** — Hero 左下的终端命令块。背景 `{colors.code-block-bg-alpha}` (rgba(28,28,28,0.8))，6px 圆角，max-w 348px，padding 12px × 16px。内容：`$ npx skills add <owner/repo>`，Geist Mono 14px。右侧附 `{component.copy-button}`——透明背景，28px 高，4px 圆角，灰度图标，hover 时升至 foreground。这是整页**唯一带圆角的容器**，也是唯一带非纯黑背景的容器。

### Eyebrow
**`eyebrow-md`** — 段头标签。Geist Mono 14px / 500 / uppercase，色 foreground。用于 "TRY IT NOW"、"AVAILABLE FOR THESE AGENTS"、"SKILLS LEADERBOARD"。**没有装饰容器、没有 pill、没有背景**——纯文字 + uppercase + mono 字族本身就是段头信号。

### 搜索框
**`search-input`** — Leaderboard 顶部搜索输入。透明背景，Geist Mono 14px，高 45px，padding 12px × 32px，placeholder 色 `{colors.muted-foreground-soft}` (#787878)。下方 1px `{colors.border}` 描边。右侧附 "/" 快捷键提示（mono）。**用 mono 字族而非 sans**——这是 skills.sh 的反直觉选择：搜索框是开发者工具，应该看起来像终端输入而非营销页搜索框。

### Tab
**`tab-active}` / `{tab-inactive}`** — Leaderboard 的 All Time / Trending / Hot 切换。Geist Mono 14px，无背景、无 pill 容器，**靠 2px 下划线区分状态**：active 为 `{colors.foreground}` 下划线 + foreground 文字，inactive 为透明下划线 + `{colors.nav-link}` 文字。这是与 Cursor 胶囊按钮、Claude 填充按钮都不同的第三种 tab 范式——**纯下划线 tab**，最接近 GitHub 仓库 tab 的视觉语言。

### 排行榜行
**`leaderboard-row`** — 排行榜单行。display: grid，16 列（`grid-cols-16`），gap 16px，padding 12px 0，高 45px，1px `{colors.border}` 底边描边。列分配：序号（#，mono 中灰） / 技能名（`{typography.skill-name}` 16px / 600，Geist）+ 仓库路径（mono 14px，muted） / 8W sparkline（SVG，灰度） / 安装量（"2.2M"，含六边形图标）。整行可点，hover 时背景不变（保持纯黑），靠描边与字号制造可读性。

### Sparkline
**`sparkline`** — 排行榜每行的 8 周安装活动迷你图。SVG，宽约 80–120px（按列宽自适应），描边 `{colors.muted-foreground}` 灰度，无填充、无渐变。是数据可视化而非装饰——告诉读者"这个技能的趋势是上升 / 下滑 / 稳定"。

### Agent logo wall
**`agent-logo-tile`** — 合作 agent logo 砖块。透明背景，`filter: grayscale(100%)` default，`hover: grayscale(0%)` 恢复品牌色，transition 300ms。每个 logo 包裹一个 `<a>` 链接到 `/agent/<name>` 分目录页。**灰度 default + 彩色 hover 是整页唯一的色彩交互**——把"色彩"作为"用户主动探索"的奖励，而非默认装饰。

### 复制按钮
**`copy-button`** — 终端命令块右侧的复制按钮。透明背景，`{colors.muted-foreground}` 灰度图标，28px 高，4px 圆角，padding 6px。hover 时升至 foreground。无填充、无描边——纯图标按钮。

### Footer
**`footer`** — 纯黑 footer，与画布同色（`{colors.background}` — #000），**不翻灰、不翻白**。1px `{colors.border}` 顶边分隔，padding 48px × 32px，max-w 1152px 居中。5 列链接网格：BROWSE / TOPICS / AGENTS / DOCS / PROJECT，列标题用 `{typography.eyebrow-sm}` (Geist Mono 12px / 400 / uppercase)，列内链接用 `{typography.body-sm}` (Geist 14px / 400) muted 色，hover 时升至 foreground。底部一行版权 + "Made with care by Vercel" + "Skills are open source on GitHub"——`{typography.body-xs}` (12px)，最弱化的辅助文本。

## Do 与 Don't

### Do
- 锚定在 `{colors.background}` (#000000) 纯黑画布上。整页色温恒定，不引入任何带蓝调的 dark slate、不引入任何 surface 提升档。
- 把"强调"留给**字重**（skill-name 600）与**字族切换**（eyebrow → Geist Mono uppercase），不要靠颜色强调。
- 所有 eyebrow 用 `{typography.eyebrow-md}` (Geist Mono 14px / 500 / uppercase)。这是品牌的"终端声线"签名。
- Hero 主视觉用 `{component.ascii-wordmark}`（Fira Mono，-1px 字距）——ASCII 艺术字是整页最强的视觉签名。
- 描边一律用 `{colors.border}` (#1c1c1c) 1px——只有一档 hairline，不要派生多档。
- 合作 logo 一律 grayscale default + hover 彩色。把色彩作为"用户主动探索"的奖励。
- Tab 用 `border-b-2` 下划线范式，不要做胶囊填充 tab。
- 搜索框用 Geist Mono 而非 Geist——搜索框是开发者工具，应该看起来像终端输入。
- 终端命令块用 6px 圆角 + rgba(28,28,28,0.8) 半透背景——是整页唯一允许的"非纯黑 + 圆角"组合。

### Don't
- 不要引入任何品牌色、强调色、CTA 色。skills.sh 是 achromatic 系统，色彩仅作为 logo hover 奖励出现。
- 不要做 64px / 48px / 36px 的衬线或无衬线 display 大字 hero。最大文本是 ASCII 艺术字 + mono eyebrow。
- 不要给按钮做胶囊圆角。整页形状语言是方正——胶囊会立刻破坏 skills.sh 的"终端 man page"感。
- 不要切换到浅色主题或提供浅色 / 深色切换器。skills.sh 是全程深色——这是开发者目录的声线。
- 不要给卡片 / 行 / 按钮加 box-shadow。深度靠 1px hairline + 唯一一处半透背景制造。
- 不要给 eyebrow 加 pill 容器、背景色、边框。eyebrow 的签名就是"纯文字 + uppercase + mono"。
- 不要在营销页引入位图插画、人物摄影、抽象品牌图。视觉主力是 ASCII 艺术字 + sparkline + grayscale logo wall + 数据本身。
- 不要把 footer 翻白或翻灰。footer 与画布同色 (#000)，仅靠 1px 顶边分隔。
- 不要用 Inter / system-ui 替代 Geist——Geist 是 Vercel 自家开源字体，是 skills.sh 的字体声线基底；替代会丢失 Vercel 的字形气质。

## 响应式行为

### 断点

| 名称 | 宽度 | 关键变化 |
|---|---|---|
| Mobile | < 640px (sm) | 容器 padding 收紧到 16px (px-4)；hero ASCII 艺术字横向 overflow-x scroll 或缩放；hero 非对称布局堆叠为单列；agent logo wall 横向滚动；leaderboard 部分列（sparkline、安装量）可能折叠或隐藏；footer 5 列折叠为竖排 |
| Tablet | 640–1024px (sm–lg) | 容器 padding 24px (px-6)；hero 维持非对称但比例压缩；logo wall 维持横排；leaderboard 维持完整列 |
| Desktop | 1024px+ (lg) | 容器 padding 32px (px-8)；hero `grid-cols-[auto_1fr]`，gap 56px；leaderboard 16 列网格完整展开；footer 5 列；容器 1152px |
| Wide | > 1280px (xl) | 同 desktop，两侧留白扩大；容器仍 cap 在 1152px |

### 触摸目标
- 排行榜单行高 45px（`{spacing.row-height}`），整行可点——略低于 WCAG 44 但接近，且桌面为主。
- 搜索框高 45px，触摸目标充足。
- 复制按钮 28px 高——**低于 WCAG 44**，仅用于桌面 hero 命令块内。
- Tab 链接高度由 padding 决定，约 36px，触摸目标边缘达标。
- Agent logo 砖块整面可点，触摸目标充足。

### 折叠策略
- 顶部导航在窄屏收紧 padding，主菜单项保持可见（仅 4 项）。
- Hero 的左 ASCII + 右描述非对称布局在移动端堆叠为单列：ASCII 艺术字在前，描述 + 命令块在后。
- Leaderboard 在窄屏可能隐藏 sparkline 列与部分辅助列，保留序号 + 技能名 + 安装量。
- Footer 5 列在移动端折叠为竖排或 2 列网格；底部版权与"Made with care by"保持一行或两行。
- ASCII 艺术字在窄屏允许横向滚动而非缩放字号——保持字符块的方正感。

### 图像行为
- ASCII 艺术字保持字符方块不变，窄屏允许横向滚动。
- Sparkline 在窄屏保持固定字号与笔触，按列宽自适应宽度。
- Agent logo 在所有断点保持 grayscale default + hover 彩色行为，砖块尺寸按断点缩放。

## 迭代指南

1. 一次只动一个组件，引用其 YAML key（`{component.leaderboard-row}`、`{component.terminal-code-block}`）。
2. 同一组件的变体（`tab-active` / `tab-inactive`、`eyebrow-md` / `eyebrow-sm`）作为 `components:` 下的独立条目，不合并。
3. 全文使用 `{token.refs}` 引用，不要内联 hex。
4. 不要记录 hover。仅记录 Default 与 Active/Pressed/Focused 状态。
5. 三字体分工不可破：Geist 是正文 / 标题 / 导航，Geist Mono 是 eyebrow / 代码 / 搜索 / tab / footer 标题，Fira Mono 仅用于 ASCII 艺术字。不要把 Fira Mono 用到第二处。
6. Achromatic 色板不可破：纯黑 + 灰度梯度 + 近白前景。不引入任何彩色 token。
7. 形状循环不可破：section / 行 / footer / 导航 0 圆角，命令块 6px，复制按钮 4px。不要把按钮做成胶囊。
8. 当犹豫"如何强调"时：先切到 Geist Mono + uppercase（变成 eyebrow），或加字重到 600，**绝不引入颜色**。
9. 描边一律用 `{colors.border}` (#1c1c1c) 1px，不要派生第二档 hairline，不要引入独立灰色 hex。

## 已知缺口

- 浅色主题不存在——skills.sh 全程深色，无主题切换器。本文档仅记录深色（唯一）主题。
- 排行榜子页面（`/trending`、`/hot`、`/agent/<name>`、`/topic/<topic>`、`/<owner>/<repo>/<skill>`）的视觉风格未在此处完整提取——本文档以首页 `/` 为准。子页面大概率沿用同套 token，但技能详情页可能包含 README 渲染、安装命令多 tab、依赖图等专属组件。
- ASCII 艺术字在窄屏的具体缩放策略（横向滚动 vs 字号缩放 vs 隐藏）需要进入移动端断点实测，本文档基于桌面断点（1200×736）提取。
- 排行榜行的 hover / active 态视觉（是否升背景、是否升描边、是否高亮 sparkline）需要进入交互态实测，本文档仅记录 default 态。
- 表单验证状态（搜索空结果、无匹配技能）的视觉表现未在 scope 内。
- "Docs" / "About" / "Contact" / "Privacy" / "Terms" 等内容页的版式可能引入长文阅读组件（h1 / h2 / 段落 / 代码块 / 列表），未在本文档 scope。
- skills.sh 后端 CLI（`npx skills`）的实际输出与配色不在本营销面文档 scope。
- Geist / Geist Mono / Fira Mono 均为开源字体，无专有缺口；但 Vercel Geist 的字形细节（特别是数字 0/O 区分、1/I/l 区分、连字行为）在不同 fallback 字体下会有差异。
