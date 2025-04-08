// import type { promises } from 'node:dns'

import type { DataRes, IMenuModel, IMenuModelQuery, IRes, PageRes } from '../index.type'

// import type { IDataResponse, IPageResponse, IStandardResponse } from '../index.type'
// import type {
//   IAdminOrder,
//   IAdminOrderQuery,
//   IDeptModelQuery,
//   IDictItemModel,
//   IDictItemModelQuery,
//   IDictTypeModel,
//   IDictTypeModelQuery,
//   IDoc,
//   IDocQuery,

//   IFeedbackModel,
//   IFeedbackModelQuery,

//   IMenuModel,
//   IMenuModelQuery,
//   IParamConfigModel,
//   IParamConfigModelQuery,
//   IRoleModel,
//   IRoleModelQuery,
//   ISubscriptionPlan,
//   ISubscriptionPlanQuery,
//   ITasksModel,
//   ITasksModelQuery,
//   IUserModel,
//   IUserModelQuery,
//   ServeStatInfo,
// } from './cms.type'





// 改为导出一个工厂函数
export function useCmsApi() {
  const { $api } = useNuxtApp()

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
    },
  }
}


