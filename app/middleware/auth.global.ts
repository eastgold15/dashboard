import type { RouteLocationNormalized } from 'vue-router'


export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  // const { isLogin, isWhitelist, isMenuList, isUserInfo, isPermissionList, getUserInfo, getMenuList, hasMenusPermission } = useAuth()
  const { isWhitelist } = useAuth()


  // const { authToken, userInfo } = storeToRefs(useUserStore())
  const { loggedIn } = useMyAuthStore()

  if (loggedIn) {
    return

  }

  /* 路径不在白名单内，重定向至登陆页面 */
  else if (!isWhitelist(to.path)) {
    return navigateTo('/auth/login')
  }

  // // 白名单放行
  // if (isWhitelist(to.path)) {
  //   return
  // }


  // // 创建响应式状态跟踪
  // const isLoggedIn = ref(isLogin())

  // // 未登录跳转
  // if (!isLoggedIn.value) {
  //   ElMessage.error('请先登录')
  //   return navigateTo('/auth/login')
  // }

  // // 监听登录状态变化
  // watch(isLoggedIn, async (newVal) => {
  //   if (newVal) {
  //     // 登录状态下检查并加载必要数据
  //     let promises = []
  //     if (!isUserInfo()) {
  //       promises.push(getUserInfo())
  //     }
  //     if (!isPermissionList()) {
  //       promises.push(getPermissionList())
  //     }
  //     if (!isMenuList()) {
  //       promises.push(getMenuList())
  //     }

  //     if (promises.length > 0) {
  //       await Promise.all(promises)
  //       promises = []
  //     }

  //     // 权限验证
  //     if (!hasMenusPermission(to.path)) {
  //       return navigateTo('/403')
  //     }
  //   } else {
  //     // 登出处理
  //     return navigateTo('/auth/login')
  //   }
  // }, { immediate: true })

  // // 初始检查
  // if (isLoggedIn.value && (!isUserInfo() || !isPermissionList() || !isMenuList())) {
  //   isLoggedIn.value = isLogin() // 触发watch
  // }







})
