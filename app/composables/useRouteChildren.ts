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

  // 使用computed获取当前路径下的所有子路由
  const childrenRoutes = computed(() => {
    console.log('childrenRoutes', appStore.routes.filter(route => route.parentPath === currentPath.value))
    return appStore.routes.filter(route => route.parentPath === currentPath.value)
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
