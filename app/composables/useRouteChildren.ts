import { computed } from 'vue'
import { useMyAppStore } from '../stores/app'

export interface Route {
  path: string
  label: string
  name: string
  component: string
  parentPath: string | null
}

// 获取当前路径下的所有子路由
export function useRouteChildren(currentPath: string) {
  const appStore = useMyAppStore()

  // 使用computed获取当前路径下的所有子路由
  const childrenRoutes = computed(() => {
    console.log('childrenRoutes', appStore.routes.filter(route => route.parentPath === currentPath))
    return appStore.routes.filter(route => route.parentPath === currentPath)
  })

  // 获取当前路由信息
  const currentRoute = computed(() => {
    console.log('currentRoute', appStore.routes.find(route => route.path === currentPath))
    return appStore.routes.find(route => route.path === currentPath)
  })

  // 获取所有顶级路由
  const rootRoutes = computed(() => {
    console.log('appStore', appStore.routes.filter(route => route.parentPath === null))
    return appStore.routes.filter(route => route.parentPath === null)
  })

  return {
    childrenRoutes,
    currentRoute,
    rootRoutes,
  }
}
