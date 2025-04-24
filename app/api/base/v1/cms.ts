import type { $API, DataRes, IDeptModel, IMenuModel, IMenuModelQuery, IOrgBase, IOrgModel, IRes, IRoleModel, PageRes } from '../index.type'

export function useCmsApi() {
  const { $api } = useNuxtApp()
  return {
    menu: {

      async create(Body: any) {
        return await $api.post<DataRes<void>>('/system/menus', Body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IMenuModel[]>>('/system/menus', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<IMenuModel>>(`/system/menus/${id}`)
      },
      async update(id: string, query: any) {
        return await $api.put<DataRes<void>>(`/system/menus/${id}`, query)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/system/menus/${id}`)
      },
    },
    organization: {
      async create(body: any) {
        return await $api.post<DataRes<void>>('/organization', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IOrgModel[]>>('/organization', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<IOrgModel>>(`/organization/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<void>>(`/organization/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/organization/${id}`)
      },
    },
    user: {
      async create(body: any) {
        return await $api.post<DataRes<void>>('/system/users', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IOrgModel[]>>('/system/users', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<IOrgModel>>(`/system/users/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<void>>(`/system/users/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/system/users/${id}`)
      },
    },
    role: {
      async create(body: any) {
        return await $api.post<DataRes<void>>('/role', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IRoleModel[]>>('/role', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<IRoleModel>>(`/role/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<void>>(`/role/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/role/${id}`)
      },
    },
    dept: {
      async create(body: any) {
        return await $api.post<DataRes<void>>('/system/depts', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IDeptModel[]>>('/system/depts', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<IDeptModel>>(`/system/depts/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<void>>(`/system/depts/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/system/depts/${id}`)
      },
    },
    area: {
      async create(body: any) {
        return await $api.post<DataRes<any>>('/area', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<any[]>>('/area', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<any>>(`/area/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<any>>(`/area/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/area/${id}`)
      },
    },
    device: {
      async create(body: any) {
        return await $api.post<DataRes<any>>('/device', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<any[]>>('/device', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<any>>(`/device/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<any>>(`/device/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/device/${id}`)
      },
    },
    workOrders: {
      async create(body: any) {
        return await $api.post<DataRes<any>>('/workOrders', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<any[]>>('/workOrders', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<any>>(`/workOrders/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<any>>(`/workOrders/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/workOrders/${id}`)
      },
    },
  }
}
