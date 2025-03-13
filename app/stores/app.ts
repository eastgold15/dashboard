import { defineStore } from 'pinia'
import routerConstans from '~/constants/router.constans'

export const useMyAppStore = defineStore('myAppStore', () => {
  // state
  const mobile = ref(false) // 是否是移动端
  const title = ref('江西飞行学员') // 标题
  const routes = ref(routerConstans)
  const pageLoading = ref(false) // 路由跳转loading
  const breadcrumb = ref(true) // 面包屑
  const breadcrumbIcon = ref(true) // 面包屑图标
  const collapse = ref(false) // 折叠菜单
  const uniqueOpened = ref(false) // 是否只保持一个子菜单的展开
  const hamburger = ref(true) // 折叠图标
  const screenfull = ref(true) // 全屏图标
  const size = ref(true) // 尺寸图标
  const locale = ref(true) // 多语言图标
  const tagsView = ref(true) // 标签页
  const tagsViewIcon = ref(true) // 是否显示标签图标
  const logo = ref(true) // logo
  const fixedHeader = ref(true) // 固定toolheader
  const footer = ref(true) // 显示页脚
  const greyMode = ref(false) // 是否开始灰色模式，用于特殊悼念日
  const dynamicRouter = ref(true) // 是否动态路由
  const serverDynamicRouter = ref(true) // 是否服务端渲染动态路由
  const fixedMenu = ref(false) // 是否固定菜单
  const layout = ref('classic') // layout布局
  const isDark = ref(false) // 是否是暗黑模式
  const currentSize = ref('default') // 组件尺寸
  const theme = ref({
    // 主题色
    elColorPrimary: '#409eff',
    // 左侧菜单边框颜色
    leftMenuBorderColor: 'inherit',
    // 左侧菜单背景颜色
    leftMenuBgColor: '#001529',
    // 左侧菜单浅色背景颜色
    leftMenuBgLightColor: '#0f2438',
    // 左侧菜单选中背景颜色
    leftMenuBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单收起选中背景颜色
    leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
    // 左侧菜单字体颜色
    leftMenuTextColor: '#bfcbd9',
    // 左侧菜单选中字体颜色
    leftMenuTextActiveColor: '#fff',
    // logo字体颜色
    logoTitleTextColor: '#fff',
    // logo边框颜色
    logoBorderColor: 'inherit',
    // 头部背景颜色
    topHeaderBgColor: '#fff',
    // 头部字体颜色
    topHeaderTextColor: 'inherit',
    // 头部悬停颜色
    topHeaderHoverColor: '#f6f6f6',
    // 头部边框颜色
    topToolBorderColor: '#eee',
  },

  )
  // actions
  function getLayout() {
    return layout.value
  }
  function getRouters() {
    return routes.value
  }
  function getLogo() {
    return logo.value
  }
  function getMobile() {
    return mobile.value
  }
  function getCollapse() {
    return collapse.value
  }
  function getPageLoading() {
    return pageLoading.value
  }
  function getFixedHeader() {
    return fixedHeader.value
  }
  function getTagsView() {
    return tagsView.value
  }
  function getFixedMenu() {
    return fixedMenu.value
  }
  function getTitle() {
    return title.value
  }
  function getTheme() {
    return theme.value
  }
  function setLayout(newLayout: string) {
    layout.value = newLayout
  }
  return {
    // state
    mobile,
    title,
    routes,
    pageLoading,
    breadcrumb,
    breadcrumbIcon,
    collapse,
    uniqueOpened,
    hamburger,
    screenfull,
    size,
    locale,
    tagsView,
    tagsViewIcon,
    logo,
    fixedHeader,
    footer,
    greyMode,
    dynamicRouter,
    serverDynamicRouter,
    fixedMenu,
    layout,
    isDark,
    currentSize,

    // actions
    getLayout,
    getRouters,
    getLogo,
    getMobile,
    getCollapse,
    getPageLoading,
    getFixedHeader,
    getTagsView,
    getFixedMenu,
    getTitle,
    setLayout,
    getTheme,
  }
})
