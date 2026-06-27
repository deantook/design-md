---
version: alpha
tags:
  - 开发者
  - AI 编程
  - 产品页
  - 暖色调
  - 编辑型
  - 浅色主题
  - 胶囊按钮
  - 工程美学
name: Cursor-design-analysis
description: 一个以"暖奶油画布 + 墨黑按钮 + 电光橙"为三原色的编辑型 AI 编程工具落地页。系统以带暖调的米色画布为底，配深暖墨色文本与近黑按钮；品牌电压来自一抹电光橙（#f54e00），仅用于强调链接、focus 环、产品 chrome 中的活动指示，刻意稀缺。字体声线全程使用单一人文无衬线体 "CursorGothic"——h1、h2、h3 与正文、按钮、导航共用同族，weight 几乎全为 400，靠负字距与字号节奏而非粗细制造层级；代码区使用 "berkeleyMono"。按钮一律为胶囊形（pill），与 Anthropic 的 8px 圆角形成鲜明对比。整体不切换到深色 surface：连 IDE/产品 mockup 都以"product-chrome"奶油色 (#f2f1ed) 渲染，footer 也保持奶油色，整页几乎无深色 band。

colors:
  primary: "#26251e"
  primary-on: "#f7f7f4"
  accent: "#f54e00"
  ink: "#26251e"
  body: "#26251e"
  body-soft: "color-mix(in oklab, #26251e 60%, transparent)"
  muted: "color-mix(in oklab, #26251e 60%, transparent)"
  hairline-01: "color-mix(in oklab, #26251e 2.5%, transparent)"
  hairline-02: "color-mix(in oklab, #26251e 10%, transparent)"
  hairline-02-5: "color-mix(in oklab, #26251e 20%, transparent)"
  hairline-03: "color-mix(in oklab, #26251e 60%, transparent)"
  canvas: "#f7f7f4"
  surface-card: "#f2f1ed"
  surface-card-hover: "#ebeae5"
  surface-button-secondary: "#e6e5e0"
  surface-product-chrome: "#f2f1ed"
  on-dark: "#f7f7f4"
  success: "#1f8a65"
  error: "#cf2d56"
  warning: "#f54e00"
  timeline-thinking: "#dfa88f"
  timeline-grep: "#9fc9a2"
  timeline-read: "#9fbbe0"
  timeline-edit: "#c0a8dd"

typography:
  display-md-lg:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, Helvetica Neue, sans-serif"
    fontSize: 26px
    fontWeight: 400
    lineHeight: 32.5px
    letterSpacing: -0.325px
  display-md:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 28.6px
    letterSpacing: -0.11px
  display-sm:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 31px
    letterSpacing: 0
  eyebrow:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
    letterSpacing: 0.14px
  body-md:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0
  body-sm:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 21px
    letterSpacing: 0
  button:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 14px
    letterSpacing: 0
  button-sm:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 14px
    letterSpacing: 0
  nav-link:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0
  tertiary-link:
    fontFamily: "CursorGothic, CursorGothic Fallback, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: 0
  code:
    fontFamily: "berkeleyMono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 4px
  md: 8px
  lg: 8px
  xl: 12px
  pill: 9999px
  full: 9999px

spacing:
  g0_25: 2.5px
  g0_5: 5px
  g1: 10px
  g1_5: 15px
  g2: 20px
  g3: 30px
  v1: 22.4px
  v2: 44.8px
  v3: 67.2px
  section-top: 112px
  section-bottom: 67.2px
  header-height: 52px
  container-max: 1300px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-on}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12.48px 21.6px 12.8px
    height: 43px
    border: 1px solid {colors.primary}
  button-primary-sm:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-on}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.pill}"
    padding: 5.6px 10.5px 5.88px
    height: 27px
  button-secondary:
    backgroundColor: "{colors.surface-button-secondary}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12.48px 21.6px 12.8px
    height: 43px
    border: 1px solid {colors.hairline-01}
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.pill}"
    padding: 5.6px 10.5px 5.88px
    border: 1px solid {colors.hairline-02-5}
  button-tertiary:
    backgroundColor: transparent
    textColor: "{colors.accent}"
    typography: "{typography.tertiary-link}"
    padding: 0
  text-link-accent:
    backgroundColor: transparent
    textColor: "{colors.accent}"
    typography: "{typography.body-md}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 52px
  hero-section:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md-lg}"
    padding: 112px 20px 67.2px
  hero-demo-card:
    backgroundColor: "{colors.surface-product-chrome}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
  product-mockup-card:
    backgroundColor: "{colors.surface-product-chrome}"
    textColor: "{colors.ink}"
    rounded: 10px
  card-border:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    border: 1px solid {colors.hairline-02}
    rounded: "{rounded.xs}"
  logo-tile:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    border: 1px solid {colors.hairline-02}
    rounded: "{rounded.xs}"
    height: 96px
  footer:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: 67.2px 20px 30px
  badge-ansi:
    backgroundColor: transparent
    textColor: "{colors.accent}"
    typography: "{typography.body-sm}"
