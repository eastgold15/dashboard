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
  // handleCrudDialog: (data: T | null, mode: CrudMode, meta?: Partial<MetaData>) => void
  getDeleteBoxTitle: (id: WithId) => string
  getDeleteBoxTitles: (ids: Array<WithId>) => string
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
    // 对参数去掉空值
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] === null || params[key] === undefined || params[key] === '') {
          delete params[key]
        }
      })
    }
    const res = await dataCrudHandler.getList(params)
    if (res.code === 200) {
      // 先执行 onFetchSuccess
      if (dataCrudHandler.onFetchSuccess) {
        await dataCrudHandler.onFetchSuccess()
        console.log('fetchList success')
      }
      // 再赋值 tableData
      tableData.value = res.data
    }
  }

  // 重置表单

  function resetForm(formEl: FormInstance | undefined) {
    console.log('resetForm', formEl)
    if (!formEl) {
      console.error('表单实例未初始化')
      return
    }
    try {
      formEl.resetFields()
      // 重置后重新获取数据
      fetchList()
    }
    catch (error) {
      console.error('重置表单失败:', error)
    }
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
  function handleCrudDialog(data: Nullable<T>, mode: CrudMode, meta?: Partial<MetaData | null>) {
    Object.assign(crudDialogOptions, {
      meta,
      mode,
      data: data || dataCrudHandler.getEmptyModel(),
      visible: true,
    })
  }

  async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl)
      return
    try {
      // 使用 validate 方法进行表单验证
      await formEl.validate(async (valid: boolean) => {
        if (!valid)
          return
        // 表单验证通过，提交表单
        const data = crudDialogOptions.data as T | undefined
        if (!data) {
          ElMessage.error('流程数据错误！')
          return
        }

        crudDialogOptions.loading = true
        const submitData = dataCrudHandler.transformSubmitData?.(data, crudDialogOptions.mode) || data
        if (crudDialogOptions.mode === 'EDIT') {
          const res = await dataCrudHandler.update(submitData.id!, submitData)
          if (res.code === 200) {
            ElMessage.success('修改成功！')
            crudDialogOptions.visible = false
            fetchList()
          }
          else {
            ElMessage.error(res.message ?? '修改失败！')
          }
        }
        else {
          const res = await dataCrudHandler.create(submitData)
          if (res.code === 200) {
            ElMessage.success('添加成功！')
            crudDialogOptions.visible = false
            fetchList()
          }
          else {
            ElMessage.error(res.message ?? '添加失败！')
          }
        }
      })
    }
    catch (error) {
      console.error('表单提交失败:', error)
      ElMessage.error('表单提交失败，请稍后重试')
    }
    finally {
      crudDialogOptions.loading = false
    }
  }

  // 删除数据
  async function handleDeletes(ids: Array<WithId>) {
    ElMessageBox.confirm(`你确定要删除${dataCrudHandler.getDeleteBoxTitles(ids)} 吗？删除后这个${dataCrudHandler.getDeleteBoxTitles(ids)}永久无法找回。`, '是否确认删除', {
      confirmButtonText: '取消',
      cancelButtonText: '确定删除',
      type: 'error',
    })
      .then(() => {
        ElMessage({
          type: 'success',
          message: `已取消删除${dataCrudHandler.getDeleteBoxTitles(ids)}！`,
        })
      })
      .catch(async () => {
        let res
        if (ids.length == 1) {
          res = await dataCrudHandler.delete!(ids[0]!)
        }
        else {
          res = await dataCrudHandler.deletes!(ids)
        }

        if (res.code !== 200) {
          ElMessage.error(res.message || '删除失败！')
          return
        }
        fetchList() // 刷新数据
        ElNotification({
          title: 'Info',
          message: `你永久删除了${dataCrudHandler.getDeleteBoxTitles(ids)}！`,
          type: 'info',
        })
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
    submitForm,
    handleDeletes,
  }
}

export type GenCmsTemplateData = Awaited<ReturnType<typeof genCmsTemplateData>>
