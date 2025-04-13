
import type { $API, DataRes, IMenuModel, IMenuModelQuery, IRes, PageRes } from '../index.type'
const { $api } = useNuxtApp()
export function useCmsApi($api: $API) {

  return {
    menu: {
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await useAPI.get<IMenuModelQuery, PageRes<IMenuModel[]>>('/system/menus', query)
      },
      async create(Body: any) {
        return await $api.post<DataRes<IMenuModel>>('/system/menus', Body)
      },
      async get(id: number | string) {
        return await $api.get<DataRes<IMenuModel>>(`/system/menus/${id}`)
      },
      async update(id: number | string, query: any) {
        return await $api.put<DataRes<IMenuModel>>(`/system/menus/${id}`, query)
      },
      async delete(id: number | string) {
        return await $api.delete<DataRes<any>>(`/system/menus/${id}`)
      },
    }
  }

}

export const CmsApi = useCmsApi($api)


