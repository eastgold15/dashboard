<script lang="ts" setup>
import type { FormItemRule, FormRules } from 'element-plus'
import type { Coordinates, IAreaBase, IAreaModel, IAreaModelQuery } from '~/api/base/index.type'
import { useCmsApi } from '@/api/base/index'
import { genCmsTemplateData } from '~/composables/cms/useTemplateGen'

definePageMeta({
  name: '区域管理',
  layout: 'cms',
})

const $crud = useCmsApi().area
const templateData = await genCmsTemplateData<IAreaModel, IAreaModelQuery, null>({
  getList: $crud.list,
  create: $crud.create,
  update: $crud.update,
  delete: $crud.delete,
  getEmptyModel: () => ({
    id: '',
    areaCode: '',
    areaName: '',
    areaType: '',
    level: 1,
    coordinates: { lat: 0, lng: 0 },
    createdAt: '',
    updatedAt: '',
  }),
  getDeleteBoxTitle(id: string) {
    return `删除区域${id}`
  },
  getDeleteBoxTitles(ids: Array<string>) {
    return ` 区域#${ids.join(',')} `
  },
}, {
  areaName: '',
  page: 1,
  pageSize: 50,
})

const { tableData, queryForm, fetchList } = templateData

onMounted(async () => {
  await fetchList()
})

const rules = reactive<FormRules<Partial<IAreaBase>>>({
  areaName: [
    { required: true, message: '请输入区域名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur' },
  ],
  areaCode: [
    { required: true, message: '请输入区域编码', trigger: 'blur' },
    { pattern: /^[A-Z0-9]+$/, message: '只能包含大写字母和数字', trigger: 'blur' },
  ],
  level: [
    { required: true, message: '请选择区域级别', trigger: 'change' },
  ],
})

const queryRules = reactive<Record<string, FormItemRule[]>>({
  areaName: [
    { min: 2, message: '至少2个字符', trigger: 'blur' },
  ],
})

const areaTypes = [
  { value: 'PROVINCE', label: '省份' },
  { value: 'CITY', label: '城市' },
  { value: 'DISTRICT', label: '区县' },
  { value: 'STREET', label: '街道' },
]

const areaLevels = [
  { value: 1, label: '一级' },
  { value: 2, label: '二级' },
  { value: 3, label: '三级' },
  { value: 4, label: '四级' },
]
</script>

<template>
  <CmsCrudTemplate
    generic="TableColumn ,IAreaModelQuery,null"
    name="区域"
    identifier="area"
    :rules="rules"
    :query-rules="queryRules"
    :table-data="tableData"
    :template-data="templateData"
    :crud-controller="15"
    :query-form="queryForm"
  >
    <template #QueryForm>
      <el-form-item prop="areaName" label="区域名称">
        <el-input v-model="queryForm.areaName" placeholder="搜索区域名称" clearable />
      </el-form-item>
      <el-form-item prop="areaType" label="区域类型">
        <el-select v-model="queryForm.areaType" placeholder="选择区域类型" clearable>
          <el-option
            v-for="item in areaTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </template>

    <template #TableColumn>
      <el-table-column label="序号" prop="id" width="80" />
      <el-table-column label="区域编码" prop="areaCode" width="120" />
      <el-table-column label="区域名称" prop="areaName" />
      <el-table-column label="区域类型" prop="areaType" width="100">
        <template #default="{ row }">
          <el-tag>{{ areaTypes.find(t => t.value === row.areaType)?.label || row.areaType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="级别" prop="level" width="80">
        <template #default="{ row }">
          {{ areaLevels.find(l => l.value === row.level)?.label || row.level }}
        </template>
      </el-table-column>
      <el-table-column label="坐标" width="180">
        <template #default="{ row }">
          <span v-if="row.coordinates">
            {{ row.coordinates.lat.toFixed(6) }}, {{ row.coordinates.lng.toFixed(6) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updatedAt" width="180">
        <template #default="{ row }">
          {{ $dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
    </template>

    <template #CrudForm="{ data }">
      <el-form-item label="区域编码" prop="areaCode">
        <el-input v-model="data.areaCode" placeholder="请输入区域编码" />
      </el-form-item>

      <el-form-item label="区域名称" prop="areaName">
        <el-input v-model="data.areaName" placeholder="请输入区域名称" />
      </el-form-item>

      <el-form-item label="区域类型" prop="areaType">
        <el-select v-model="data.areaType" placeholder="请选择区域类型">
          <el-option
            v-for="item in areaTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="区域级别" prop="level">
        <el-select v-model="data.level" placeholder="请选择区域级别">
          <el-option
            v-for="item in areaLevels"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="经纬度坐标" prop="coordinates">
        <div class="flex gap-2">
          <el-input-number
            v-model="data.coordinates.lat"
            :precision="6"
            :step="0.000001"
            placeholder="纬度"
          />
          <el-input-number
            v-model="data.coordinates.lng"
            :precision="6"
            :step="0.000001"
            placeholder="经度"
          />
        </div>
      </el-form-item>
    </template>
  </CmsCrudTemplate>
</template>

<style scoped>
.flex {
  display: flex;
}
.gap-2 {
  gap: 0.5rem;
}
</style>
