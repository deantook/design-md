---
version: alpha
name: <domain>-design-analysis
description: <一段 2–5 句的密集描述：画布色调、品牌电压所在、字体声线、签名形状、与同类 SaaS 默认值的关键反差。中文，参考 cursor.com.design.zh.md 的 description 写法。>

colors:
  primary: "#XXXXXX"
  primary-on: "#XXXXXX"
  accent: "#XXXXXX"
  ink: "#XXXXXX"
  body: "#XXXXXX"
  body-soft: "#XXXXXX"
  muted: "#XXXXXX"
  hairline: "#XXXXXX"
  canvas: "#XXXXXX"
  surface-card: "#XXXXXX"
  surface-dark: "#XXXXXX"
  on-primary: "#XXXXXX"
  on-dark: "#XXXXXX"
  success: "#XXXXXX"
  warning: "#XXXXXX"
  error: "#XXXXXX"

typography:
  display-xl:
    fontFamily: '"<Font>, <Fallback>, serif"'
    fontSize: 64px
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -1.5px
  display-md:
    fontFamily: '"<Font>, <Fallback>, serif"'
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.5px
  title-md:
    fontFamily: '"<Font>, <Fallback>, sans-serif"'
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: '"<Font>, <Fallback>, sans-serif"'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: '"<Font>, <Fallback>, sans-serif"'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  eyebrow:
    fontFamily: '"<Font>, <Fallback>, sans-serif"'
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  button:
    fontFamily: '"<Font>, <Fallback>, sans-serif"'
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: '"<Font>, <Fallback>, sans-serif"'
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  code:
    fontFamily: '"<Mono>, ui-monospace, monospace"'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
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
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 20px
    height: 40px
    border: 1px solid {colors.hairline}
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
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  footer:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    padding: 64px
---

## 概览

<2–4 段密集分析。第一段：基底氛围、画布色调、品牌电压所在、字体声线。第二段：与同类产品（Claude/Cursor/skills.sh 等）的关键反差。第三段：surface 节奏、留白哲学、签名形状。参考 cursor.com.design.zh.md 的"概览"密度。>

**关键特征：**
- <画布色 + ink 色，明度对比关系>
- <主 CTA 用什么色——品牌色还是墨黑？品牌色出现在哪里？>
- <字体族与字重策略——单一字体还是双轨制？display 是否加粗？>
- <签名形状——按钮圆角、卡片圆角、形状语言>
- <产品 mockup / 插画 / 摄影策略>
- <容器宽度、section padding、纵向韵律>
- <footer 处理——同色 / 翻黑 / 翻品牌色>

## 颜色

### 品牌与强调
- **Primary**（`{colors.primary}` — #XXXXXX）：<用在何处， scarcity 程度>
- **Accent**（`{colors.accent}` — #XXXXXX）：<第二强调色，是否独立存在>
- <其他品牌色变体——active / disabled>

### Surface
- **Canvas**（`{colors.canvas}` — #XXXXXX）：<默认页面底色，色温描述>
- **Surface Card**（`{colors.surface-card}` — #XXXXXX）：<卡片背景，与画布的明度差>
- **Surface Dark**（`{colors.surface-dark}` — #XXXXXX）：<深色 surface 是否存在，用于何处>
- <整页是否有深色 band 交替节奏>

### 描边 / Hairline
<描边体系——独立灰色 hex 还是 oklab 派生？分几档？参考 cursor 的 oklab 派生或 claude 的独立 hairline hex。>
- **Hairline**（`{colors.hairline}` — #XXXXXX）：<用途>

### 文本
- **Ink**（`{colors.ink}` — #XXXXXX）：<主文本，色温描述>
- **Body**（`{colors.body}` — #XXXXXX）：<正文色，是否与 ink 同色或更浅>
- **Muted**（`{colors.muted}` — #XXXXXX）：<副文本、breadcrumb>
- <整页是否有冷调灰文本——所有 muted 是否都从 ink 派生>

