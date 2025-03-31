import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMyAppStore } from '../stores/app'

export interface Route {
  path: string
  label: string
  name: string
  component: string
  children?: Route[]
}

// 递归查找路由
function findRoute(routes: Route[], path: string): Route | undefined {
  for (const route of routes) {
    if (route.path === path) {
      return route
    }
    if (route.children) {
      const childRoute = findRoute(route.children, path)
      if (childRoute) {
        return childRoute
      }
    }
  }
  return undefined
}

// 获取当前路径下的所有子路由
export function useRouteChildren() {
  const appStore = useMyAppStore()
  const route = useRoute()
  const currentPath = ref(route.path)

  // 监听路由变化，更新 currentPath
  watch(
    () => route.path,
    (newPath) => {
      currentPath.value = newPath
    },
    { immediate: true },
  )

  // 使用 computed 获取当前路径下的子路由或平级路由
  const childrenRoutes = computed(() => {
    const currentRoute = findRoute(appStore.routes, currentPath.value)
    if (!currentRoute) {
      return []
    }
    // 如果当前路由有子路由，返回子路由
    if (currentRoute.children) {
      return currentRoute.children
    }
    // 查找父路由
    const parentPath = currentPath.value.split('/').slice(0, -1).join('/')
    const parentRoute = findRoute(appStore.routes, parentPath)
    if (parentRoute && parentRoute.children) {
      return parentRoute.children
    }
    // 如果当前路由是顶级路由，返回所有顶级路由
    return appStore.routes
  })

  // 获取当前路由信息
  const currentRoute = computed(() => {
    return findRoute(appStore.routes, currentPath.value)
  })

  // 获取所有顶级路由
  const rootRoutes = computed(() => {
    return appStore.routes
  })

  return {
    childrenRoutes,
    currentRoute,
    rootRoutes,
  }
}