---

## 概览

Cursor.com 是一份克制、安静的 AI 编程工具落地页——它刻意走向 Anthropic Claude 的反面。基底氛围是带暖调的**奶油米色画布**（`{colors.canvas}` — #f7f7f4），比纯白更柔和，但比 Claude 的 #faf9f5 更"灰"一些、更"工业"一些。文本与按钮主体使用**暖墨黑**（`{colors.ink}` — #26251e）——一种带橄榄暖调的近黑，而非中性石墨灰。品牌电压全部压在一抹**电光橙**（`{colors.accent}` — #f54e00）：高饱和、近乎警示色的橙，仅出现在"了解 →"这类三级链接、focus 环、活动指示点和 IDE 模拟中的关键交互点上，刻意稀缺。

字体声线与 Claude 的"衬线 display + 无衬线 body"双轨制截然不同——Cursor **全程使用单一人文无衬线体 "CursorGothic"**，h1、h2、h3、正文、按钮、导航共用同族；weight 几乎全为 400，连主标题也不加粗。层级靠**负字距**（h1: -0.325px、h3: -0.11px）与**字号节奏**而非粗细制造。整体字号偏小——hero h1 在桌面仅 26px，是同类 AI 产品页里最克制的。代码区使用 **berkeleyMono** 等宽体。

整页**几乎没有深色 surface 的明暗交替节奏**——这是与 Claude 最显著的差异之一。IDE 模拟、产品 chrome、Slack/CLI demo 卡片一律以"product-chrome"奶油色（`{colors.surface-product-chrome}` — #f2f1ed）渲染，模拟 Cursor IDE 的浅色主题；footer 也保持奶油色而非翻黑。深色只出现在两处极小面积：主按钮（墨黑填充）和按钮内的图标/箭头。整页是"奶油 + 墨黑 + 橙"三色循环，不引入第四种 surface tone。

**关键特征：**
- 暖奶油画布（`{colors.canvas}` — #f7f7f4）配暖墨黑文本（`{colors.ink}` — #26251e）。整体明度高、对比克制，没有 Claude 那种 cream/ink 的强对比张力。
- 主按钮是**墨黑填充 + 奶油文字**（`{colors.ink}` / `{colors.primary-on}`），而非品牌色填充。这是 Cursor 的反直觉选择——品牌橙不担任 CTA 背景。
- 电光橙（`{colors.accent}` — #f54e00）只用于三级链接、focus 环、活动状态、IDE 内部高亮。零处用作大面积填充。
- 单一字体族 CursorGothic，weight 几乎全为 400。无衬线 display、无粗体——靠负字距与字号梯度建立层级。
- 按钮**全部为胶囊形**（`{rounded.pill}` — 9999px），从主 CTA 到导航小按钮无一例外。与 Claude 的 8px 圆角形成鲜明对比，是 Cursor 最强的形状签名。
- 产品 mockup / IDE 模拟全部以浅色 product-chrome 渲染，连代码窗口都不是深色——与 Claude 的"深色 code-window card"惯例相反。
- footer 保持奶油色（`{colors.surface-card}` — #f2f1ed），不翻黑，整页色温恒定。
- 容器最大宽度 1300px（`{spacing.container-max}`），section 上下 padding 为 112px / 67.2px（`{spacing.section-top}` / `{spacing.section-bottom}`），垂直韵律来自 1.4rem 倍数体系（v1=22.4px、v2=44.8px、v3=67.2px）。
- 顶部导航固定 52px 高（`{spacing.header-height}`），居中布局，奶油背景透明边、无 hairline、无阴影。

