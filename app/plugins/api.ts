import type { LoginToken } from '~/api/base/index.type'

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie<LoginToken>('token')

  const runtimeConfig = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: runtimeConfig.public.apiBase,
    onRequest({ options }) {
      // console.log('请求配置', options)
      if (token.value) {
        // Add Authorization header
        // options.headers.set('Authorization', `Bearer ${userAuth.value}`)
        options.headers = {
          Authorization: `Bearer ${token.value.accessToken}`,
          ...options.headers,
        } as unknown as Headers
      }
    },
    onResponse({ response }) {
      console.log('======= response =======\n', response)
      const token = useCookie<LoginToken | null>('token')


      // 处理成功响应
      if (response.status >= 200 && response.status < 300) {
        if (response._data?.code !== 200) {
          // 处理业务错误

          switch (response._data.code) {
            case 1101:
              // 处理token过期
              // 清空token
              token.value = null
              ElMessage.error(`${response._data.code}${response._data.message}`)
              // 跳转登录页
              navigateTo({
                path: '/auth/login',
                query: {
                  code: response._data.code,
                  message: response._data.message,
                }
              })
              break
            case 403:
              // 处理权限错误
              break
            default:
              // 处理其他业务错误
              break
          }



          nuxtApp.runWithContext(() => {
            navigateTo({
              path: '/error',
              query: {
                code: response._data.code,
                message: response._data.message,
              },
            })
          })
        }
      }
    },
    async onResponseError({ response }) {
      // 处理 401 未授权
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }

      // 处理其他错误
      if (import.meta.client) {
        ElMessage.error(`请求失败: ${response.statusText}`)
      }
    },
  })

  return {
    provide: {
      api,
    },
  }
})
