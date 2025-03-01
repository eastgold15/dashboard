
import { reject } from 'lodash-es'
import type { SearchParameters } from 'ofetch'

interface ApiOptions {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
  body?: RequestInit['body'] | Record<string, any>
  params?: SearchParameters
  query?: SearchParameters
  headers?: any[],
  mock?: boolean
}

export const useApi = (url: string, options: ApiOptions) => {

  const runtimeConfig = useRuntimeConfig()
  const nuxtapp = useNuxtApp()
  let baseUrl = runtimeConfig.public.apiBase
  if (options.mock) {
    baseUrl = runtimeConfig.public.apiBase_mock
  }
  return useFetch(url, {
    baseURL: baseUrl,
    onRequest({ options }) {
      console.log("请求配置", options)
      let token = ''
      if (import.meta.client) {
        token = localStorage.getItem('token') || ''
      }

      options.headers = {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      } as unknown as Headers

    },
    onResponse({ response }) {
      console.log("======= response =======\n", response);
      if (response.status >= 200 && response.status < 300) {
        if (response._data.code != 200) {
          if (import.meta.client) {
            ElMessage.error(response._data.code + "" + response._data.message)
          }
          nuxtapp.runWithContext(() => {
            navigateTo({
              path: "/error",
              query: {
                code: response._data.code,
                message: response._data.message
              }
            })
          })
        }
      }


    },
    onResponseError({ }) {

    },
    ...options
  })



}
export const GetApi = (url: string, options?: ApiOptions) => {
  return new Promise((resolve, reject) => {
    useApi(url, {
      method: 'get',
      ...options
    }).then(
      (res) => {
        console.log("get promist", res)

        resolve(res.data.value)
      }
    ).catch((err) => {
      reject(err)
    })

  })
}
export const PostApi = (url: string, options: ApiOptions) => {
  return new Promise((resolve, reject) => {
    useApi(url, {
      method: 'post',
      ...options
    }).then(
      (res) => {
        console.log("get promist", res)
        resolve(res.data.value)
      }
    ).catch((err) => {
      reject(err)
    })
  })
}
