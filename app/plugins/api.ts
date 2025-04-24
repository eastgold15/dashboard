import { useLocalStorage } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const baseApi = $fetch.create({
    baseURL: runtimeConfig.public.apiBase,
    onRequest({ options }) {
      const token = useLocalStorage<string | null>('token', null)
      if (token.value) {
        options.headers = {
          Authorization: `Bearer ${token.value}`,
          ...options.headers,
        } as unknown as Headers
      }
    },
    onResponse({ response }) {
      const token = useLocalStorage<string | null>('token', null)
      // 处理成功响应
      if (response.status >= 200 && response.status < 300) {
        if (response._data?.code !== 200) {
          // 处理业务错误
          switch (response._data.code) {
            case 1101:
              token.value = null
              ElMessage.error(`${response._data.code}${response._data.message}`)
              // 跳转登录页
              navigateTo({
                path: '/auth/login',
              })
              break
            case 403:
              // 处理权限错误
              break
            default:
              // 处理其他业务错误
              break
          }
        }
      }
    },
    async onResponseError({ response }) {
      // 处理 401 未授权
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/auth/login'))

        // 处理其他错误
        if (import.meta.client) {
          ElMessage.error(`请求失败: ${response.statusText}`)
        }
      }
    },
  })

  // 封装 GET 请求
  const get = async <T>(url: string, params?: Record<string, any>) => {
    return baseApi<T>(url, {
      method: 'GET',
      params,
    })
  }

  // 封装 POST 请求
  const post = async <T>(url: string, body?: Record<string, any>) => {
    return baseApi<T>(url, {
      method: 'POST',
      body,
    })
  }

  // 封装 PUT 请求
  const put = async <T>(url: string, body?: Record<string, any>) => {
    return baseApi<T>(url, {
      method: 'PUT',
      body,
    })
  }

  // 封装 DELETE 请求
  const del = async <T>(url: string, params?: Record<string, any>) => {
    return baseApi<T>(url, {
      method: 'DELETE',
      params,
    })
  }

  return {
    provide: {
      api: {
        baseApi, // 保留原始请求方法
        get,
        post,
        put,
        delete: del,
      },
    },
  }
})
