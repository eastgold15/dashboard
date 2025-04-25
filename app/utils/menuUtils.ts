import type { NestedMenu } from '~/api/base/index.type'

// 将树形菜单转换为扁平化菜单
export function treeToFlatten(menus: NestedMenu[]): Omit<NestedMenu, 'children'>[] {
  if (menus.length <= 0) {
    return []
  }
  const flattened: Omit<NestedMenu, 'children'>[] = []
  // 递归函数
  function flatten(menu: NestedMenu) {
    const { children, ...rest } = menu
    flattened.push(rest)
    if (children) {
      children.forEach(flatten)
    }
  }

  menus.forEach(flatten)
  return flattened
}

// 找出当前路由对应的菜单项
export function findActiveMenu(menus: NestedMenu[], path: string): NestedMenu | null {
  for (const menu of menus) {
    //  如果当前菜单项的路径匹配当前路由，则返回该菜单项
    if (menu.path === path)
      return menu
    // 递归查找子菜单
    if (menu.children) {
      const found = findActiveMenu(menu.children, path)
      if (found)
        return found
    }
  }
  return null
}

// // 合并远程菜单和本地树形菜单
// export function mergeMenus(remoteMenus: any[], localMenus: any[]) {
//   const mergedMenus = [...localMenus]

//   remoteMenus.forEach((remoteMenu) => {
//     const existingMenu = mergedMenus.find(menu => menu.path === remoteMenu.path)
//     if (existingMenu) {
//       // 如果存在相同路径的菜单，合并其子菜单
//       existingMenu.children = mergeMenus(remoteMenu.children || [], existingMenu.children)
//     }
//     else {
//       // 如果不存在相同路径的菜单，直接添加
//       mergedMenus.push(remoteMenu)
//     }
//   })

//   return mergedMenus
// }
