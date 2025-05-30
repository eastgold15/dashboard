import type { $API, AccountInfo, DataRes, NestedMenu } from '../index.type'

// 工厂函数：创建账户相关 API
function createAccountApi($api: $API) {
  return {
    // 获取账户资料
    async getAccountInfo() {
      return await $api.get<DataRes<AccountInfo>>('/account/profile')
    },
    // 获取菜单列表
    async getMenuList() {
      return await $api.get<DataRes<NestedMenu[]>>('/account/menus')
    },
    // 获取权限列表
    async getPermissionList() {
      return await $api.get<DataRes<string[]>>('/account/permissions')
    },
  }
}

// 使用示例
const { $api } = useNuxtApp()

export const accountApi = createAccountApi($api)
