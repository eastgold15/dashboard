import { defineStore } from 'pinia'

export const useMyAppStore = defineStore({
  id: 'myAppStore',
  state: () => ({
    mobile: false, // 是否是移动端
    title: '江西飞行学员', // 标题
    routes: [
      {
        path: '/',
        name: 'basic',
        label: '基础信息',
        component: 'basic',
        parentPath: null,
      },
      {
        path: '/basic/overview',
        name: 'basicOverview',
        label: '概览',
        component: 'basic/overview',
        parentPath: '/basic',
      },
      {
        path: '/basic/detail',
        name: 'basicDetail',
        label: '详情',
        component: 'basic/detail',
        parentPath: '/basic',
      },
      {
        path: '/sr',
        name: 'sr',
        label: '统计报表',
        component: 'sr',
        parentPath: null,
      },
      {
        path: '/sr/daily',
        name: 'srDaily',
        label: '日报表',
        component: 'sr/daily',
        parentPath: '/sr',
      },
      {
        path: '/sr/monthly',
        name: 'srMonthly',
        label: '月报表',
        component: 'sr/monthly',
        parentPath: '/sr',
      },
      {
        path: '/wa',
        name: 'wa',
        label: '用水分析',
        component: 'wa',
        parentPath: null,
      },
      {
        path: '/wa/trend',
        name: 'waTrend',
        label: '用水趋势',
        component: 'wa/trend',
        parentPath: '/wa',
      },
      {
        path: '/wa/compare',
        name: 'waCompare',
        label: '对比分析',
        component: 'wa/compare',
        parentPath: '/wa',
      },
      {
        path: '/am',
        name: 'am',
        label: '报警管理',
        component: 'am',
        parentPath: null,
      },
      {
        path: '/am/current',
        name: 'amCurrent',
        label: '当前报警',
        component: 'am/current',
        parentPath: '/am',
      },
      {
        path: '/am/history',
        name: 'amHistory',
        label: '历史报警',
        component: 'am/history',
        parentPath: '/am',
      },
      {
        path: '/qm',
        name: 'qm',
        label: '定额管理',
        component: 'qm',
        parentPath: null,
      },
      {
        path: '/qm/setting',
        name: 'qmSetting',
        label: '定额设置',
        component: 'qm/setting',
        parentPath: '/qm',
      },
      {
        path: '/qm/analysis',
        name: 'qmAnalysis',
        label: '定额分析',
        component: 'qm/analysis',
        parentPath: '/qm',
      },
    ],
    pageLoading: false, // 路由跳转loading
    breadcrumb: true, // 面包屑
    breadcrumbIcon: true, // 面包屑图标
    collapse: false, // 折叠菜单
    uniqueOpened: false, // 是否只保持一个子菜单的展开
    hamburger: true, // 折叠图标
    screenfull: true, // 全屏图标
    size: true, // 尺寸图标
    locale: true, // 多语言图标
    tagsView: true, // 标签页
    tagsViewIcon: true, // 是否显示标签图标
    logo: true, // logo
    fixedHeader: true, // 固定toolheader
    footer: true, // 显示页脚
    greyMode: false, // 是否开始灰色模式，用于特殊悼念日
    dynamicRouter: true, // 是否动态路由
    serverDynamicRouter: true, // 是否服务端渲染动态路由
    fixedMenu: false, // 是否固定菜单
    layout: 'classic', // layout布局
    isDark: false, // 是否是暗黑模式
    currentSize: 'default', // 组件尺寸
  }),
  actions: {
    getLayout() {
      return this.layout
    },
    getRouters() {
      return this.routes
    },
    getLogo() {
      return this.logo
    },
    getMobile() {
      return this.mobile
    },
    getCollapse() {
      return this.collapse
    },
    getPageLoading() {
      return this.pageLoading
    },
    getFixedHeader() {
      return this.fixedHeader
    },
    getTagsView() {
      return this.tagsView
    },
    getFixedMenu() {

    },
    getTitle() {
      return this.title
    },
    setLayout(layout: string) {
      this.layout = layout
    },

  },
})