## 颜色

### 品牌与强调
- **墨黑 / Primary**（`{colors.primary}` — #26251e）：暖墨色，近乎带橄榄暖调的近黑。用于主按钮背景、主按钮边框、所有正文与标题文本。是系统里唯一的"深色"。
- **画布白 / Primary On**（`{colors.primary-on}` — #f7f7f4）：与画布同色的"奶油白"，用于主按钮上的文字与图标，呼应整页色温。
- **电光橙 / Accent**（`{colors.accent}` — #f54e00）：品牌电压所在。高饱和、近乎警示橙。只用于三级文字链接（"了解 →"）、focus 环、IDE 模拟里的活动指示、品牌活动徽标。零处用作大面积填充，零处用作 CTA 背景——这是 Cursor 与大多数 AI 品牌（OpenAI 绿、Claude 珊瑚、GitHub 紫）最大的反差。
- **二级按钮面 / Surface Button Secondary**（`{colors.surface-button-secondary}` — #e6e5e0）：比 card 再深一档的奶油灰，用于次要按钮填充。

### Surface
- **Canvas**（`{colors.canvas}` — #f7f7f4）：默认页面底色。带暖调的米白，比纯白柔和，比 Claude 的 #faf9f5 略灰。
- **Surface Card**（`{colors.surface-card}` — #f2f1ed）：比画布深一档的奶油色。用于 footer 背景、logo 砖块、IDE 模拟外框、Slack/CLI demo 卡片。
- **Surface Card Hover**（`{colors.surface-card-hover}` — #ebeae5）：再深一档，用于卡片 hover 与按下态。
- **Surface Product Chrome**（`{colors.surface-product-chrome}` — #f2f1ed）：与 card 同色的"产品 chrome"色，专门承载 IDE/模拟产品 UI——刻意保持浅色，不切换到深色 IDE 主题。
- **没有深色 surface band。** 整页明度恒定。

### 描边 / Hairline
Cursor 的描边体系完全基于 **oklab 色彩混合**——以墨黑 #26251e 为基底，按透明度百分比派生出 4 档 hairline，而非独立的灰色 hex：
- **Hairline 01**（`{colors.hairline-01}` — oklab #26251e 2.5%）：极淡描边，用于二级按钮边框。
- **Hairline 02**（`{colors.hairline-02}` — oklab #26251e 10%）：标准 1px 卡片边框、输入框边。
- **Hairline 02-5**（`{colors.hairline-02-5}` — oklab #26251e 20%）：ghost 按钮边框、稍强的分隔。
- **Hairline 03**（`{colors.hairline-03}` — oklab #26251e 60%）：强调分隔线、info 色。

这套体系意味着所有"灰"都从主墨色派生——色温自动与画布对齐，永远不会出现冷调灰。

### 文本
- **Ink**（`{colors.ink}` — #26251e）：所有标题与正文。暖墨黑，比纯黑 (#000) 暖、比 #1a1a1a 略带橄榄绿。
- **Body Soft / Muted**（`{colors.body-soft}` — oklab #26251e 60%）：副文本、breadcrumb、footer 二级链接。同样是墨黑派生而非独立灰。
- 整页**没有冷调灰文本**——所有 muted 状态都是 ink + 透明度。

### 语义色
- **Success**（`{colors.success}` — #1f8a65）：偏深的森林绿，用于状态点、"available"指示。背景态用 `color-mix 15%` 派生。
- **Error**（`colors.error}` — #cf2d56）：玫红/品红，用于错误状态。背景态用 `color-mix 15%` 派生。
- **Warning**（`{colors.warning}` — #f54e00）：复用品牌橙——这是橙色的第二处合规使用场景。

### IDE 模拟活动色（ANSI / Timeline）
- **Thinking**（`{colors.timeline-thinking}` — #dfa88f）：暖桃色，IDE 模拟里"思考"步骤标记。
- **Grep**（`{colors.timeline-grep}` — #9fc9a2）：柔绿，搜索步骤标记。
- **Read**（`{colors.timeline-read}` — #9fbbe0）：柔蓝，文件读取标记。
- **Edit**（`{colors.timeline-edit}` — #c0a8dd）：柔紫，编辑步骤标记。

