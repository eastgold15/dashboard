import type { AccountInfo, DataRes, LoginToken } from '~/api/base/index.type'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useMyAuthStore = defineStore('myAuth', () => {
  // 使用 useCookie 管理 token
  const { $api } = useNuxtApp()

  const token = useLocalStorage<string | null>('token', null)

  const userInfo = ref(useLocalStorage<AccountInfo | null>('userInfo', null))
  const loggedIn = computed(() => !!token.value)
  const isAdmin = ref(false)

  // 设置用户资料
  function setUserInfo(info: AccountInfo | null) {
    userInfo.value = info
    // 根据用户角色更新 isAdmin 状态
    isAdmin.value = info?.roles?.some(role => role.value === 'admin') ?? false
  }

  function getUserInfo() {
    return computed(() => userInfo.value)
  }

  // 登录方法
  async function login(option: any): Promise<boolean> {
    try {
      const loginRes = await $api.post<DataRes<LoginToken>>('/auth/login', option)
      if (loginRes.code !== 200)
        return false
      // 确保 token 立即更新
      const newToken = loginRes.data?.accessToken as string
      if (!newToken)
        return false
      token.value = newToken

      // 强制同步到 localStorage
      localStorage.setItem('token', newToken)
      // await new Promise(resolve => setTimeout(resolve, 100))

      const profileRes = await $api.get<DataRes<AccountInfo>>('/account/profile')
      setUserInfo(profileRes.data)

      return true
    }
    catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  // 登出方法
  function logout() {
    const token = useLocalStorage('token', null)
    token.value = null
    userInfo.value = null
    // 重定向到登录页
    return navigateTo('/auth/login')
  }

  return {
    isAdmin,
    getUserInfo,
    token,
    userInfo,
    loggedIn,
    login,
    logout,
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMyAuthStore, import.meta.hot))
}
