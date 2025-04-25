import type { DataRes, NestedMenu } from '~/api/base/index.type'

import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const constantRoutes: any[] = [
  {
    id: 1,
    path: '/',
    name: 'basic',
    label: '基础信息',
    component: 'basic',
    parentPath: null,
    meta: {
      title: '基础信息',
      icon: '',
      isExt: false,
      extOpenMode: 1,
      type: 0,
      orderNo: 1,
      show: 1,
      activeMenu: null,
      status: 1,
      keepAlive: 0,
    },
  },

]

export const useMyPermissionStore = defineStore('myPermissionStore', () => {
  const { $api } = useNuxtApp()
  // 2. 状态管理

  const permissions = ref(useLocalStorage<string[] | null>('permissions', [])) // 操作权限码
  const menuList = ref(useLocalStorage<NestedMenu[] | null>('menuList', [])) // 完整菜单树

  // 3. 预处理菜单路径（用于快速查找）
  const flattenedPaths = computed(() => {
    const paths: string[] = []

    // 递归扁平化菜单路径
    const flatten = (menus: NestedMenu[]) => {
      menus.forEach((menu) => {
        if (menu.meta?.show !== 0) { // 只处理需要显示的菜单
          paths.push(menu.path)
          if (menu.children)
            flatten(menu.children)
        }
      })
    }

    flatten(menuList.value!)
    console.log(paths, 'paths')

    return paths
  })
  // 4. 核心方法实现

  // 设置权限列表
  const setPermissions = (perms: string[] | null) => {
    permissions.value = perms || []
  }
  // 合并静态路由和动态菜单112
  const mergeMenus = (dynamicMenus: NestedMenu[], staticMenus: NestedMenu[]): NestedMenu[] => {
    return [...staticMenus, ...(dynamicMenus || [])].filter(menu =>
      menu.meta?.show !== 0, // 过滤掉配置为隐藏的菜单
    )
  }
  // 设置菜单列表
  const setMenuList = (menus: NestedMenu[] | null) => {
    menuList.value = mergeMenus(menus || [], constantRoutes)
  }

  // 检查路由权限
  const hasMenuPermission = (path: string): boolean => {
    if (!path)
      return false
    return flattenedPaths.value.includes(path)
  }
  // 检查操作权限
  const hasPermission = (permissionCode: string): boolean => {
    return permissions.value?.includes(permissionCode) || false
  }
  async function fetchPermissions() {
    const [menus, perms] = await Promise.all([
      $api.get<DataRes<NestedMenu[]>>('/account/menus'),
      $api.get<DataRes<string[]>>('/account/permissions'),
    ])
    console.log(menus.data, 'menus')
    setMenuList(menus.data)
    setPermissions(perms.data)
  }

  // 6. 计算属性
  const getMenuList = computed(() => menuList.value)
  const getPermissions = computed(() => permissions.value)

  // 获取首页相关菜单
  const getDashboardMenuList = computed(() => {
    return menuList.value?.filter((item) => {
      return item.path.startsWith('/home')
    }) ?? []
  })

  return {
    permissions,
    menuList,
    getMenuList,
    getPermissions,
    getDashboardMenuList,
    hasMenuPermission,
    hasPermission,
    fetchPermissions,
    setPermissions,
    setMenuList,
  }
})
