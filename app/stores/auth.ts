import { defineStore } from 'pinia'
import { func } from 'vue-types'
import type { AccountInfo, DataRes, LoginToken } from '~/api/base/index.type'
export const useMyAuthStore = defineStore('myAuth', () => {
  // 使用 useCookie 管理 token
  const { $api } = useNuxtApp()
  const token = useCookie<string | null>('token', {
    maxAge: 60 * 60 * 24 * 7, // 7天过期
    sameSite: 'strict'
  })

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
  async function login(option: any) {

    return $api.post<DataRes<LoginToken>>('/auth/login', option).then((res) => {
      if (res.code === 200) {
        token.value = res.data?.accessToken as string
      }
      $api.get<DataRes<AccountInfo>>('/account/profile').then((res) => {
        setUserInfo(res.data)
      })
      return true
    })
  }

  // 登出方法
  function logout() {
    const cookie = useCookie('token')
    cookie.value = null
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
    logout
  }
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMyAuthStore, import.meta.hot))
}
