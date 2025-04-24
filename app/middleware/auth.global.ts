import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  const { isWhitelist } = useAuth()

  const { loggedIn } = useMyAuthStore()
  const { hasMenuPermission } = useMyPermissionStore()
  // 1. 白名单路径直接放行（包括登录页）

  console.log('to.path', to.path)
  if (isWhitelist(to.path)) {
    return true // 关键点：不再检查登录状态
  }
  // 2. 非白名单路径且未登录 → 跳登录页
  if (!loggedIn) {
    return navigateTo('/auth/login', { replace: true })
  }
  // 3. 已登录时访问登录页 → 跳首页
  if (to.path === '/auth/login') {
    return navigateTo('/dashboard/index')
  }
  // 4. 其他情况（已登录且非登录页）→ 检查权限
  // 4. 检查菜单权限
  if (!hasMenuPermission(to.path)) {
    return navigateTo('/error/403')
  }
  return true
  // 5. 检查接口权限（非守卫逻辑，在具体页面处理）
})
