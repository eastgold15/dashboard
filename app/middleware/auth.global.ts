import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  const { isWhitelist } = useAuth()

  const { loggedIn } = useMyAuthStore()
  const { hasPermission } = useMyPermissionStore()
  /* 路径不在白名单内，重定向至登陆页面 */
  if (!isWhitelist(to.path)) {
    return navigateTo('/auth/login')
  }

  // 已登录
  if (loggedIn) {
    if (to.path === '/auth/login') {
      return navigateTo('/dashboard/index')
    }
    // 不去首页
    else {
      // 检查权限
      if (true) {
        return true
      }
      /// 其他页面
      else {
        return true
      }
    }
  }
})
