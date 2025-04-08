import type { DataRes, IRes, PageModel, PageRes } from "~/api/base/index.type";

import { List } from "echarts";
import { func } from "vue-types";
import type { FormInstance } from "element-plus";

// // 基础CRUD操作类型
// type CrudOperations<T> = {
//   getList?: (query: Partial<T>) => Promise<PageRes<T>>
//   update?: (id: string | number, data: Partial<T>) => Promise<IRes>
//   create?: (data: Partial<T>) => Promise<DataRes<T>>
//   delete?: (id: string | number) => Promise<IRes>
//   deletes?: (ids: (string | number)[]) => Promise<IRes>
// }

// // 对话框相关类型
// type DialogHandler<T, O> = {
//   handleCrudDialog?: (data: T, mode: CrudMode, meta?: Partial<O>) => void
//   getDeleteBoxTitle: (id: string | number) => string
//   getDeleteBoxTitles: (ids: number[]) => string
// }

// // 生命周期类型
// type LifecycleHooks = {
//   onFetchSuccess?: () => Promise<void>
// }

// // 组合成完整接口
// export interface TemplateCrudHandler<T extends Record<string, any>, PageT extends T, O> 
//   extends CrudOperations<PageT>, DialogHandler<T, O>, LifecycleHooks {
//   getEmptyModel: () => T
// }


export interface TemplateCrudHandler<T extends Record<string, any> & { id: string | number }, PageQuery extends T & { page: number, pageSize: number }, MetaData> {
  getList?: (query: Partial<PageQuery>) => Promise<any>
  update?: (id: string | number, data: Partial<T>) => Promise<any>
  create?: (data: Partial<T>) => Promise<any>
  delete?: (id: string | number) => Promise<any>
  deletes?: (ids: (string | number)[]) => Promise<any>
  handleCrudDialog?: (data: T | null, mode: CrudMode, meta?: Partial<MetaData>) => void
  getDeleteBoxTitle: (id: string | number) => string
  getDeleteBoxTitles: (ids: Array<number>) => string

  getEmptyModel: () => T
  onFetchSuccess?: () => Promise<void>
  transformSubmitData?: (originData: T, mode: CrudMode) => any
}

export type CrudMode = 'NEW' | 'EDIT' | 'READ'

export enum CurdController {
  CREATE = 1,
  REVIEW = 2,
  UPDATE = 4,
  DELETE = 8,
}

export async function genCmsTemplateData<T extends Record<string, any> & { id: number }, PageQuery extends T & { page: number, pageSize: number }, MetaData extends Record<string, any> | null>(
  dataCrudHandler: TemplateCrudHandler<T, PageQuery, MetaData>, // 传入完整的接口
  queryData: Partial<PageQuery>  //2. 传入查询参数类型
) {

  const formLoading = ref(false)

  const tableData = ref<PageModel<T>>({
    items: [],
    meta: {
      currentPage: 0,
      itemCount: 0,
      totalPages: 0,
      itemsPerPage: 20,
      totalItems: 0,
    }
  })

  const searchForm = reactive({
    ...queryData
  })
  const queryParams = computed(() => ({
    page: tableData.value.meta.currentPage,
    pageSize: tableData.value.meta.itemsPerPage,
    ...searchForm
  }))
  // 获取数据方法
  const fetchData = async () => {
    formLoading.value = true
    try {
      // 问题出在 queryParams.value 的类型与 dataCrudHandler.getList 方法期望的 Partial<PageQuery> 类型不兼容
      // 这里将 queryParams.value 类型断言为 Partial<PageQuery> 以解决类型不匹配问题
      const { data: listData } = await dataCrudHandler.getList?.(queryParams.value as Partial<PageQuery>)

      if (listData?.value?.code === 200) {
        tableData.value = listData.value.data
        dataCrudHandler.onFetchSuccess?.()
      }
    } finally {
      formLoading.value = false
    }
  }
  // 初始化获取数据
  await fetchData()
  const handleSearch = () => {
    tableData.value.meta.currentPage = 1
    fetchData()
  }


  const actions = {
    create: async (data: T) => {
      crudDialogOptions.loading = true;
      try {
        const res = await dataCrudHandler.create?.(data);
        if (res?.data?.value?.code === 200) {
          ElMessage.success('创建成功');
          fetchData()
          return true;
        }
      } finally {
        crudDialogOptions.loading = false;
      }
      return false;
    },

    update: async (id: string | number, data: T) => {
      crudDialogOptions.loading = true;
      try {
        const res = await dataCrudHandler.update?.(id, data);
        if (res?.data?.value?.code === 200) {
          ElMessage.success('更新成功');
          fetchData()
          return true;
        }
      } finally {
        crudDialogOptions.loading = false;
      }
      return false;
    },

    delete: async (id: string | number) => {
      try {
        const res = await dataCrudHandler.delete?.(id);
        if (res?.data?.value?.code === 200) {
          ElMessage.success('删除成功');
          fetchData()
          return true;
        }
      } catch (e) {
        console.error(e);
      }
      return false;
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


  function handleCrudDialog(data: T | null, mode: CrudMode, meta?: Partial<MetaData>) {
    Object.assign(crudDialogOptions, {
      meta,
      mode,
      data: data || dataCrudHandler.getEmptyModel(),
      visible: true,
    })
    dataCrudHandler.handleCrudDialog?.(data, mode, meta)
  }
  return {
    tableData,
    searchForm,
    formLoading,
    crudDialogOptions,
    fetchData,
    handleCrudDialog,
    // fetchData,
    // submitForm,

    // handleDeleteData,
    // handleDeleteDatas,
    ...actions,

    resetQueryForm() {
      Object.assign(searchForm, queryData)
    },

  }

  // async function submitForm(formEl: FormInstance | undefined) {
  //   if (!formEl) {
  //     return
  //   }
  //   await formEl.validate(async (vaild: any) => {
  //     if (!vaild) return
  //     const data = crudDialogOptions.data as T | undefined
  //     if (!data) {
  //       ElMessage.error('流程数据错误！')
  //       return
  //     }
  //     crudDialogOptions.loading = true
  //     const submitData = dataCrudHandler.transformSubmitData?.(data, crudDialogOptions.mode) || data

  //     if (crudDialogOptions.mode === 'EDIT') {
  //       const res: any = await dataCrudHandler.update!(submitData.id!, submitData)

  //       if (res.data.value.code === 200) {
  //         ElMessage.success('修改成功！')
  //         crudDialogOptions.visible = false

  //         fetchData()
  //       }
  //       else {
  //         ElMessage.error(res.message ?? '修改失败！')
  //       }
  //     }
  //     else {
  //       const res: any = await dataCrudHandler.create!(data)

  //       if (res.data.value?.code === 200) {
  //         ElMessage.success('添加成功！')
  //         crudDialogOptions.visible = false

  //         fetchData()
  //       }
  //       else {
  //         ElMessage.error(res.message ?? '添加失败！')
  //       }
  //     }

  //     crudDialogOptions.loading = false
  //   })
  // }



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



}

