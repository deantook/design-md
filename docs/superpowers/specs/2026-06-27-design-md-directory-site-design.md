# design.md 目录站设计

> 一个可搜索的"网站设计系统索引"画廊：用户输入网址，搜索对应网站的 `design.md` 元信息卡片，并提供指向 GitHub raw 的双语下载链接。视觉与声线完全沿用 [skills.sh](../../design/skills.sh.design.zh.md) 的纯黑终端美学。

- **日期**：2026-06-27
- **状态**：已确认，待制定实现计划
- **技术栈**：Next.js 15（App Router，静态导出）+ TypeScript + Tailwind CSS v4 + `geist` 字体包
- **数据源**：仓库 `design/` 目录（静态文件 + 社区 PR 增长）
- **风格参考**：`design/skills.sh.design.zh.md`（纯黑、achromatic、Geist + Geist Mono + Fira Mono、ASCII 艺术字、排行榜表格、零阴影）

## 1. 信息架构与路由

**站点定位**：design.md 目录画廊——一个可搜索的"网站设计系统索引"。视觉与声线完全沿用 skills.sh 的纯黑终端美学，但把"技能排行榜"替换成"网站 design.md 排行榜"。

**路由结构**（Next.js App Router，`output: 'export'` 静态导出）：

| 路由 | 内容 |
|---|---|
| `/` | 首页：hero（ASCII 艺术字 `DESIGN.MD`）+ 搜索框 + 网站排行榜表格 |
| `/[domain]`（如 `/claude.com`） | 站点详情页：元信息卡片（名称/描述/标签/颜色调色板）+ 双语下载链接 |
| `/about` | 关于页：项目说明 + 如何贡献 PR |

**URL 约定**：详情页路径直接用域名（`/claude.com`、`/cursor.com`、`/skills.sh`）。搜索框输入 `claude.com` 命中后跳转 `/claude.com`，形成"搜什么 = 访问什么"的心智模型。

**未来扩展**：若加入路径级 design.md（如 `cursor.com/docs`），路由自然延伸为 `/cursor.com/docs`，与域名扁平结构兼容。

## 2. 数据模型与构建流程

**数据源**：仓库 `design/` 目录下的 `*.design.{zh,en}.md` 文件。每个站点成对（中/英），通过 frontmatter 元数据驱动站点。

**Frontmatter 提取**：构建时（`generateStaticParams` + 构建脚本）解析每个文件的 YAML frontmatter，提取以下字段作为搜索索引与详情页数据：

| 字段 | 来源 | 用途 |
|---|---|---|
| `name` | frontmatter | 站点标识（如 `claude-com-design-analysis`） |
| `description` | frontmatter | 详情页描述文本 |
| `tags` | frontmatter | 排行榜/详情页标签展示、按标签派生 Tab |
| `colors` | frontmatter | 详情页调色板色块预览（提取所有 hex 值） |
| `domain` | 文件名推导（`claude.com.design.zh.md` → `claude.com`） | 路由 key、搜索匹配主字段 |
| `lang` | 文件名推导（`.zh.md` / `.en.md`） | 双语切换 |
| `githubUrl` | 构建时拼接（仓库 raw/branch 路径） | 下载链接 |

**双语配对**：构建时把同域名的 `.zh.md` 与 `.en.md` 合并为一条记录，含 `{ zh: {...}, en: {...}, githubZh, githubEn }`。详情页根据当前语言渲染对应侧。

**搜索索引**：构建时生成静态 JSON（`/search-index.json`），字段：`domain`、`name`、`description`、`tags`。客户端加载后做模糊匹配——无需后端。

**构建产物**：
- 静态 HTML：`/`、`/<domain>`（每个站点一页）、`/about`
- 静态 JSON：`/search-index.json`
- 部署到 Vercel，监听 git push 自动重建

**文件命名约束**：贡献 PR 必须遵循 `<domain>.design.{zh,en}.md` 命名，否则构建脚本跳过并警告。中英成对缺一时，缺失侧的下载链接隐藏，详情页回退到可用语言。

## 3. 搜索交互

