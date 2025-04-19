import type { DataRes, MenuList } from '~/api/base/index.type'

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

  // 权限列表
  const permissions = ref(useLocalStorage<string[] | null>('permissions', []))
  // 菜单列表
  const menuList = ref(useLocalStorage<MenuList[] | null>('menuList', []))

  // 设置权限列表
  function setPermissions(perms: string[] | null) {
    if (!perms) {
      permissions.value = []
      return
    }
    permissions.value = perms
  }

  // 设置菜单列表 需要传入一个菜单列表 格式为 MenuList[]
  function setMenuList(menus: MenuList[] | null) {
    if (!menus) {
      menuList.value = []
      return
    }
    // 使用解构赋值创建新数组保证响应式
    const localTreeMenus = [...constantRoutes]
    const mergedMenus = mergeMenus(menus, localTreeMenus)

    // 直接赋值新数组
    menuList.value = mergedMenus
  }

  // 检查是否有指定权限
  function hasPermission(permissionCode: string) {
    if (!permissionCode) {
      return false
    }
    return permissions.value?.map(item => item.includes(permissionCode))
  }

  async function fetchPermissions() {
    const [menus, perms] = await Promise.all([
      $api.get<DataRes<MenuList[]>>('/account/menus'),
      $api.get<DataRes<string[]>>('/account/permissions'),
    ])
    console.log(menus.data, 'menus')
    setMenuList(menus.data)
    setPermissions(perms.data)
  }

  function getMenuList() {
    return computed(() => menuList.value)
  }
  function getPermissions() {
    return computed(() => permissions.value)
  }
  function getDashboardMenuList() {
    return computed(() => {
      return menuList.value?.filter((item) => {
        return item.path.startsWith('/dashboard') || item.children?.some(child => child.path.startsWith('/dashboard'))
      })
    })
  }

  return {

    permissions,
    menuList,
    fetchPermissions,
    setPermissions,
    setMenuList,
    getMenuList,
    getPermissions,
    hasPermission,
    getDashboardMenuList,

  }
})
