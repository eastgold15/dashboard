// import { genCmsTemplateData } from "./template-generator"

// // 新增严格类型约束的接口
// export interface CrudHandler<T extends Record<string, any>, O = any> {
//   getEmptyModel: () => T
//   transformSubmitData?: (data: T, mode: CrudMode) => any
//   getDeleteTitle: (id: string | number) => string
//   getDeleteTitles?: (ids: Array<number>) => string
//   onFetchSuccess?: () => Promise<void>
// }

// // interface CrudOptions<T, Q = Partial<T>> {
// //   apiPath: string
// //   defaultQuery?: Q
// //   defaultForm?: Partial<T>
// //   transform?: (data: any) => T[]
// //   // 新增模板范式中的处理函数
// //   handlers?: {
// //     getEmptyModel?: () => T
// //     transformSubmitData?: (data: T, mode: CrudMode) => any
// //     onFetchSuccess?: () => Promise<void>
// //     getDeleteTitle?: (id: number | string) => string
// //     getDeleteTitles?: (ids: Array<number>) => string
// //   }
// // }

// interface CrudOptions<T extends Record<string, any>, Q > {
//   apiPath: string
//   handlers: CrudHandler<T>
//   defaultQuery?: Q
//   defaultForm?: Partial<T>
// }

// export type CrudMode = 'NEW' | 'EDIT' | 'READ'



// export function useCrud<T extends Record<string, any>, Q = Partial<T>>(options: CrudOptions<T, Q>){

//   genCmsTemplateData(dataHandler, queryData)

// }

// // export function useCrud<T, Q = Partial<T>>(options: CrudOptions<T, Q>) {
// //   const { apiPath, defaultQuery = {}, defaultForm = {}, transform, handlers = {} } = options

// //   // 状态管理
// //   const tableData = ref<T[]>([])
// //   // 初始化 列表数据
// //   const { data: rawData, refresh } = useAPI.get(apiPath, null, {
// //     key: `${apiPath}-list`,
// //     transform: (res) => transform ? transform(res.data) : res.data ?? []
// //   })
// //   tableData.value = rawData.value?.data || []
// //   const queryParams = reactive({ ...defaultQuery }) as Q

// //   const loading = ref(false)

// //   const dialogOptions = reactive({
// //     visible: false,
// //     mode: 'NEW' as CrudMode,
// //     data: handlers.getEmptyModel?.() || { ...defaultForm },
// //     loading: false,
// //     meta: {} as Record<string, any>
// //   })

// //   // API调用封装
// //   const api = {
// //     fetch: async (params?: Q) => {
// //       loading.value = true
// //       const { data } = await useAPI.get(apiPath, params || queryParams, {
// //         key: `${apiPath}-query`,
// //         transform: (res) => transform ? transform(res.data) : res.data ?? [],
// //         server: false
// //       })
// //       tableData.value = data.value?.data || []
// //       loading.value = false
// //       await handlers.onFetchSuccess?.()
// //       return data.value
// //     },
// //     create: async (data: Partial<T>) => {
// //       const submitData = handlers.transformSubmitData?.(data as T, 'NEW') || data
// //       return useAPI.post(apiPath, submitData, {
// //         transform: (res) => transform ? transform(res.data) : res.data ?? [],
// //       })
// //     },
// //     update: async (id: number | string, data: Partial<T>) => {
// //       const submitData = handlers.transformSubmitData?.(data as T, 'EDIT') || data
// //       return useAPI.put(`${apiPath}/${id}`, submitData, {
// //         transform: (res) => transform ? transform(res.data) : res.data ?? [],
// //       })
// //     },
// //     delete: async (id: number | string) => useAPI.delete(`${apiPath}/${id}`),
// //     deleteBatch: async (ids: number[]) => useAPI.delete(`${apiPath}/batch`, { ids })
// //   }

// //   // 操作方法
// //   const actions = {
// //     fetch: api.fetch,
// //     create: async (data: Partial<T>) => {
// //       dialogOptions.loading = true
// //       const res = await api.create(data)
// //       if (res.data.value.code === 200) {
// //         ElMessage.success('创建成功')
// //         dialogOptions.visible = false
// //         await actions.fetch()
// //       }
// //       dialogOptions.loading = false
// //       return res.data.value
// //     },
// //     update: async (id: number | string, data: Partial<T>) => {
// //       dialogOptions.loading = true
// //       const res = await api.update(id, data)
// //       if (res.data.value.code === 200) {
// //         ElMessage.success('更新成功')
// //         dialogOptions.visible = false
// //         await actions.fetch()
// //       }
// //       dialogOptions.loading = false
// //       return res.data.value
// //     },
// //     delete: async (id: number | string) => {
// //       const res = await api.delete(id)
// //       if (res.data.value.code === 200) {
// //         ElMessage.success('删除成功')
// //         await actions.fetch()
// //       }
// //       return res.data.value
// //     },
// //     deleteBatch: async (ids: number[]) => {
// //       const res = await api.deleteBatch(ids)
// //       if (res.data.value.code === 200) {
// //         ElMessage.success('批量删除成功')
// //         await actions.fetch()
// //       }
// //       return res.data.value
// //     },
// //     openDialog: (data: Partial<T> | null, mode: CrudMode, meta?: Record<string, any>) => {
// //       dialogOptions.mode = mode
// //       dialogOptions.visible = true
// //       dialogOptions.data = data || handlers.getEmptyModel?.() || { ...defaultForm }
// //       dialogOptions.meta = meta || {}
// //     },
// //     confirmDelete: (id: number | string) => {
// //       const title = handlers.getDeleteTitle?.(id) || `ID为 ${id} 的记录`
// //       return ElMessageBox.confirm(
// //         `确定要删除 ${title} 吗？此操作不可恢复`,
// //         '确认删除',
// //         { confirmButtonText: '取消', cancelButtonText: '确定删除', type: 'error' }
// //       )
// //     }
// //   }

// //   return {
// //     tableData,
// //     queryParams,
// //     dialogOptions,
// //     loading,
// //     ...actions
// //   }
// // }
