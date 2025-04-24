import type { IMenuModel, NestedMenu } from '~/api/base/index.type'

// 将树形菜单转换为扁平化菜单
export function treeToFlatten(menus: NestedMenu[]): any[] {
  const flattened: any[] = []

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
