import type { AccountInfo, MenuList, Role } from '~/api/base/index.type'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'


export const useUserStore = defineStore('user', () => {
  // 用户资料
  const userInfo = ref<AccountInfo | null>(null)
  const isAdmin = ref<boolean>(false)

  // 权限列表
  const permissions = ref<string[]>([])

  // 菜单列表
  const menuList = ref<MenuList[]>([])

  // 设置用户资料
  function setUserInfo(info: AccountInfo | null) {
    userInfo.value = info
    // 根据用户角色更新 isAdmin 状态
    isAdmin.value = info?.roles?.some(role => role.value === 'admin') ?? false
  }

  // 设置权限列表
  function setPermissions(perms: string[]) {
    permissions.value = perms
  }

  // 设置菜单列表
  function setMenuList(menus: MenuList[]) {
    menuList.value = menus
  }

  function getMenuList() {
    return computed(() => menuList.value)
  }
  function getPermissions() {
    return computed(() => permissions.value)
  }
  function getUserInfo() {
    return computed(() => userInfo.value)
  }

  return {
    isAdmin,
    userInfo,
    permissions,
    menuList,
    setUserInfo,
    setPermissions,
    setMenuList,
    getMenuList,
    getPermissions,
    getUserInfo,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
