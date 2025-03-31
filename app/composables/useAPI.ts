import type { UseFetchOptions } from 'nuxt/app'

// 合并后的统一 API
export function useAPI<T = any>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {},
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}

// 为不同 HTTP 方法添加快捷方式（添加 BodyType 类型约束）
type BodyType = string | Record<string, any> | Blob | ArrayBuffer | FormData | URLSearchParams

useAPI.get = <D = Record<string, any>, R = any>(
  url: string | (() => string),
  data?: D,
  options: UseFetchOptions<R> = {},
) => {
  return useAPI<R>(url, {
    method: 'GET',
    ...options,
    query: { ...data, ...options.query } as D & typeof options.query,
  })
}

useAPI.post = <D extends BodyType = Record<string, any>, R = any>(
  url: string | (() => string),
  data?: D,
  options: UseFetchOptions<R> = {},
) => {
  return useAPI<R>(url, {
    method: 'POST',
    ...options,
    body: data as D, // 添加类型断言确保类型安全
  })
}

// 统一为 PUT/DELETE 方法添加相同约束
useAPI.put = <D extends BodyType = Record<string, any>, R = any>(
  url: string | (() => string),
  data?: D,
  options: UseFetchOptions<R> = {},
) => {
  return useAPI<R>(url, {
    method: 'PUT',
    ...options,
    body: data as D,
  })
}

useAPI.delete = <D extends BodyType = Record<string, any>, R = any>(
  url: string | (() => string),
  data?: D,
  options: UseFetchOptions<R> = {},
) => {
  return useAPI<R>(url, {
    method: 'DELETE',
    ...options,
    body: data as D,
  })
}