这一组是 Cursor 独有的"产品过程可视化色板"——低饱和、互不冲突，专门用于在 IDE 模拟里区分 agent 的工具调用阶段，是品牌色之外的辅助光谱。

## 字体

### 字体族
系统**仅使用一个无衬线字体族 "CursorGothic"**（含 "CursorGothic Fallback" 与 system-ui 兜底），覆盖 h1 到 body 到按钮到导航的全部文本。代码区使用 **berkeleyMono**。没有衬线 display 字体——这是 Cursor 与 Claude 的根本分野：Claude 用 Copernicus 衬线制造"文学/编辑"声线，Cursor 用单一无衬线制造"工程/工具"声线。

- CursorGothic（人文无衬线，weight 400 为主）→ 所有文本
- berkeleyMono（等宽）→ 代码块、终端、命令行片段
- fallback：`CursorGothic Fallback, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif`

### 层级

| Token | 字号 | 字重 | 行高 | 字距 | 用途 |
|---|---|---|---|---|---|
| `{typography.display-md-lg}` | 26px | 400 | 32.5px | -0.325px | Hero h1（"Cursor 是您的编程智能体…"）— CursorGothic |
| `{typography.display-md}` | 22px | 400 | 28.6px | -0.11px | Feature 卡 h3、节标题 — CursorGothic |
| `{typography.display-sm}` | 20px | 700 | 31px | 0 | IDE 模拟内部标题（如 "Mission Control Interface"）— system-ui |
| `{typography.eyebrow}` | 14px | 400 | 21px | 0.14px | 小型 h2 eyebrow（"每天都深受…团队信赖"）— 正字距 |
| `{typography.body-md}` | 16px | 400 | 24px | 0 | 默认正文 — CursorGothic |
| `{typography.body-sm}` | 14px | 400 | 21px | 0 | 副文本、footer 文本 |
| `{typography.button}` | 16px | 400 | 14px | 0 | 主按钮标签（hero 内） |
| `{typography.button-sm}` | 14px | 400 | 14px | 0 | 导航内小按钮 |
| `{typography.nav-link}` | 16px | 400 | 24px | 0 | 顶部导航菜单项 |
| `{typography.tertiary-link}` | 16px | 400 | 24px | 0 | 三级橙色文字链接（"了解 →"） |
| `{typography.code}` | 14px | 400 | 1.6 | 0 | 代码块 — berkeleyMono |

### 原则
Display 字号一律 **weight 400**，从不加粗（唯一的例外是 IDE 模拟内部 20px/700 的产品 chrome 标题，那是被展示的产品 UI 而非营销层文本）。负字距仅施加于 h1（-0.325px）和 h3（-0.11px），eyebrow 反向使用 +0.14px 正字距制造"标签感"。整页字级显著小于同类产品——hero h1 仅 26px，远低于 Claude 的 64px。这是 Cursor 的克制姿态：让"产品模拟"成为视觉主角，让文字退到支撑位。

### 字体替代说明
CursorGothic 是 Anysphere 的专有字体，未公开提供。最接近的开放替代是 **Inter**（人文无衬线、屏幕阅读优化）或 **Geist Sans**（Vercel 出品，字形气质更接近 CursorGothic 的窄体人文感）。若需更工程化的替代，**IBM Plex Sans** 也可。berkeleyMono 同样为专有；开放替代首选 **JetBrains Mono** 或 **Geist Mono**。

## 布局

### 间距体系
Cursor 的间距体系是**两套并行**的：
- **横向 g 系**（基于 10rem / 16 = 0.625rem = 10px 基底）：`g0.25` 2.5px · `g0.5` 5px · `g1` 10px · `g1.5` 15px · `g2` 20px · `g3` 30px。用于横向页边距（`px-g2` = 20px）、组件内边距、网格列间距。
- **纵向 v 系**（基于 1rem × 1.4 倍数）：`v1` 22.4px · `v2` 44.8px · `v3` 67.2px。用于段落纵向韵律、组件纵向间距。
- **Section padding**：顶部 112px、底部 67.2px（`{spacing.section-top}` / `{spacing.section-bottom}`）。比 Claude 的统一 96px 更不对称、更"开篇感"。