**搜索框位置**：首页 hero 下方，与 skills.sh 一致——Geist Mono 14px、透明背景、45px 高、1px 底边描边（`#1c1c1c`）、placeholder 灰（`#787878`）。右侧附 `/` 快捷键提示（mono）。

**匹配算法**（客户端，基于 `search-index.json`，自写无需依赖）：

按优先级返回命中：
1. **域名前缀匹配**：输入 `claud` 命中 `claude.com`（最高优先级）
2. **域名子串匹配**：输入 `laude` 命中 `claude.com`
3. **路径片段匹配**（未来）：输入 `cursor.com/docs` 命中带路径的条目
4. **标签匹配**：输入 `深色主题` 命中 tags 含此标签的站点（最低优先级）

**交互行为**：
- 输入即时过滤排行榜表格（debounce ~150ms），非命中行收起，保留命中行
- 空输入：显示完整排行榜
- 无命中：表格区显示 mono 文本 `No matches found.`（无插画、无彩色提示）
- 命中行 Enter 或点击 → 跳转 `/<domain>`
- 单一最高命中时，Enter 直达详情页

**键盘**：
- `/` 聚焦搜索框（与 skills.sh 一致）
- `Esc` 清空并失焦
- `↑`/`↓` 在命中行间移动，Enter 进入

**不做的事**：
- 不做服务端搜索（静态站点）
- 不做全文搜索（design.md 正文不进索引，仅元数据可搜）
- 不做搜索历史/建议下拉

## 4. 详情页布局

**路由**：`/<domain>`（如 `/claude.com`）

**页面结构**（自上而下）：

1. **顶部导航**（全站共用，56px sticky 纯黑条）
   - 左：wordmark `Design.md`（含小三角图标）
   - 中/右：语言切换器（`中文 / EN`，mono 14px，当前语言 foreground、另一档 muted）
   - 右：GitHub 仓库链接

2. **Eyebrow 行**：`SITE / <domain>`（Geist Mono 14px / uppercase / 500，foreground）—— 标识当前查看的域名

3. **站点标题区**
   - 大字域名：`claude.com`（Geist 600，约 32px——克制，不引入 display 字号层，与 skills.sh 一致）
   - 描述文本：frontmatter `description`（Geist 16px / 24px 行高，foreground，max-width ~640px）

4. **标签行**：frontmatter `tags`（Geist Mono 12px / uppercase，每个标签间 `·` 分隔，muted 色）—— 纯文字标签，不加 pill 容器、不加背景

5. **调色板预览**（核心可视化）
   - Eyebrow：`PALETTE`（Geist Mono 14px / uppercase）
   - 色块网格：从 frontmatter `colors` 提取所有唯一 hex 值，渲染为方阵（每个色块 ~48×48px，0 圆角，无描边，色块下方居中显示 hex 值 Geist Mono 12px muted）
   - 色块按明度排序展示，呈现该站点的明度梯度
   - 这是详情页唯一的"图像"——与 skills.sh 的 sparkline 同构（数据驱动的纯色块）

6. **下载区**
   - Eyebrow：`DOWNLOAD`（Geist Mono 14px / uppercase）
   - 两行链接（Geist 16px / 600 + mono 14px muted 副文本）：
     - `中文版 design.md` → GitHub raw 链接（`.zh.md`）
     - `English design.md` → GitHub raw 链接（`.en.md`）
   - 链接 default 态 muted，hover 升至 foreground
   - 每行右侧附复制按钮（4px 圆角、28px、透明背景、灰度图标、hover foreground）—— 复制 raw URL
   - 缺失某一侧时隐藏对应行

7. **Footer**（全站共用，纯黑同色，1px 顶边分隔，5 列链接网格——BROWSE / TOPICS / ABOUT / DOCS / PROJECT，列标题 Geist Mono 12px uppercase）

**不做的事**：
- 不渲染 design.md 全文（全文留 GitHub）
- 不做字体声线预览、圆角/间距可视化
- 不引入插画/mockup/位图

## 5. 视觉系统（沿用 skills.sh token 体系）

