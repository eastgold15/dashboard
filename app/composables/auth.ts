import { $endApi } from "~/api/base"
import type { LoginToken } from "~/api/base/index.type"
const whitelist = ['/auth/login', '/403', '/404', '/']
export const useAuth = () => {
  //从cooike中读取token，判断登录没，没登录跳转到登录页
  const token = useCookie<LoginToken>('token')
  const userStore = useUserStore()
  // 修正函数调用方式（添加括号）
  const isLogin = () => !!token.value?.accessToken
  const isWhitelist = (path: string) => whitelist.includes(path)
  const isPermissionList = () => userStore.getPermissions().value.length > 0
  const isMenuList = () => userStore.getMenuList().value.length > 0
  const isUserInfo = () => userStore.getUserInfo().value !== null

  // 获取权限列表
  const getPermissionList = async () => {

    const { data: permissionRes } = await $endApi.v1.account.getPermissionList()
    if (permissionRes?.value?.data) {
      userStore.setPermissions(permissionRes?.value?.data)
    }
  }
  // 获取用户资料
  const getUserInfo = async () => {
    const { data: userInfoRes } = await $endApi.v1.account.getAccountInfo()
    if (userInfoRes?.value?.data) {
      userStore.setUserInfo(userInfoRes?.value?.data)

    }
  }
  // 获取菜单列表  与本地菜单合并
  const getMenuList = async () => {
    const { data: menuRes } = await $endApi.v1.account.getMenuList()
    if (menuRes?.value?.data) {
      // 获取本地树形菜单
      const localTreeMenus = getLocalTreeMenus()
      // 合并远程菜单和本地树形菜单
      const mergedMenus = mergeMenus(menuRes?.value?.data, localTreeMenus)
      // 将合并后的菜单存储到 userStore 中
      userStore.setMenuList(mergedMenus)
    }
  }

  //验证菜单权限
  const hasMenusPermission = (path: string) => {
    const flatMenuList = treeToFlatten(userStore.menuList)
    return flatMenuList.some((route: any) => route.path === path)
  }




  return {
    isLogin,
    isWhitelist,
    isUserInfo,
    isMenuList,
    isPermissionList,
    getPermissionList,
    getUserInfo,
    getMenuList,
    hasMenusPermission
  }
}
