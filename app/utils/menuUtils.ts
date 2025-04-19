import type { MenuList } from '~/api/base/index.type'
import routerConstans from '~/constants/router'

// 将扁平化菜单转换为树形菜单
export function flattenToTree(menus: any[]) {
  const menuMap: MenuList = {
    component: '',
    id: 0,
    meta: null,
    name: '',
    path: '',
    redirect: '',
  }
  const tree: MenuList[] = []

  // 首先将每个菜单项存储到一个映射中
  menus.forEach((menu) => {
    menuMap[menu.path] = { ...menu, children: [] }
  })

  // 然后构建树形结构
  menus.forEach((menu) => {
    if (menu.parentPath) {
      const parent = menuMap[menu.parentPath]
      if (parent) {
        parent.children.push(menuMap[menu.path])
      }
    }
    else {
      tree.push(menuMap[menu.path])
    }
  })

  return tree
}

// 将树形菜单转换为扁平化菜单
export function treeToFlatten(menus: MenuList[]): any[] {
  const flattened: any[] = []
  function flatten(menu: MenuList) {
    const { children, ...rest } = menu
    flattened.push(rest)
    if (children) {
      children.forEach(flatten)
    }
  }
  menus.forEach(flatten)
  return flattened
}

// 合并远程菜单和本地树形菜单
export function mergeMenus(remoteMenus: any[], localMenus: any[]) {
  const mergedMenus = [...localMenus]

  remoteMenus.forEach((remoteMenu) => {
    const existingMenu = mergedMenus.find(menu => menu.path === remoteMenu.path)
    if (existingMenu) {
      // 如果存在相同路径的菜单，合并其子菜单
      existingMenu.children = mergeMenus(remoteMenu.children || [], existingMenu.children)
    }
    else {
      // 如果不存在相同路径的菜单，直接添加
      mergedMenus.push(remoteMenu)
    }
  })

  return mergedMenus
}

// 获取本地树形菜单
export function getLocalTreeMenus() {
  return routerConstans
}