**基底**：纯黑画布 `#000000`，全程深色无主题切换。色板严格无彩色（achromatic），零品牌色、零强调色、零渐变。

**色板**（与 skills.sh 完全对齐）：
- Background `#000000` / Foreground `#ededed` / Border `#1c1c1c` / Nav link `#a1a1aa` / Muted `#8a8a8a` / Muted soft `#787878`
- 唯一允许的"非纯黑" surface：调色板色块本身（来自各站点 frontmatter，是数据不是装饰）

**字体三件套**：
- **Geist** → 正文、域名标题、导航、标签内容
- **Geist Mono** → 所有 eyebrow、搜索框、tab、footer 列标题、hex 值、下载副文本（uppercase / 14px / 500 签名）
- **Fira Mono** → 仅首页 hero 的 ASCII 艺术字 `DESIGN.MD`（letter-spacing -1px，整站唯一一处）

**形状语言**：方正优先。section / 表格行 / footer / 色块 / 导航 0 圆角；不引入胶囊按钮。

**描边**：仅一档 `#1c1c1c` 1px——排行榜行底边、footer 顶边、搜索框下边、tab 下划线。不派生第二档。

**高度哲学**：零阴影、零 elevation。深度靠 1px hairline 制造。无 box-shadow、无 backdrop-blur、无 surface 提升档。

**首页 hero**：
- ASCII 艺术字 `DESIGN.MD`（Fira Mono，fluid 字号，-1px 字距，foreground）—— 整站唯一"图像"主视觉，与 skills.sh 的 `SKILLS` 同构
- 右侧描述文字：`A directory of website design systems, extracted as design.md.`（Geist 16px，muted）
- 无终端命令块（skills.sh 的 `npx skills add` 是 CLI 产品签名，本站不是 CLI，去掉这块，保留 ASCII + 描述的非对称布局）

**首页排行榜表格**（视觉主力）：
- 16 列网格、行高 45px、padding 12px 0、1px 底边描边
- 列：`#` 序号（mono muted）/ 域名（Geist 600）/ 标签（mono 12px uppercase muted）/ 调色板缩略（5–8 个微型色块横排 ~12×12px）/ `COLORS` 计数（mono）
- 整行可点，hover 时背景不变（保持纯黑），靠描边与字重维持可读性

**Tab**：`ALL / DARK / LIGHT / SERIF / SANS`（按 canonical tag 过滤）—— 2px 下划线范式，active 为 foreground 下划线，inactive 为透明 + muted 文字。不做胶囊填充。

**Tab 过滤规则**：Tab 对应一组 canonical tag，按站点 `tags` 数组中是否**包含**该 canonical tag 过滤（大小写敏感、精确匹配）：
- `ALL` → 全部站点
- `DARK` → tags 含 `深色主题`
- `LIGHT` → tags 含 `浅色主题`
- `SERIF` → tags 含 `衬线`
- `SANS` → tags 含 `无衬线`

贡献 PR 时若希望站点出现在某 Tab 下，需在 frontmatter `tags` 中加入对应 canonical tag。不含任何 canonical tag 的站点仅出现在 `ALL`。若某 Tab 下无站点，显示 `No sites in this category.`（mono muted）。

**Eyebrow 签名**：所有段头 Geist Mono 14px / 500 / uppercase——`SITE`、`PALETTE`、`DOWNLOAD`、`LEADERBOARD`、footer 列标题降到 12px / 400。无 pill、无背景、无边框。

**容器**：max-width 1152px，横向 padding 32px（移动端 16px）。Section 纵向 padding 32px，footer 48px。

## 6. 双语与下载链接

**站点语言状态**：
- 默认中文（`/` 与 `/<domain>` 默认渲染中文侧）
- 顶栏切换器：`中文 / EN`，当前项 foreground、另一项 muted，hover 升至 foreground
- 切换为客户端行为，不切换 URL（同页内切换数据侧），记忆写入 `localStorage`
- 首次访问按 `Accept-Language` 探测默认语言

