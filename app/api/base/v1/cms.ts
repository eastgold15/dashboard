import type { $API, DataRes, IMenuModel, IMenuModelQuery, IRes, PageRes } from '../index.type'


export function useCmsApi() {
  const { $api } = useNuxtApp()
  return {
    menu: {
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IMenuModel[]>>('/system/menus', query)
      },
      async create(Body: any) {
        return await $api.post<DataRes<IMenuModel>>('/system/menus', Body)
      },
      async get(id: WithId) {
        return await $api.get<DataRes<IMenuModel>>(`/system/menus/${id}`)
      },
      async update(id: WithId, query: any) {
        debugger
        return await $api.put<DataRes<IMenuModel>>(`/system/menus/${id}`, query)
      },
      async delete(id: WithId) {
        return await $api.delete<DataRes<any>>(`/system/menus/${id}`)
      },
    },
  }
}