### 网格与容器
- **容器最大宽度**：1300px 居中（`{spacing.container-max}`），比 Claude 的 1200px 略宽。
- **Hero**：左文 + 右产品模拟的非对称布局，文字列窄、模拟列宽。
- **Logo wall**：8 个客户 logo 横向排列（Stripe / OpenAI / Linear / Datadog / Nvidia / Figma / Ramp / Adobe），单 logo 砖块约 134×96px。
- **Feature 段**：单列大段叙事 + 右侧 IDE 模拟，非 3-up 卡片网格——Cursor 几乎不用传统的 3-up feature card grid，而是用"段落 + 模拟"的编辑式横向段。
- **Footer**：5 列链接（产品 / 资源 / 公司 / 法律 / 连接），桌面 4–5 列，移动折叠为单列。

### 留白哲学
整页留白极其慷慨但**不靠 surface 对比制造节奏**——所有段背景同为奶油色，节奏完全靠纵向 padding 与段内子元素的 v1/v2/v3 间距塑造。这是一种"无 band 的节奏"——与 Claude 的"cream → dark → coral → dark footer"band 交替法完全相反。读起来像一份长卷工程文档而非营销页。

## 高度与深度

| 层级 | 处理 | 用途 |
|---|---|---|
| 平面 | 无阴影、无描边 | Section 背景、hero 文字区、顶部导航 |
| Soft hairline | 1px `{colors.hairline-02}` (oklab 10% ink) | 卡片边框、输入框、二级按钮边 |
| Cream card | `{colors.surface-card}` 背景 + hairline 边 | Logo 砖块、demo 卡外框 |
| Product chrome card | `{colors.surface-product-chrome}` 背景，10px 圆角 | IDE 模拟、CLI/Slack demo |
| Ghost 按钮 | 透明背景 + `{colors.hairline-02-5}` (20% ink) 边 | 导航中的"联系销售" |
| Hover | 背景下沉到 `{colors.surface-card-hover}` | 卡片 hover、按钮 hover |

**高度哲学是"描边优先、阴影几乎不用"**。整页主按钮、卡片、导航均无 box-shadow；深度由 hairline 描边 + surface 色差共同制造。过渡时长 `{duration}` = 0.14s，所有 hover/focus 切换都极快、克制。

### 装饰性深度
- IDE 模拟内部自带产品 chrome 层级：活动指示点（橙）、工具调用 timeline 色块（thinking/grep/read/edit 四色）、agent 输入框、模型选择器下拉——这些是模拟出来的产品 UI，而非营销插画。
- Hero 段的右侧"interactive demo"是一个真实可交互的 Cursor 界面演示，背景为"subtle solid brand background"——纯色 brand-tinted 底，无渐变、无 mesh、无插画。
- "Abstract waves background"图（`https://cursor.com/marketing-static/.../internal-brand-023-...jpg`）出现在 Tab 段，是一张抽象波纹品牌图，是整页少数的位图插画。
- 无手绘 line-art、无人物摄影、无 avatar 头像——客户背书用 logo wall，专家背书用纯文字引用块（带左右引号"），不配头像。

## 形状

### 圆角刻度

| Token | 值 | 用途 |
|---|---|---|
| `{rounded.xs}` | 4px | Logo 砖块、小型徽标、IDE 模拟内的小元件 |
| `{rounded.sm}` | 4px | 同 xs，基本同档 |
| `{rounded.md}` | 8px | 输入框、辅助元素 |
| `{rounded.lg}` | 8px | 内容卡（与 md 同值，体系很扁平） |
| `{rounded.xl}` | 12px | Hero demo 卡、Slack/CLI demo 外框 |
| `{rounded.pill}` | 9999px | **所有按钮**——主、次、ghost、sm 全部胶囊形 |
| `{rounded.full}` | 9999px | 图标按钮、圆形元素 |