**下载链接生成**：
构建时拼接 GitHub raw URL，形如：
```
https://raw.githubusercontent.com/<owner>/<repo>/<branch>/design/<domain>.design.zh.md
https://raw.githubusercontent.com/<owner>/<repo>/<branch>/design/<domain>.design.en.md
```
`owner/repo/branch` 从 `site/config.ts` 读取（本地开发可用 `main`）。

**详情页下载区呈现**：
- Eyebrow `DOWNLOAD`
- 两行：
  - `中文版 design.md`（Geist 16px / 600，foreground）+ 副 `raw.githubusercontent.com/.../zh.md`（Geist Mono 12px muted）
  - `English design.md`（Geist 16px / 600）+ 副 `raw.githubusercontent.com/.../en.md`（mono muted）
- 链接 default muted、hover 升至 foreground；副文本始终 muted
- 每行右侧附复制按钮（4px 圆角、28px、透明背景、灰度图标、hover foreground）—— 复制 raw URL

**缺失侧处理**：
- 若某域名只有 `.zh.md` 没有 `.en.md`（或反之）：下载区只显示存在的一行；语言切换器仍可见，但切到缺失侧时，描述/标签区显示 mono 文本 `No <lang> version available yet.`，下载区显示可用侧
- 构建时记录缺失，详情页据此渲染

**排行榜的语言无关性**：首页排行榜每行代表一个域名（中英合并），不按语言分列。语言只影响详情页展示侧。

## 7. 技术栈与项目结构

**技术栈**：
- **Next.js 15**（App Router）+ `output: 'export'` 静态导出
- **TypeScript**（严格模式）
- **Tailwind CSS v4**（实现 skills.sh token 体系，配置自定义 colors / fontFamily / spacing）
- **gray-matter**（解析 frontmatter）
- 搜索：自写前缀 + 子串 + 标签匹配（零依赖）
- 字体：`geist` npm 包（Geist + Geist Mono），Fira Mono 走 Google Fonts 或本地 woff2
- 部署：Vercel，监听 `main` 分支自动构建

**项目结构**：
```
design-md/
├─ design/                      # 数据源（已存在，PR 增长）
│  ├─ claude.com.design.zh.md
│  ├─ claude.com.design.en.md
│  └─ ...
├─ site/                        # Next.js 应用（新建，独立目录）
│  ├─ app/
│  │  ├─ layout.tsx             # 全站 layout（顶栏 + footer + 字体注入）
│  │  ├─ page.tsx               # 首页（hero + 搜索 + 排行榜）
│  │  ├─ [domain]/
│  │  │  └─ page.tsx            # 详情页（generateStaticParams 注入所有域名）
│  │  ├─ about/
│  │  │  └─ page.tsx
│  │  └─ globals.css            # Tailwind + 纯黑基底
│  ├─ lib/
│  │  ├─ parse-designs.ts       # 构建时扫描 design/、解析 frontmatter、双语配对
│  │  ├─ search-index.ts        # 生成 search-index.json
│  │  └─ github-url.ts          # 拼接 raw URL（读 config）
│  ├─ components/
│  │  ├─ top-nav.tsx
│  │  ├─ footer.tsx
│  │  ├─ ascii-wordmark.tsx     # Fira Mono "DESIGN.MD"
│  │  ├─ search-input.tsx       # mono 搜索框 + 键盘快捷键
│  │  ├─ leaderboard-row.tsx
│  │  ├─ palette-grid.tsx       # 调色板色块网格
│  │  ├─ lang-switcher.tsx
│  │  └─ copy-button.tsx
│  ├─ public/
│  │  └─ search-index.json      # 构建产物（gitignore）
│  ├─ next.config.ts            # output: 'export'
│  ├─ tailwind.config.ts        # skills.sh token 映射
│  ├─ tsconfig.json
│  ├─ config.ts                 # repoOwner / repoName / branch / designDir
│  └─ package.json
└─ .github/
   └─ workflows/ci.yml          # 校验文件命名 + 构建站点
```

**构建流程**：
1. `parse-designs.ts` 扫描 `../design/*.design.{zh,en}.md`，解析 frontmatter，按域名配对
2. `generateStaticParams` 为每个域名生成详情页路由
3. `search-index.json` 写入 `public/`，供客户端搜索
4. `next build` 静态导出到 `site/out/`，Vercel 部署

