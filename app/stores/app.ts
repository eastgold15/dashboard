import { defineStore } from 'pinia'

export const useMyAppStore = defineStore({
  id: 'myAppStore',
  state: () => ({

    mobile: false, // 是否是移动端
    title: '江西飞行学院水务管理系统', // 标题
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
