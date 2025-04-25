<script lang="ts" setup>
import type { FormItemRule, FormRules } from 'element-plus'
import type { IOrderBase, IOrderModel, IOrderModelQuery } from '~/api/base/index.type'
import { useCmsApi } from '@/api/base/index'
import { genCmsTemplateData } from '~/composables/cms/useTemplateGen'

definePageMeta({
  name: '工单管理',
  layout: 'cms',
})

const $crud = useCmsApi().workOrders
const templateData = await genCmsTemplateData<IOrderModel, IOrderModelQuery, null>({
  getList: $crud.list,
  create: $crud.create,
  update: $crud.update,
  delete: $crud.delete,
  getEmptyModel: () => ({
    id: '',
    orderId: '',
    faultDesc: '',
    faultLevel: 1,
    faultLocation: '',
    faultType: '',
    orderStatus: 0,
    createdAt: '',
    updatedAt: '',
  }),
  getDeleteBoxTitle(id: string) {
    return `删除工单${id}`
  },
  getDeleteBoxTitles(ids: Array<string>) {
    return ` 工单#${ids.join(',')} `
  },
}, {
  orderId: '',
  page: 1,
  pageSize: 50,
})

const { tableData, queryForm, fetchList } = templateData

onMounted(async () => {
  await fetchList()
})

const rules = reactive<FormRules<Partial<IOrderBase>>>({
  orderId: [
    { required: true, message: '请输入工单编号', trigger: 'blur' },
    { pattern: /^[A-Z0-9-]+$/, message: '只能包含大写字母、数字和横线', trigger: 'blur' },
  ],
  faultDesc: [
    { required: true, message: '请输入故障描述', trigger: 'blur' },
    { min: 5, max: 500, message: '长度在5到500个字符', trigger: 'blur' },
  ],
  faultLevel: [
    { required: true, message: '请选择故障等级', trigger: 'change' },
  ],
  faultLocation: [
    { required: true, message: '请输入故障位置', trigger: 'blur' },
  ],
})

const queryRules = reactive<Record<string, FormItemRule[]>>({
  orderId: [
    { min: 3, message: '至少3个字符', trigger: 'blur' },
  ],
})

const faultLevels = [
  { value: 1, label: '一般' },
  { value: 2, label: '重要' },
  { value: 3, label: '紧急' },
]

const orderStatus = [
  { value: 0, label: '待处理', type: 'warning' },
  { value: 1, label: '处理中', type: 'primary' },
  { value: 2, label: '已完成', type: 'success' },
  { value: 3, label: '已取消', type: 'danger' },
]

const faultTypes = [
  '电力故障',
  '网络故障',
  '设备故障',
  '系统故障',
  '其他故障',
]
</script>

<template>
  <CmsCrudTemplate
    generic="TableColumn ,IOrderModelQuery,null"
    name="工单"
    identifier="workOrder"
    :rules="rules"
    :query-rules="queryRules"
    :table-data="tableData"
    :template-data="templateData"
    :crud-controller="15"
    :query-form="queryForm"
  >
    <template #QueryForm>
      <el-form-item prop="orderId" label="工单编号">
        <el-input v-model="queryForm.orderId" placeholder="搜索工单编号" clearable />
      </el-form-item>
      <el-form-item prop="orderStatus" label="工单状态">
        <el-select v-model="queryForm.orderStatus" placeholder="选择工单状态" clearable>
          <el-option
            v-for="item in orderStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </template>

    <template #TableColumn>
      <el-table-column label="工单编号" prop="orderId" width="150" />
      <el-table-column label="故障类型" prop="faultType" width="120" />
      <el-table-column label="故障描述" prop="faultDesc" show-overflow-tooltip />
      <el-table-column label="故障等级" prop="faultLevel" width="100">
        <template #default="{ row }">
          <el-tag :type="row.faultLevel === 3 ? 'danger' : row.faultLevel === 2 ? 'warning' : ''">
            {{ faultLevels.find(l => l.value === row.faultLevel)?.label || row.faultLevel }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="工单状态" prop="orderStatus" width="120">
        <template #default="{ row }">
          <el-tag :type="orderStatus.find(s => s.value === row.orderStatus)?.type">
            {{ orderStatus.find(s => s.value === row.orderStatus)?.label || row.orderStatus }}
          </el-tag>
        </template>
      </el-table-column>
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
      <el-form-item label="工单编号" prop="orderId">
        <el-input v-model="data.orderId" placeholder="请输入工单编号" />
      </el-form-item>

      <el-form-item label="故障类型" prop="faultType">
        <el-select v-model="data.faultType" placeholder="请选择故障类型" filterable allow-create>
          <el-option
            v-for="(type, index) in faultTypes"
            :key="index"
            :label="type"
            :value="type"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="故障等级" prop="faultLevel">
        <el-select v-model="data.faultLevel" placeholder="请选择故障等级">
          <el-option
            v-for="item in faultLevels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="故障位置" prop="faultLocation">
        <el-input v-model="data.faultLocation" placeholder="请输入故障位置" />
      </el-form-item>

      <el-form-item label="故障描述" prop="faultDesc">
        <el-input
          v-model="data.faultDesc"
          type="textarea"
          :rows="3"
          placeholder="请详细描述故障情况"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>

      <el-form-item v-if="templateData.crudDialogOptions.mode === 'EDIT'" label="工单状态" prop="orderStatus">
        <el-select v-model="data.orderStatus" placeholder="请选择工单状态">
          <el-option
            v-for="item in orderStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </template>
  </CmsCrudTemplate>
</template>

<style scoped>
/* 自定义样式 */
</style>