**胶囊按钮是 Cursor 最强的形状签名**。在一个 AI 产品页普遍使用 6–10px 圆角按钮的时代，Cursor 把所有 CTA 做成完全胶囊——主按钮（墨黑胶囊）、二级按钮（奶油胶囊）、ghost 按钮（描边胶囊）、导航下载按钮（墨黑胶囊）。这是品牌在"形状"维度上唯一的高调声明。

产品 chrome 卡片用 10px（`rounded-[10px]`），demo 外框用 12px，logo 砖块用 4px——三档分明，但全部远小于 pill。整页形状语言是"卡片方正、按钮极圆"的强对比。

### 摄影与插画
Cursor 的 hero **从不使用摄影**。视觉主力是：
- **可交互 IDE 模拟**——真实渲染的 Cursor Desktop / CLI / Slack 集成界面，浅色 product-chrome 主题，带活动数据（"This Week / This Month"任务列表、agent 工作时长、screen recording 缩略图等）。
- **品牌抽象位图**——少量 `internal-brand-XXX.jpg` 抽象波纹图，作为段背景。
- **客户 logo wall**——8 个灰度单色 logo。
- **纯文字引用块**——专家背书不带头像，仅大引号 + 正文 + 署名。

## 组件

### 顶部导航
**`top-nav`** — 固定顶部的奶油色导航条。52px 高（`{spacing.header-height}`），背景 `{colors.canvas}`，无 hairline、无阴影、与页面同色融合。布局：左侧 "Cursor" wordmark + 主菜单（产品 / 企业 / 定价 / 资源，部分带可展开 caret），居中对齐，右侧"登录"（ghost 按钮）、"联系销售"（ghost 按钮）、"下载"（`{component.button-primary-sm}` 墨黑胶囊）。菜单项 `{typography.nav-link}` (CursorGothic 16px / 400)。

### 按钮

