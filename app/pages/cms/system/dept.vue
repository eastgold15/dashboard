<script lang="ts" setup>
import type { FormItemRule, FormRules } from 'element-plus'
import type { IDeptBase, IDeptModel, IDeptModelQuery } from '~/api/base/index.type'
import { useCmsApi } from '@/api/base/index'
import { genCmsTemplateData } from '~/composables/cms/useTemplateGen'

definePageMeta({
  name: '部门管理',
  layout: 'cms',
})

const $crud = useCmsApi().dept
const templateData = await genCmsTemplateData<IDeptModel, IDeptModelQuery, null>({
  getList: $crud.list,
  create: $crud.create,
  update: $crud.update,
  delete: $crud.delete,
  getEmptyModel: () => ({
    id: '',
    name: '',
    orderNo: 0,
    parent: undefined,
    createdAt: '',
    updatedAt: '',
    creator: null,
    updater: null,
  }),
  getDeleteBoxTitle(id: string) {
    return `删除部门${id}`
  },
  getDeleteBoxTitles(ids: Array<string>) {
    return ` 部门#${ids.join(',')} `
  },
}, {
  name: '',
  page: 1,
  pageSize: 50,
})

const { tableData, queryForm, fetchList } = templateData

onMounted(async () => {
  await fetchList()
})

const rules = reactive<FormRules<IDeptBase>>({
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' },
  ],
  orderNo: [
    { required: true, message: '请输入排序号', trigger: 'blur' },
    { type: 'number', message: '必须为数字', trigger: 'blur' },
  ],
})

const queryRules = reactive<Record<string, FormItemRule[]>>({
  name: [
    { min: 2, message: '至少2个字符', trigger: 'blur' },
  ],
})

const deptWithRoot = computed(() =>
  ([{ id: '-1', name: '顶级部门', children: [...tableData.value.items] }]))
</script>

<template>
  <CmsCrudTemplate
    generic="TableColumn ,IDeptModelQuery,null"
    name="部门"
    identifier="dept"
    :rules="rules"
    :query-rules="queryRules"
    :table-data="tableData"
    :template-data="templateData"
    :crud-controller="15"
    :query-form="queryForm"
  >
    <template #QueryForm>
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="queryForm.name" placeholder="搜索部门名称" clearable />
      </el-form-item>
    </template>

    <template #TableColumn>
      <el-table-column label="序号" prop="id" width="80" />
      <el-table-column label="部门名称" prop="name" />
      <el-table-column label="排序号" prop="orderNo" width="100" />
      <el-table-column label="上级部门" prop="parent.name" />
      <el-table-column label="创建时间" prop="createdAt" width="180">
        <template #default="{ row }">
          {{ $dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updatedAt" width="180">
        <template #default="{ row }">
          {{ $dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
    </template>

    <template #CrudForm="{ data }">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="data.name" placeholder="请输入部门名称" />
      </el-form-item>

      <el-form-item label="上级部门" prop="parent">
        <el-tree-select
          v-model="data.parent"
          :data="deptWithRoot"
          :props="{
            label: 'name',
            value: 'id',
            children: 'children',
          }"
          check-strictly
          placeholder="请选择上级部门"
          clearable
        />
      </el-form-item>

      <el-form-item label="排序号" prop="orderNo">
        <el-input-number
          v-model="data.orderNo"
          :min="0"
          :max="999"
          controls-position="right"
        />
      </el-form-item>
    </template>
  </CmsCrudTemplate>
</template>

<style scoped>
/* 自定义样式 */
</style>
