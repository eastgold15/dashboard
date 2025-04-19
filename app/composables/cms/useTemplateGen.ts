import type { FormInstance } from 'element-plus'

import type { PageModel } from '~/api/base/index.type'

// 定义通用的模板接口 T 是数据类型，PageQuery 是查询参数类型，MetaData 是元数据类型
export interface TemplateCrudHandler<T extends AnyObject & WithId, PageQuery extends PageDto<T>, MetaData> {
  getList: (query: Nullable<Partial<PageQuery>>) => Promise<any>
  update: (id: WithId, data: Partial<T>) => Promise<any>
  create: (data: Partial<T>) => Promise<any>
  delete?: (id: WithId) => Promise<any>
  deletes?: (ids: WithId[]) => Promise<any>
  // 处理弹窗的方法
  handleCrudDialog?: (data: T | null, mode: CrudMode, meta?: Partial<MetaData>) => void
  getDeleteBoxTitle: (id: string | number) => string
  getDeleteBoxTitles: (ids: Array<number>) => string
  // 获取空模型的方法
  getEmptyModel: () => T
  // 回调
  onFetchSuccess?: () => Promise<void>
  // 转换提交数据的方法
  transformSubmitData?: (originData: T, mode: CrudMode) => any
}

export type CrudMode = 'NEW' | 'EDIT' | 'READ'

/**
 * CRUD 操作类型枚举
 */
export enum CurdController {
  CREATE = 1,
  REVIEW = 2,
  UPDATE = 4,
  DELETE = 8,
}

/**
 * 传入
 * @param dataCrudHandler
 * @param queryData
 * @returns
 */
export async function genCmsTemplateData<T extends AnyObject & WithId, PageQuery extends PageDto<T>, MetaData>(
  dataCrudHandler: TemplateCrudHandler<T, PageQuery, MetaData>, // 传入完整的接口
  queryData: Partial<PageQuery>, // 2. 传入查询参数类型
) {
  // 表单加载状态
  const formLoading = ref(false)

  // 表格数据
  const tableData = ref<PageModel<T>>({
    items: [],
    meta: {
      currentPage: 0,
      itemCount: 0,
      totalPages: 0,
      itemsPerPage: 20,
      totalItems: 0,
    },
  })

  // 搜索表单
  const queryForm = reactive<Partial<PageQuery>>({
    ...queryData,
  })
  // 查询参数
  const queryParams = computed<PageDto<Partial<PageQuery>>>(() => {
    const params = {
      page: tableData.value.meta.currentPage,
      pageSize: tableData.value.meta.itemsPerPage,
      ...queryForm,
    }
    return params as PageDto<Partial<PageQuery>>
  })
  // 获取数据方法  因为使用服务端渲染，所以必须这里完成数据的获取
  const fetchList = async (params: Nullable<Partial<PageQuery>> = queryParams.value) => {
    console.log('params:', params)
    // 对参数去掉空值
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] === null || params[key] === undefined || params[key] === '') {
          delete params[key]
        }
      })
    }
    const { data: listData, refresh } = await dataCrudHandler.getList(params)
    if (listData?.value.code === 200) {
      tableData.value = listData.value.data
      dataCrudHandler.onFetchSuccess?.()
    }
    return {
      listData,
      refresh,
    }
  }
  // 初始化数据
  const { refresh: refreshList } = await fetchList()

  // 重置表单
  function resetForm(formEl: FormInstance | undefined) {
    if (!formEl)
      return
    formEl.resetFields()
  }

  // 搜索表单
  const FormSearch = async (formEl: FormInstance | undefined, param: Partial<PageQuery> = queryParams.value) => {
    if (!formEl || !formEl.validate) {
      console.warn('表单实例无效或验证方法不存在')
      await fetchList(param) // 即使验证失败也执行查询
      return
    }

    try {
      await formEl.validate(async (valid) => {
        if (valid) {
          await fetchList(param)
        }
      })
    }
    catch (error) {
      console.error('表单验证错误:', error)
      // 可以选择在这里处理错误或继续执行查询
      await fetchList(param)
    }
  }

  const crudDialogOptions = reactive<{
    visible: boolean
    mode: CrudMode
    data: T | null
    loading: boolean
    meta: Partial<MetaData>
  }>({
    visible: false,
    mode: 'NEW',
    data: null,
    loading: false,
    meta: {},
  })
  //
  function handleCrudDialog(data: Nullable<T>, mode: CrudMode, meta?: Partial<MetaData>) {
    Object.assign(crudDialogOptions, {
      meta,
      mode,
      data: data || dataCrudHandler.getEmptyModel(),
      visible: true,
    })
  }

  const actions = {
    create: async (data: T) => {
      crudDialogOptions.loading = true
      try {
        const { data: create } = await dataCrudHandler.create(data)
        if (create.code === 200) {
          ElMessage.success('创建成功')
          refreshList()
          return true
        }
      }
      finally {
        crudDialogOptions.loading = false
      }
      return false
    },

    update: async (id: WithId, data: T) => {
      crudDialogOptions.loading = true
      try {
        const { data: update } = await dataCrudHandler.update(id, data)
        if (update.code === 200) {
          ElMessage.success('更新成功')
          refreshList()
          return true
        }
      }
      finally {
        crudDialogOptions.loading = false
      }
      return false
    },

    delete: async (id: WithId) => {
      try {
        const { data } = await dataCrudHandler.delete?.(id)
        if (data.code === 200) {
          ElMessage.success('删除成功')
          refreshList()
          return true
        }
      }
      catch (e) {
        console.error(e)
      }
      return false
    },
  }

  async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) {
      return
    }
    await formEl.validate(async (vaild: any) => {
      if (!vaild)
        return
      const data = crudDialogOptions.data as T | undefined
      if (!data) {
        ElMessage.error('流程数据错误！')
        return
      }
      crudDialogOptions.loading = true
      const submitData = dataCrudHandler.transformSubmitData?.(data, crudDialogOptions.mode) || data

      if (crudDialogOptions.mode === 'EDIT') {
        const { data: EDIT } = await dataCrudHandler.update!(submitData.id!, submitData)

        if (EDIT.code === 200) {
          ElMessage.success('修改成功！')
          crudDialogOptions.visible = false
          fetchList()
        }
        else {
          ElMessage.error(EDIT.message ?? '修改失败！')
        }
      }
      else {
        const { data: create } = await dataCrudHandler.create!(data)

        if (create.code === 200) {
          ElMessage.success('添加成功！')
          crudDialogOptions.visible = false
          fetchList()
        }
        else {
          ElMessage.error(create.message ?? '添加失败！')
        }
      }
      crudDialogOptions.loading = false
    })
  }

  return {
    // 重置表单
    resetForm,
    FormSearch,
    fetchList,
    tableData,
    queryForm,
    formLoading,
    handleCrudDialog,
    crudDialogOptions,
    ...actions,
    submitForm,
  }
}