**配置项**（`site/config.ts`）：
```ts
export const config = {
  repoOwner: 'dean',
  repoName: 'design-md',
  branch: 'main',
  designDir: '../design',  // 相对 site/ 的数据源路径
}
```

**边缘约束**：
- 数据源在 `site/` 之外（`../design`），需在 `next.config.ts` 配置 `outputFileTracingIncludes` 或构建时复制，确保静态导出能访问
- CI 校验：PR 必须成对提交 `.zh.md` + `.en.md`（缺一时构建脚本允许但记录警告），命名不符的文件跳过并 fail CI

## 8. 错误/空状态与边缘情况

**搜索空状态**：
- 无命中：排行榜区显示居中文本 `No matches found.`（Geist Mono 14px，muted），无插画、无彩色、无 CTA
- 输入仅空白：等同空输入，显示完整排行榜

**详情页边缘情况**：
- 域名不存在：`generateStaticParams` 不生成该路由 → 静态导出后 404。自定义 404 页：纯黑、居中 mono 文本 `404 / SITE NOT IN DIRECTORY` + 返回首页链接（foreground，hover 下划线）
- 单语站点：按第 6 节处理，缺失侧显示 `No <lang> version available yet.`，下载区只显示存在侧
- frontmatter 缺字段：`description` 缺失 → 该区不渲染；`tags` 缺失 → 标签行隐藏；`colors` 缺失 → 调色板区显示 mono 文本 `No palette data.`

**数据完整性**：
- 构建时校验：文件名不符合 `<domain>.design.{zh,en}.md` → 跳过并在构建日志输出 `WARN: skipped <file> (invalid naming)`
- frontmatter 无法解析 → 跳过该文件，`WARN: skipped <file> (invalid frontmatter)`
- 同域名出现多份 `.zh.md`（重复）→ 取首份，`WARN: duplicate zh for <domain>`
- 构建不因警告 fail，仅 CI 在出现 ERROR 级问题时 fail（如全部文件解析失败导致空站点）

**调色板渲染边缘**：
- 颜色值非 hex（如 `rgba(...)`、`{token.refs}`）→ 构建时尝试解析，能解析为有效 CSS color 的保留，不能的跳过；若全部不可解析，回退到 `No palette data.`
- 颜色数量 > 24：截取前 24 个（按明度排序后），显示 `+N more in design.md`（mono muted）
- 颜色数量 < 2：正常显示，不特殊处理

**排行榜边缘**：
- 仅有 1 个站点：正常显示单行表格，不切换为卡片布局
- 0 个站点：首页排行榜区显示 `No design.md in directory yet.` + about 页 PR 贡献引导

**响应式退化**（移动端 < 640px）：
- 排行榜隐藏调色板缩略列与 `COLORS` 计数列，保留 `#` + 域名 + 标签
- 详情页调色板色块网格从横排改为 4 列网格
- ASCII 艺术字允许横向滚动而非缩放
- 顶栏语言切换器与 GitHub 链接折叠为单行

**可访问性**：
- 所有交互元素键盘可达；搜索框 `/` 快捷键不与浏览器快捷键冲突（仅在非输入态触发）
- 色块附 `aria-label="<hex>"`；复制按钮附 `aria-label="Copy raw URL"`
- 对比度：foreground `#ededed` on `#000` 满足 WCAG AAA；muted `#8a8a8a` on `#000` 满足 AA

## 范围与非目标

**本期范围**：
- 首页（hero + 搜索 + 排行榜）
- 详情页（元信息卡片 + 双语下载链接）
- about 页
- 双语切换
- 静态构建与 Vercel 部署
- CI 文件命名校验

**非目标（明确不做）**：
- 在线生成/上传 design.md
- 渲染 design.md 全文
- 服务端搜索 / 全文搜索
- 字体声线、圆角、间距的可视化预览
- 用户账号 / 评论 / 收藏
- 路径级 design.md（未来扩展，本期不实现）
- 浅色主题
