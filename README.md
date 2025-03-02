# 水务管理系统

四川大学锦江学院

- SSR Preview:
- SSG Preview:

We recommend to look at the [Nuxt 3 Docs](https://nuxt.com/) and [Element Plus Docs](https://element-plus.org/).

> If you are looking for a Vite + Vue + Element Plus starter, check out [element-plus-vite-starter](https://github.com/element-plus/element-plus-vite-starter/).

## 快速开始

！没有pnpm 需要先在powershell 安装pnpm `npm install -g pnpm`
第一次安装需要执行`pnpm setup`

安装依赖

```bash
pnpm install
```

## 启动项目

Start the development server on `http://localhost:3000`

```bash
pnpm dev
```

More info about [nuxt deployment](https://nuxt.com/docs/getting-started/deployment#presets).

Run `npm run generate` to generate static html in `.output/public`.

## Production生产环境

Build the application for production:

```bash
pnpm build
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## Deploy

You need set `NITRO_PRESET=vercel-edge`, see [Nuxt on Vercel](https://vercel.com/docs/frameworks/nuxt#edge-functions).

## 技术栈

> nuxt3 +element-plus + Echarts+ unocss + vite + typescript + pinia + Fetch + vue-i18n + vueuse + vue-tsc + vue-types

## 目录结构

dashboard
├── app # 主应用目录
│ ├── api # API 接口目录
│ │ └── base # 基础 API 配置
│ ├── app.vue # 应用入口文件
│ ├── assets # 静态资源目录
│ │ ├── imgs # 图片资源
│ │ ├── scss # SCSS 样式
│ │ └── styles # 其他样式文件
│ ├── components # 组件目录
│ │ ├── DarkToggle.vue # 暗黑模式切换
│ │ ├── Echarts # _图表组件_
│ │ ├── example # 示例组件
│ │ ├── Header # 头部组件
│ │ └── Layout # 布局组件
│ ├── composables # 组合式函数
│ ├── constants # 常量配置
│ ├── layouts # 布局模板
│ ├── locales # 国际化文件
│ ├── pages # 页面文件
│ └── stores # 状态管理
├── Dockerfile # Docker 配置
├── eslint.config.js # ESLint 配置
├── i18n.config.ts # 国际化配置
├── nuxt.config.ts # Nuxt 配置
├── package.json # 项目依赖配置
├── pm2.config.json # PM2 部署配置
├── public # 公共资源目录
│ ├── bg.jpg # 背景图
│ ├── CNAME # 域名配置
│ ├── favicon.ico # 网站图标
│ └── logo.png # Logo 图片
├── server # 服务端目录
│ └── api # 服务端 API
├── tsconfig.json # TypeScript 配置
└── uno.config.ts # UnoCSS 配置

主要看/app目录下的代码，是前端代码

nuxt3他是先看这个layout文件然后一个pages/index它会自动的选择一个默认布局，然后根据这个布局去渲染页面
nuxt3的路由是约定式路由，名称是什么它的路径就是什么

## 前端目录结构

app
├── api 网络请求 不重要
│ └── base
│ ├── api.ts
│ ├── index.ts
│ ├── index.type.d.ts
│ └── v1
│ ├── account.ts
│ ├── account.type.ts
│ ├── aigc
│ ├── auth.ts
│ ├── auth.type.ts
│ ├── cms.ts
│ ├── cms.type.ts
│ ├── common.ts
│ ├── common.type.ts
│ ├── login.ts
│ ├── login.type.ts
│ ├── marketing.ts
│ ├── marketing.type.ts
│ ├── tools.ts
│ ├── tools.type.ts
│ ├── weChat.ts
│ └── wechat.type.ts
├── app.vue
├── assets
│ ├── imgs
│ │ └── bg.jpg
│ ├── scss
│ │ ├── element
│ │ │ ├── dark.scss
│ │ │ └── index.scss
│ │ └── index.scss
│ └── styles
│ ├── automic-classes.ts unocss原子类样式 被导入到unocss.ts.config
│ └── variables.module.scss
├── components
│ ├── DarkToggle.vue
│ ├── Echarts 所有的echatsrts组件 首页的echarts组件
│ │ ├── AnnualTrends.vue
│ │ ├── components
│ │ │ ├── EchartsContent.vue
│ │ │ ├── EchartsTitle.vue 组件的头部
│ │ │ ├── LineProport.vue
│ │ │ ├── PipeProport.vue
│ │ │ └── UserWaterItem.vue
│ │ ├── HistoryWater.vue
│ │ ├── UseWater.vue
│ │ ├── WaterAlarmInfo.vue
│ │ ├── WaterProportion.vue
│ │ └── YearoveryearMonthlyWater.vue
│ ├── example
│ │ ├── Buttons.vue
│ │ ├── DatePickers.vue
│ │ ├── Icons.vue
│ │ ├── Switches.vue
│ │ └── Tags.vue
│ ├── Footer.vue
│ ├── GitHubLink.vue
│ ├── Header
│ │ ├── index.vue
│ │ ├── NavItem.vue
│ │ └── TimeShow.vue
│ ├── Layout
│ ├── Logo.vue
│ ├── Menu.vue
│ ├── NuxtLogo.vue
│ ├── RightTopMenu.vue
│ ├── TheCounter.vue
│ ├── TheExamples.vue
│ ├── TheLogos.vue
│ ├── ToolHeader.vue
│ └── useRenderLayout.tsx
├── composables
│ ├── count.ts
│ └── design.ts
├── constants 常量
│ └── index.ts
├── layouts 这是页面布局文件
│ ├── default.vue
│ ├── home.vue
│ └── README.md
├── locales 国际化，翻译
│ ├── en.ts
│ └── zh-CN.ts
├── pages
│ ├── hi
│ │ └── [id].vue
│ ├── index.vue 首页会被插入到layout的default.vue中
│ └── [...all].vue
└── stores
├── app.ts 应用持久化状态
└── user.ts

### 翻译：

统计报表 StatisticalReport -> sr
统计看板 Statistics Kanban
远程抄表 Remote meter reading
用能排名 Ranking with energy
统计查询 Statistical Query
用水分析 waterAnalysis -> wa
动态分析 dynamic analysis
供水分析 water supply analysis
漏损分析 leakage analysis
报警管理 AlarmManagement -> am
定额管理 QuotaManagement -> qm
定额看板 Quota Kanban
定额配置 Quota Configuration

### layouts/

├── sr.vue # 统计报表布局
├── wa.vue # 用水分析布局
├── am.vue # 报警管理布局
└── qm.vue # 定额管理布局

### pags/

统计报表 (StatisticalReport)
pages/
├── sr/
├── StatisticsKanban.vue # 统计看板 index
├── RemoteMeterReading.vue # 远程抄表
├── EnergyRanking.vue # 用能排名
└── StatisticalQuery.vue # 统计查询

用水分析 (WaterAnalysis)
pages/
├── wa/
├── DynamicAnalysis.vue # 动态分析    index
├── WaterSupplyAnalysis.vue # 供水分析
└── LeakageAnalysis.vue # 漏损分析

报警管理 (AlarmManagement)
pages/
├── am/
└── AlarmMonitor.vue # 报警监控  index

定额管理 (QuotaManagement)
pages/
├── qm/
├── QuotaKanban.vue # 定额看板  index
└── QuotaSettings.vue # 定额配置
