import type { FormInstance } from 'element-plus'
import type { ToRefs, UnwrapRef } from 'vue'
import type { DataRes, PageModel, PageRes } from '~/api/base/index.type'
import { isNil, method, omitBy } from 'lodash-es'

type TransformSubmitData<T> = (
  originData: T,
  mode: CrudMode
) => void// 根据mode动态返回类型

// 定义通用的模板接口 T 是数据类型，PageQuery 是查询参数类型，MetaData 是元数据类型
export interface TemplateCrudHandler<T, TBase, PageQuery, MetaData> {

  // 查询 → 返回带id的数据
  getList: (query: Partial<PageQuery>) => Promise<PageRes<T>>
  // 新增 → 必须用 TBase（禁止传入id）
  create: (data: TBase) => Promise<DataRes<void>>
  // 修改 → 必须用 TModel（强制要求id）
  update: (id: string, data: T) => Promise<DataRes<void>>
  delete?: (id: string) => Promise<any>
  deletes?: (ids: string[]) => Promise<any>
  // 外部处理内部弹窗的方法
  handleCrudDialog?: (data: T, mode: CrudMode, meta?: Partial<MetaData>) => void
  getDeleteBoxTitle: (id: string) => string
  getDeleteBoxTitles: (ids: Array<string>) => string
  // 获取空模型的方法
  // 空模型 → 返回带临时id的模板（如前端生成的uuid）
  getEmptyModel: () => T
  // 回调
  onFetchSuccess?: () => Promise<void>
  // 转换提交数据的方法
  transformSubmitData?: TransformSubmitData<any>
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
 * PageQuery 自带page
 * @param dataCrudHandler
 * @param queryData
 * @returns
 */
export async function genCmsTemplateData<T extends { id: string }, PageQuery, MetaData>(
  dataCrudHandler: TemplateCrudHandler<T, Omit<T, 'id'>, PageQuery, MetaData>, // 传入完整的接口
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
  const queryForm = reactive<Partial<PageQuery>>({ ...queryData })
  // 2. 查询参数计算属性（自动合并分页和表单数据）
  const queryParams = computed<Partial<PageQuery>>(() => ({
    page: tableData.value.meta.currentPage,
    pageSize: tableData.value.meta.itemsPerPage,
    ...toRaw(queryForm),
  }) as Partial<PageQuery>)

  // 获取数据方法  因为使用服务端渲染，所以必须这里完成数据的获取
  // const fetchList = async (params: Nullable<Partial<PageQuery>> = queryParams.value) => {
  //   // 对参数去掉空值
  //   if (params) {
  //     Object.keys(params).forEach((key) => {
  //       if (params[key] === null || params[key] === undefined || params[key] === '') {
  //         delete params[key]
  //       }
  //     })
  //   }
  //   const res = await dataCrudHandler.getList(params)
  //   if (res.code === 200) {
  //     // 先执行 onFetchSuccess
  //     if (dataCrudHandler.onFetchSuccess) {
  //       await dataCrudHandler.onFetchSuccess()
  //       console.log('fetchList success')
  //     }
  //     // 再赋值 tableData
  //     tableData.value = res.data
  //   }
  // }
  // 新fetch
  const fetchList = async (params: Partial<PageQuery> = queryParams.value) => {
    const safeParams = omitBy(params, v => v == null || v === '') as Partial<PageQuery>
    const { code, data } = await dataCrudHandler.getList(safeParams)

    code === 200 && await Promise.all([
      dataCrudHandler.onFetchSuccess?.(),
      (tableData.value = data),
    ])
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
  interface CrudDialogOptions {
    visible: boolean
    mode: CrudMode
    data: T | null
    loading: boolean
    meta: Partial<MetaData> | undefined
  }

  const crudDialogOptions = ref<CrudDialogOptions>({
    visible: false,
    mode: 'NEW',
    data: null,
    loading: false,
    meta: undefined,
  })
  function handleCrudDialog(data: Nullable<T>, mode: CrudMode, meta?: Partial<MetaData>) {
    crudDialogOptions.value = {
      ...crudDialogOptions.value,
      mode,
      meta,
      data: data || dataCrudHandler.getEmptyModel(),
      visible: true,
    }
    dataCrudHandler.handleCrudDialog?.(data!, mode, meta)
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
        const data = crudDialogOptions.value.data
        // vue 响应式的其中值类型都是  UnwrapRef包裹  要么使用 显示声明  或者 深拷贝
        // const rawData = JSON.parse(JSON.stringify(data)); // 深拷贝，移除响应式
        if (!data) {
          ElMessage.error('流程数据错误！')
          return
        }

        crudDialogOptions.value.loading = true

        // 修改点1：改为无返回值的修改方式  引用修改

        dataCrudHandler.transformSubmitData?.(data as T, crudDialogOptions.value.mode)

        // 修改点2：直接使用修改后的data
        // toraw移除响应式引用 消除UnwrapRef类型
        const submitData = toRaw(data) as T
        let res
        if (crudDialogOptions.value.mode === 'EDIT') {
          res = await dataCrudHandler.update(submitData.id!, submitData)
          res.code === 200
            ? ElMessage.success('修改成功！')
            : ElMessage.error(res.message ?? '修改失败！')
        }
        //
        else {
          // UnwrapRef
          res = await dataCrudHandler.create(submitData)
          res.code === 200
            ? ElMessage.success('添加成功！')
            : ElMessage.error(res.message ?? '添加失败！')
        }

        // 统一处理成功后的逻辑
        if (res?.code === 200) {
          crudDialogOptions.value.visible = false
          await fetchList()
        }
      })
    }
    catch (error) {
      console.error('表单提交失败:', error)
      ElMessage.error('表单提交失败，请稍后重试')
    }
    finally {
      crudDialogOptions.value.loading = false
    }
  }

  // 删除数据
  async function handleDeletes(ids: Array<string>) {
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
        if (ids.length === 1) {
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

  const result = {
    // 重置表单

    tableData,
    queryForm,
    formLoading,
    crudDialogOptions,
    resetForm,
    FormSearch,
    handleCrudDialog,
    fetchList,
    submitForm,
    handleDeletes,
  }

  // 1.
  // return result as unknown as
  //   {
  //     [K in keyof typeof result]: UnpackRef<(typeof result)[K]>
  //   } & { __genericTypes: [T, PageQuery, MetaData] } // 保留泛型标记

  // 2. 手动指定返回类型
  type ResultType<T, PQ, MD> = {
    // Ref 属性保持响应式类型
    tableData: Ref<PageModel<T[]>>
    formLoading: Ref<boolean>
    crudDialogOptions: Ref<CrudDialogOptions>
    queryForm: Ref<PageQuery>
    // 方法/普通对象属性
    resetForm: (formEl: FormInstance | undefined) => void
    FormSearch: (formEl: FormInstance | undefined, param?: Partial<PQ>) => Promise<void>
    handleCrudDialog: (data: Nullable<T>, mode: CrudMode, meta?: Partial<MD>) => void
    fetchList: (param?: Partial<PQ>) => Promise<void>
    submitForm: (formEl: FormInstance | undefined) => Promise<void>
    handleDeletes: (ids: Array<string>) => Promise<void>

  } & { __genericTypes: [T, PQ, MD] }
  return result as unknown as ResultType<T, PageQuery, MetaData>

  // const result = {
  //   // 重置表单

  //   data:{
  //     tableData,
  //     queryForm,
  //     formLoading,
  //     crudDialogOptions,
  //   },
  //   method:{
  //   resetForm,
  //   FormSearch,
  //   handleCrudDialog,
  //   fetchList,
  //   submitForm,
  //   handleDeletes,
  //   }

  // }
  // return result as unknown as WithGenerics<
  //   ToRefs<typeof result>,
  //   [T, PageQuery, MetaData]
  // >
}

// 自动提取类型（使用时不需要手动定义）
export type GenCmsTemplateData<T extends { id: string }, PageQuery, MetaData> =
  UnPromisify<ReturnType<typeof genCmsTemplateData<T, PageQuery, MetaData>>>

// Awaited 用于响应式
// export type GenCmsTemplateData = Awaited<ReturnType<typeof genCmsTemplateData>>

// 3. vue官方
// import type { ToRefs } from 'vue'
// type WithGenerics<T, G extends any[]> = T & { __genericTypes: G }
// return result as unknown as WithGenerics<
//   ToRefs<typeof result>,
//   [T, PageQuery, MetaData]
// >
