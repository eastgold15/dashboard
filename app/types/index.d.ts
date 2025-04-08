// types/index.d.ts
declare module '#app' {
  interface NuxtApp {
    $api: {
      baseApi: <T>(url: string, options?: RequestInit) => Promise<T>,
      get: <T>(url: string, options?: RequestInit) => Promise<T>,
      post: <T>(url: string, body: any, options?: RequestInit) => Promise<T>,
      put: <T>(url: string, body: any, options?: RequestInit) => Promise<T>,
      delete: <T>(url: string, options?: RequestInit) => Promise<T>
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: {
      baseApi: <T>(url: string, options?: RequestInit) => Promise<T>
      get: <T>(url: string, options?: RequestInit) => Promise<T>,
      post: <T>(url: string, body: any, options?: RequestInit) => Promise<T>,
      put: <T>(url: string, body: any, options?: RequestInit) => Promise<T>,
      delete: <T>(url: string, options?: RequestInit) => Promise<T>
    }
  }
}

export { }
