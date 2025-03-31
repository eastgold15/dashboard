import type { AccountInfo, DataRes, MenuList } from '../index.type'

export default {
  // 获取账户资料
  async getAccountInfo() {
    return await useAPI<DataRes<AccountInfo>>('/account/profile')

  },
  // 获取菜单列表
  async getMenuList() {
    return await useAPI<DataRes<MenuList[]>>('/account/menus')

  },
  // 获取权限列表
  async getPermissionList() {
    return await useAPI<DataRes<string[]>>('/account/permissions')

  },

}