**`button-primary`** — 主 CTA。背景 `{colors.ink}` (#26251e)，文字 `{colors.primary-on}` (#f7f7f4)，type `{typography.button}` (CursorGothic 16px / 400)，padding 12.48px × 21.6px，高 43px，**圆角 pill** (9999px)，1px ink 边框。用于 hero "下载 macOS 版本"、footer "下载" 等。整页主 CTA 用墨黑而非品牌橙——这是 Cursor 反直觉的品牌选择。

**`button-primary-sm`** — 导航内紧凑版。高 27px，padding 5.6 × 10.5px，字号 14px。用于导航"下载"。

**`button-secondary`** — 次要 CTA。背景 `{colors.surface-button-secondary}` (#e6e5e0)，文字 ink，1px `{colors.hairline-01}` 描边，pill 圆角。用于 hero "申请演示"。

**`button-ghost`** — 描边胶囊按钮。透明背景，1px `{colors.hairline-02-5}` (20% ink) 边，pill 圆角。用于导航"联系销售"等。

**`button-tertiary`** — 三级文字链接。**无背景、无边框、无 padding**，文字 `{colors.accent}` (#f54e00) 橙色，跟随箭头"→"或"↗"。用于"了解云端智能体 →"、"了解模型 ↗"、"了解代码库索引 ↗"等。这是品牌橙的主要出场方式——纯文字、纯色彩、零容器。

**`text-link-accent`** — 正文内嵌链接，橙色，下划线 press 态。

### 卡片与容器

**`hero-section`** — Hero 段。奶油背景，左文 + 右交互模拟非对称布局。padding 112px × 20px × 67.2px。h1 用 `{typography.display-md-lg}` (26px)，下方两枚主按钮（墨黑 + 奶油二级）并排。

**`hero-demo-card`** — Hero 右侧的交互演示容器。`{colors.surface-product-chrome}` 背景，`{rounded.xl}` (12px) 圆角，承载真实的 Cursor Desktop 界面模拟。

**`product-mockup-card`** — Feature 段右侧的 IDE/产品模拟卡。`{colors.surface-product-chrome}` 背景，10px 圆角，内部渲染 Cursor IDE 浅色主题 chrome（文件树、agent 对话、工具调用 timeline、模型选择器）。

**`card-border`** — 带 hairline 描边的奶油卡。`{colors.surface-card}` 背景 + 1px `{colors.hairline-02}` 边，`{rounded.xs}` (4px) 圆角。用于 demo 内部的子面板、设置卡等。

**`logo-tile`** — 客户 logo 砖块。`{colors.surface-card}` 背景，1px `{colors.hairline-02}` 边，`{rounded.xs}` (4px)，高 96px，宽约 134px，居中放置灰度单色 logo。

### 输入与表单
- 标准输入框：`{colors.canvas}` 背景，1px `{colors.hairline-02}` 边，`{rounded.md}` (8px) 圆角，高 40px。focus 态边框转 `{colors.accent}` 橙 + 3px 橙色 15% alpha 外环。
- 模拟内的 agent 输入框（"Add a follow up..."）使用 product-chrome 体系，10px 圆角，底部嵌 agent 模型选择器与发送按钮。

### 标签 / 徽标
- **badge-ansi**：小型橙色文字标签，用于"NEW"、"BETA"、活动状态点。无 pill 容器，纯色文字 + 偶尔的小圆点。
- 客户 logo wall 的 logo 一律灰度单色处理，hover 时可能恢复品牌色。

### CTA 与 Footer
- **无独立 cta-band 组件**——Cursor 不做 Claude 那种"pre-footer 大色块 CTA band"。结尾的"立即试用 Cursor。"是纯文字 h2 + 两枚按钮，背景仍是奶油，无 coral/dark band。
- **`footer`** — 奶油色 footer（`{colors.surface-card}` — #f2f1ed），**不翻黑**。5 列链接（产品 / 资源 / 公司 / 法律 / 连接），底部一行版权 + SOC 2 认证徽标 + 主题切换按钮组（系统 / 浅色 / 深色）+ 语言切换。padding 67.2px × 20px × 30px。

## Do 与 Don't

### Do
- 每页锚定在 `{colors.canvas}` (#f7f7f4) 奶油画布上。整页色温恒定，不引入冷白也不引入深色 band。
- 主 CTA 一律用墨黑 (`{colors.ink}`) 填充 + 奶油文字。这是 Cursor 的反直觉签名——品牌色不担任 CTA。
- 所有按钮使用 `{rounded.pill}` (9999px) 胶囊形。这是品牌最强的形状声明。
- 把品牌橙 (`{colors.accent}` — #f54e00) 保留给三级文字链接、focus 环、活动状态、IDE 内部高亮。零处用作大面积填充。
- 用 `{component.product-mockup-card}` 直接渲染 Cursor IDE 浅色 chrome，而非画抽象插画。让产品模拟成为视觉主角。
- 所有 hairline 用 `color-mix(in oklab, #26251e X%, transparent)` 派生，确保描边色温与画布自动对齐。
- 全程使用 CursorGothic 单一字体族，weight 400 为主，靠负字距与字号梯度建立层级。
- Hero h1 保持 26px 量级——克制是品牌声线的一部分。

### Don't
- 不要把品牌橙用作 CTA 背景、用作大面积填充、用作按钮色。橙色是稀缺强调，不是 CTA 色。
- 不要引入深色 surface band 制造节奏（不要做 cream → dark → cream 的交替）。Cursor 的节奏靠纵向 padding 塑造，不靠明暗对比。
- 不要把 footer 翻黑。footer 与画布同色温，仅用 `{colors.surface-card}` 一档深。
- 不要使用衬线 display 字体。Cursor 是工程声线，不是文学声线。
- 不要给 display 标题加粗。weight 400 是不可破的规则。
- 不要把按钮做成 8px 圆角。胶囊是品牌形状签名，降到 8px 立刻失去 Cursor 感。
- 不要在营销页引入第二种品牌色（不要紫色段、不要绿色 CTA）。三色循环：奶油 + 墨黑 + 橙。
- 不要给卡片加 box-shadow。深度靠 hairline + surface 色差制造。
- 不要做 hero 大字 64px display。Cursor 的 26px h1 是刻意的克制——不要把它"修正"为 SaaS 默认尺寸。

## 响应式行为

### 断点

| 名称 | 宽度 | 关键变化 |
|---|---|---|
| Mobile | < 768px | 顶部导航折叠（部分菜单收起）；hero 模拟列堆叠到文字下方；logo wall 2-up 或横向滚动；footer 5 列折叠为单列；hero h1 字号进一步收敛 |
| Tablet | 768–1024px | 导航收紧但保留主菜单；hero 维持非对称但比例压缩；logo wall 4-up |
| Desktop | 1024–1440px | 完整导航 + 居中主菜单；hero 左文右模拟；logo wall 8-up；footer 5 列；容器 1300px |
| Wide | > 1440px | 同 desktop，两侧留白扩大；容器仍 cap 在 1300px |

### 触摸目标
- `{component.button-primary}` 高 43px，宽随文字长度而变（"下载 macOS 版本"约 187×43px），远超 WCAG 44。
- `{component.button-primary-sm}` 高 27px——**低于 WCAG 44**，仅用于桌面导航内（`max-sm:hidden` / `hidden lg:inline-flex`），不在触摸屏出现。
- Logo 砖块整面可点，约 134×96px。
- IDE 模拟内的交互元素为视觉演示，不要求触摸目标。

### 折叠策略
- 顶部导航在窄屏折叠部分菜单项为可展开 caret；"联系销售"在 < lg 时隐藏（`hidden lg:inline-flex`）；"下载"在 max-sm 时隐藏（`max-sm:hidden`）。
- Hero 的左文 + 右模拟非对称布局在移动端堆叠为单列：h1 + 副文 + 按钮组在前，模拟演示在后。
- Footer 5 列在移动端折叠为单列竖排；底部版权 + 主题切换 + 语言切换保持一行或两行。
- IDE 模拟在窄屏保留可读性，允许内部横向滚动而非缩放字号。

### 图像行为
- IDE 模拟内部代码与 UI 文本保持固定字号，窄屏允许内部横向滚动。
- 品牌抽象位图（"Abstract waves"）按比例缩放，作为段背景时 cover 裁切。
- 客户 logo 在所有断点保持灰度单色，砖块尺寸按断点缩放。

## 迭代指南

1. 一次只动一个组件，引用其 YAML key（`{component.button-primary}`、`{component.product-mockup-card}`）。
2. 同一组件的变体（`-sm`、`-secondary`、`-ghost`、`-tertiary`）作为 `components:` 下的独立条目，不合并。
3. 全文使用 `{token.refs}` 引用，不要内联 hex。
4. 不要记录 hover。仅记录 Default 与 Active/Pressed/Focused 状态。
5. 字体族不可拆：display 与 body 共用 CursorGothic，weight 400 为主。这是不可破的品牌声线规则。
6. 三色循环不可破：奶油 + 墨黑 + 橙。不引入第四种 surface tone。
7. 形状循环不可破：卡片 4/8/10/12px 方正，按钮一律 pill。不要把按钮降到 8px。
8. 当犹豫"如何强调"时：先放大字号或加负字距，绝不加粗 weight。
9. 描边一律用 `color-mix(in oklab, #26251e X%, transparent)` 派生，不要引入独立灰色 hex。

## 已知缺口

- CursorGothic 与 berkeleyMono 均为 Anysphere 专有字体，未公开提供。开放替代（Inter / Geist Sans / JetBrains Mono / Geist Mono）已记录在字体章节，但字形细节（特别是 CursorGothic 的窄体人文感与 berkeleyMono 的工程感）无法完全复刻。
- 深色主题（页面右下角提供"系统 / 浅色 / 深色"切换）的完整 token 集未在此处提取——本文档仅记录浅色主题（默认）。深色主题会反转 canvas 与 ink，但品牌橙与胶囊按钮规则保持不变。
- 过渡与动画时长（IDE 模拟的 agent 工作回放、screen recording 缩略图、模型选择器下拉动画、tab 切换）未在 scope 内。
- 表单验证状态（error / success 输入框样式）需要进入 sign-up 流程才能确认，本文档仅记录 focus 态。
- "应用市场 ↗"、"论坛 ↗"、"Anysphere ↗" 等外链目标的视觉风格不在本文档 scope。
- "未来"（/future）页面与品牌素材页（/brand）可能包含更实验性的视觉语言，本文档以首页 / 产品页 / 定价页为准。
- Cursor 实际产品界面（Cursor Desktop IDE）共享部分 token（product-chrome、berkeleyMono、橙色 accent）但包含大量产品专属组件（编辑器、命令面板、chat 面板、agent 控件、diff 视图），不在本营销面文档 scope。
