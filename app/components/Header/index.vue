<script lang="ts" setup>
import type { NestedMenu } from '~/api/base/index.type'
import logo from '/logo.png'

interface Props {
  routes: Array<NestedMenu>
}
const props = defineProps<Props>()
const route = useRoute()
// 增强的路径匹配函数
function isPathMatch(currentPath: string, targetPath: string): boolean {
  if (!targetPath)
    return false
  return currentPath.startsWith(targetPath)
}
// 递归查找当前路由对应的菜单层级
function findMenuLevel(menus: NestedMenu[], path: string): NestedMenu[] | null {
  for (const menu of menus) {
    // 跳过无效路径
    if (!menu.path)
      continue

    // 匹配当前路由
    if (isPathMatch(path, menu.path)) {
      // 返回同级菜单（排除自己和无效路径项）
      return menus.filter(m => m.path && m.path !== menu.path)
    }
    // 检查子菜单
    if (menu.children?.length) {
      const found = findMenuLevel(menu.children, path)
      if (found)
        return found

      // 特殊处理：当访问父级路由时，显示其子菜单
      if (isPathMatch(path, menu.path)) {
        return menu.children?.filter(c => c.path) || null
      }
    }
  }
  return null
}
// 当前应显示的菜单项
const currentMenuItems = computed(() => {
  // 特殊处理根路径
  if (route.path === '/') {
    const rootChildren = props.routes[0]?.children || []
    return rootChildren.filter(item => item.path)
  }
  // 查找匹配的菜单层级
  let levelMenus = findMenuLevel(props.routes, route.path)
  // 如果没有匹配到（可能是动态路由），尝试匹配父级
  if (!levelMenus) {
    const parentPath = route.matched.find(m => m.path)?.path
    if (parentPath) {
      const parentMenu = findParentMenu(props.routes, parentPath)
      levelMenus = parentMenu?.children?.filter(c => c.path) || null
    }
  }
  // 最终过滤：有效路径 + 显示项
  return levelMenus?.filter(item =>
    item.path
    && item.meta?.show !== 0
    && item.name !== 'auth', // 可选：过滤特定路由
  ) || []
})
// 辅助函数：查找父级菜单
function findParentMenu(menus: NestedMenu[], path: string): NestedMenu | null {
  for (const menu of menus) {
    if (!menu.path)
      continue

    if (isPathMatch(path, menu.path))
      return menu
    if (menu.children) {
      const found = findParentMenu(menu.children, path)
      if (found)
        return found
    }
  }
  return null
}
const { logout } = useMyAuthStore()
const config = useAppConfig()
const appName = config.appName || 'App'
</script>

<template>
  <div class="flex items-center justify-between px-4">
    <div class="flex-start">
      <NuxtLink to="/" class="pr-100px">
        <img :src="logo" alt="logo" class="mr-2 inline-block h-9 w-9">
        <h1 class="inline-block v-middle text-9">
          {{ appName }}
        </h1>
      </NuxtLink>
      <!-- 静态 -->
      <HeaderNavItem path="/dashboard" label="首页" :active="route.path.startsWith('/dashboard')" />
      <!-- 动态菜单渲染 -->
      <nav v-if="currentMenuItems.length" class="flex flex-center gap-4 px-9">
        <HeaderNavItem
          v-for="item in currentMenuItems" :key="item.path" :path="item.redirect || item.path"
          :label="item.meta?.title || item.name" :active="route.path.startsWith(item.path)"
        />
      </nav>
    </div>

    <div class="flex flex-center gap-4">
      <HeaderTimeShow class="header-time" />
      <div class="i-tabler:logout cursor-pointer dark:text-white" @click="logout" />
      <HeaderSetting />
    </div>
  </div>
</template>
