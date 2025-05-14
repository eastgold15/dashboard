import type { $API, DataRes, IAreaModel, IDeptModel, IDeviceModel, IMenuModel, IMenuModelQuery, IOrderModel, IOrgBase, IOrgModel, IRes, IRoleModel, IUserModel, PageRes } from '../index.type'

export function useCmsApi() {
  const { $api } = useNuxtApp()
  return {
    menu: {

      async create(Body: any) {
        return await $api.post<DataRes<void>>('/system/menus', Body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IMenuModel>>('/system/menus', query)
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
        return await $api.get<PageRes<IOrgModel>>('/organization', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<IOrgModel>>(`/organization/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<void>>(`/organization/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<void>>(`/organization/${id}`)
      },
    },
    user: {
      async create(body: any) {
        return await $api.post<DataRes<void>>('/system/users', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IUserModel>>('/system/users', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<IUserModel>>(`/system/users/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<void>>(`/system/users/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<void>>(`/system/users/${id}`)
      },
    },
    role: {
      async create(body: any) {
        return await $api.post<DataRes<void>>('/system/roles', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IRoleModel>>('/system/roles', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<IRoleModel>>(`/system/roles/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<void>>(`/system/roles/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/system/roles/${id}`)
      },
    },
    dept: {
      async create(body: any) {
        return await $api.post<DataRes<void>>('/system/depts', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<DataRes<IDeptModel[]>>('/system/depts', query)
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
        return await $api.get<PageRes<IAreaModel>>('/area', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<any>>(`/area/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<IAreaModel>>(`/area/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/area/${id}`)
      },
    },
    device: {
      async create(body: any) {
        return await $api.post<DataRes<any>>('/device/create', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IDeviceModel>>('/device/listPage', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<any>>(`/device/${id}`)
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<IDeviceModel>>(`/device/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/device/${id}`)
      },
    },
    workOrders: {
      async create(body: any) {
        return await $api.post<DataRes<any>>('/work-orders/report', body)
      },
      async list(query: any = { page: 1, pageSize: 50 }) {
        return await $api.get<PageRes<IOrderModel>>('/work-orders/list', query)
      },
      async get(id: string) {
        return await $api.get<DataRes<any>>(`/work-orders/records`, { orderId: id })
      },
      async update(id: string, body: any) {
        return await $api.put<DataRes<IOrderModel>>(`/work-orders/${id}`, body)
      },
      async delete(id: string) {
        return await $api.delete<DataRes<any>>(`/work-orders/${id}`)
      },
    },
  }
}