export type GenCmsTemplateData = Awaited<ReturnType<typeof genCmsTemplateData>>

// async function handleDeleteDatas(ids: Array<number>) {
//   ElMessageBox.confirm(`你确定要删除${dataCrudHandler.getDeleteBoxTitles(ids)} 吗？删除后这个${dataCrudHandler.getDeleteBoxTitles(ids)}永久无法找回。`, '是否确认删除', {
//     confirmButtonText: '取消',
//     cancelButtonText: '确定删除',
//     type: 'error',
//   })
//     .then(() => {
//       ElMessage({
//         type: 'success',
//         message: `已取消删除${dataCrudHandler.getDeleteBoxTitles(ids)}！`,
//       })
//     })
//     .catch(async () => {
//       const res = await dataCrudHandler.deletes!(ids)

//       if (res.data.value.code !== 200) {
//         ElMessage.error(res.message || '删除失败！')
//         return
//       }

//       fetchData() // 刷新数据

//       ElNotification({
//         title: 'Info',
//         message: `你永久删除了${dataCrudHandler.getDeleteBoxTitles(ids)}！`,
//         type: 'info',
//       })
//     })
// }

// async function handleDeleteData(id: string | number) {
//   ElMessageBox.confirm(`你确定要删除${dataCrudHandler.getDeleteBoxTitle(id)} 吗？删除后这个${dataCrudHandler.getDeleteBoxTitle(id)}永久无法找回。`, '是否确认删除', {
//     confirmButtonText: '取消',
//     cancelButtonText: '确定删除',
//     type: 'error',
//   })
//     .then(() => {
//       ElMessage({
//         type: 'success',
//         message: `已取消删除${dataCrudHandler.getDeleteBoxTitle(id)}！`,
//       })
//     })
//     .catch(async () => {
//       const res = await dataCrudHandler.delete!(id)

//       if (res.data.value.code !== 200) {
//         ElMessage.error(res.message || '删除失败！')
//         return
//       }

//       fetchData() // 刷新数据

//       ElNotification({
//         title: 'Info',
//         message: `你永久删除了${dataCrudHandler.getDeleteBoxTitle(id)}！`,
//         type: 'info',
//       })
//     })
// }