### 语义色
- **Success**（`{colors.success}` — #XXXXXX）：<用法>
- **Warning**（`{colors.warning}` — #XXXXXX）：<用法>
- **Error**（`{colors.error}` — #XXXXXX）：<用法>

## 字体

### 字体族
<字体策略：单一字体族 / 衬线 display + 无衬线 body 双轨制 / 三字体分工？参考三份样本的差异。fallback 栈。>
- <Display 字体>（<weight>）→ <用途>
- <Body 字体>（<weight>）→ <用途>
- <Mono 字体> → <代码与终端>

### 层级

| Token | 字号 | 字重 | 行高 | 字距 | 用途 |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 400 | 1.05 | -1.5px | Hero h1 — <字体> |
| `{typography.display-md}` | 36px | 400 | 1.15 | -0.5px | 节标题 — <字体> |
| `{typography.title-md}` | 18px | 500 | 1.4 | 0 | Feature 卡标题 — <字体> |
| `{typography.body-md}` | 16px | 400 | 1.55 | 0 | 默认正文 — <字体> |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | 副文本 — <字体> |
| `{typography.eyebrow}` | 14px | 500 | 1.4 | 0 | 段头标签 — <字体> |
| `{typography.button}` | 14px | 500 | 1 | 0 | 按钮标签 — <字体> |
| `{typography.nav-link}` | 14px | 500 | 1.4 | 0 | 顶部导航菜单项 — <字体> |
| `{typography.code}` | 14px | 400 | 1.6 | 0 | 代码块 — <字体> |

### 原则
<display 是否加粗？负字距施加规则？字族切换是否即层级？参考三份样本的原则段落。>

### 字体替代说明
<若使用专有字体，列出最接近的开放替代：Inter / Geist Sans / JetBrains Mono / EB Garamond / Cormorant Garamond 等。若全开源，明确说明无专有缺口。>

## 布局

### 间距体系
<基底单位（4px / 8px / 10px）、token 命名（g1/g2/g3 或 xxs/xs/sm）、横向与纵向体系是否分离、section padding 值。参考三份样本的差异。>

### 网格与容器
- **容器最大宽度**：<XXXX>px 居中（`{spacing.container-max}`）。
- **Hero**：<对称 6/6 还是非对称 auto/1fr？>
- **Feature 段**：<3-up 卡片网格 / 单列叙事 + 模拟 / 编辑式横向段？>
- **Footer**：<几列链接、桌面/移动折叠策略>

### 留白哲学
<节奏靠 surface 对比制造（Claude 式 band 交替）还是靠纵向 padding 制造（Cursor 式无 band）？读起来像杂志 / 工程文档 / 终端 man page？>

## 高度与深度

| 层级 | 处理 | 用途 |
|---|---|---|
| 平面 | <无阴影无描边 / 无阴影无背景差> | <用途> |
| Soft hairline | 1px `{colors.hairline}` | <用途> |
| Card | `{colors.surface-card}` 背景 | <用途> |
| Dark surface | `{colors.surface-dark}` 背景 | <用途> |
| Hover | <背景下沉 / 阴影 / 描边变化> | <用途> |

**高度哲学是"<描边优先 / 零阴影 / color-block first>"**。<一段哲学描述。>

### 装饰性深度
- <品牌 glyph / mark 是否出现，如何渲染>
- <产品 mockup 内部层级>
- <手绘 line-art / 摄影 / 抽象位图 / 纯排版——客户背书用什么形式>

## 形状

### 圆角刻度

| Token | 值 | 用途 |
|---|---|---|
| `{rounded.xs}` | 4px | <用途> |
| `{rounded.sm}` | 6px | <用途> |
| `{rounded.md}` | 8px | <用途> |
| `{rounded.lg}` | 12px | <用途> |
| `{rounded.xl}` | 16px | <用途> |
| `{rounded.pill}` | 9999px | <用途 / 是否使用> |
| `{rounded.full}` | 9999px | <用途> |

**<形状签名描述——胶囊按钮 / 8px 一统 / 方正优先？参考三份样本的形状语言对比。>**

