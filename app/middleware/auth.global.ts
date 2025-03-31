import type { RouteLocationNormalized } from 'vue-router'


export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  const { isLogin, isWhitelist, isMenuList, isUserInfo, isPermissionList, getUserInfo, getMenuList, getPermissionList, hasMenusPermission } = useAuth()


  // 白名单放行
  if (isWhitelist(to.path)) {
    return
  }
  // 未登录跳转
  if (!isLogin()) {
    console.log(isLogin())
    ElMessage.error('请先登录')
    return navigateTo('/auth/login')
  } else {
    // 已登录跳转
    console.log(isLogin())
    // 获取缺失的数据（使用Promise.all并行执行）
    const promises = []
    if (!isUserInfo()) {
      promises.push(getUserInfo())
    }
    if (!isPermissionList()) {
      promises.push(getPermissionList())
    }
    if (!isMenuList()) {
      promises.push(getMenuList())
    }

    // 等待所有请求完成
    if (promises.length > 0) {
      await Promise.all(promises)
    }
    // 最终权限验证
    if (!hasMenusPermission(to.path)) {
      return navigateTo('/403')
    }



  }





})
