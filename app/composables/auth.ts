// export function pathToRegExp(path: string) {
//   const pattern = path.replace(/\//g, '\/').replace(/\*/g, '.*')
//   return new RegExp(`^${pattern}$`) // 将路径转换为正则表达式
// }
export function useAuth() {
  // 从cooike中读取token，判断登录没，没登录跳转到登录页

  const whitelist = ['/auth/login', '/auth/login/*', '/403', '/404', '/', '/dashboard/*', '/dashboard', '/error']

  const isWhitelist = (path: string) => whitelist.some(item => pathToRegExp(item).test(path))

  // // 获取菜单列表  与本地菜单合并
  // const getMenuList = async () => {
  //   const { data: menuRes } = await $endApi.v1.account.getMenuList()
  //   if (menuRes?.value?.data) {
  //     // 获取本地树形菜单
  //     const localTreeMenus = getLocalTreeMenus()
  //     // 合并远程菜单和本地树形菜单
  //     const mergedMenus = mergeMenus(menuRes?.value?.data, localTreeMenus)
  //     // 将合并后的菜单存储到 myPermissionStore 中
  //     myPermissionStore.setMenuList(mergedMenus)
  //   }
  // }

  // //验证菜单权限
  // const hasMenusPermission = (path: string) => {
  //   console.log(myPermissionStore.menuList, "验证菜单权限")
  //   const flatMenuList = treeToFlatten(myPermissionStore.menuList)
  //   return flatMenuList.some((route: any) => route.path === path)
  // }

  return {
    isWhitelist,
  }
}

// const { isWhitelist } = useAuth()
// console.log('isWhitelist:', isWhitelist('/error'))