### 摄影与插画
<hero 是否使用摄影？视觉主力是产品 mockup / line-art / 抽象位图 / ASCII 艺术字 / 纯数据表格？参考三份样本的视觉主力差异。>

## 组件

### 顶部导航
**`top-nav`** — <描述：高度、背景、布局、菜单项、字族、是否有 border-bottom / 阴影 / sticky。>

### 按钮
**`button-primary`** — <背景、文字、字族、padding、高、圆角、边框。用于何处。>
**`button-secondary`** — <是否描边、是否同尺寸。>
**`text-link`** — <内嵌链接色，是否下划线。>

### 卡片与容器
**`hero-band`** — <Hero 段背景、padding、网格布局。>
**`feature-card`** — <背景、圆角、内 padding、内容结构。>
**`product-mockup-card-dark`** — <深色产品模拟卡是否存在，承载什么。>

### 输入与表单
**`text-input`** — <背景、边框、圆角、高、focus 态。>

### 标签 / 徽标
**`badge-pill`** — <pill 容器 / 纯文字 + uppercase / coral 填充？参考三份样本的 badge 范式差异。>

### CTA 与 Footer
**`footer`** — <是否翻黑 / 同色 / 翻品牌色？几列链接？底部版权行结构？参考三份样本的 footer 处理差异。>

## Do 与 Don't

### Do
- <锚定在 {colors.canvas} (#XXXXXX) 画布上。>
- <主 CTA 用什么色——保留给什么的规则>
- <字体规则——display 是否加粗、字族分工>
- <形状规则——按钮圆角、卡片圆角>
- <留白规则——section padding、card padding>

### Don't
- <不要做的反直觉规则——参考三份样本的 Don't 段落，列出 5–8 条>
- <不要把品牌色用作 X>
- <不要做 X 圆角>
- <不要切换到 X 主题>
- <不要给 X 加阴影>

## 响应式行为

### 断点

| 名称 | 宽度 | 关键变化 |
|---|---|---|
| Mobile | < 768px | <变化> |
| Tablet | 768–1024px | <变化> |
| Desktop | 1024–1440px | <变化> |
| Wide | > 1440px | <变化> |

### 触摸目标
- <按钮高度、是否满足 WCAG 44>
- <输入框高度>
- <导航项触摸目标>
- <低于 WCAG 44 的元素及补救策略>

### 折叠策略
- <导航折叠方式>
- <Hero 网格折叠>
- <卡片网格列数变化>
- <Footer 列折叠>

### 图像行为
- <代码块在窄屏是否横向滚动>
- <插画是否按比例缩放>
- <头像是否在所有断点裁切为圆形>

## 迭代指南

1. 一次只动一个组件，引用其 YAML key（`{component.button-primary}`、`{component.feature-card}`）。
2. 同一组件的变体（`-active`、`-disabled`、`-sm`、`-secondary`、`-on-dark`）作为 `components:` 下的独立条目，不合并。
3. 全文使用 `{token.refs}` 引用，不要内联 hex。
4. 不要记录 hover。仅记录 Default 与 Active/Pressed/Focused 状态。
5. <字体规则不可破——具体到该系统>
6. <色板规则不可破——三色循环 / 双色循环 / achromatic>
7. <形状规则不可破——胶囊 / 8px / 方正>
8. 当犹豫"如何强调"时：<先放大字号 / 切字族 / 加字重 / 引入颜色——具体到该系统>
9. <描边规则——独立 hex 还是 oklab 派生，是否多档>

## 已知缺口

- <专有字体缺口——若使用专有字体，列出开放替代；若全开源，明确说明>
- <深色 / 浅色主题——是否有切换器，本文档记录哪个主题>
- <动画与过渡时长是否在 scope 内>
- <表单验证状态是否在 scope 内>
- <子页面 / 内容页的视觉风格是否在 scope 内>
- <实际产品界面（应用本体）共享哪些 token，哪些不在 scope>
- <若为 image-only 提取，明确说明无法确认的精确值，建议 live pass 复核>
