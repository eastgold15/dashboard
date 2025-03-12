import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMyAppStore } from '../stores/app'

export interface Route {
  path: string
  label: string
  name: string
  component: string
  parentPath: string | null
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

  // 使用computed获取当前路径下的子路由或平级路由
  const childrenRoutes = computed(() => {
    const currentRoute = appStore.routes.find(route => route.path === currentPath.value)
    if (!currentRoute)
      return []

    // 如果当前路由有子路由，返回子路由
    const childRoutes = appStore.routes.filter(route => route.parentPath === currentRoute.path)
    if (childRoutes.length > 0) {
      return childRoutes
    }

    // 如果当前路由有父路由，返回平级路由
    if (currentRoute.parentPath) {
      return appStore.routes.filter(route => route.parentPath === currentRoute.parentPath)
    }

    // 如果当前路由是顶级路由，返回所有顶级路由
    return appStore.routes.filter(route => route.parentPath === null)
  })

  // 获取当前路由信息
  const currentRoute = computed(() => {
    console.log('currentRoute', appStore.routes.find(route => route.path === currentPath.value))
    return appStore.routes.find(route => route.path === currentPath.value)
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
