<script lang="ts" setup>
import type { FormItemRule, FormRules } from 'element-plus'
import type { IRoleBase, IRoleModel, IRoleModelQuery } from '~/api/base/index.type'
import { useCmsApi } from '@/api/base/index'
import { genCmsTemplateData } from '~/composables/cms/useTemplateGen'

definePageMeta({
  name: '角色管理',
  layout: 'cms',
})

const $crud = useCmsApi().role
const templateData = await genCmsTemplateData<IRoleModel, IRoleModelQuery, null>({
  getList: $crud.list,
  create: $crud.create,
  update: $crud.update,
  delete: $crud.delete,
  getEmptyModel: () => ({
    id: '0',
    name: '',
    value: '',
    status: 1,
    remark: '',
    menuIds: [],
  }),
  getDeleteBoxTitle(id: string) {
    return `删除角色${id}`
  },
  getDeleteBoxTitles(ids: Array<string>) {
    return ` 角色#${ids.join(',')} `
  },
}, {
  name: '',
  page: 1,
  pageSize: 50,
})

const { tableData, queryForm, fetchList } = templateData

onMounted(async () => {
  await fetchList()
  await loadMenus()
})

// 菜单数据
const menuTree = ref<any[]>([])
const loadMenus = async () => {
  const res = await useCmsApi().menu.list({ page: 1, pageSize: 1000 })
  menuTree.value = res.data.items
}

const rules = reactive<FormRules<Partial<IRoleBase>>>({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在2到20个字符', trigger: 'blur' },
  ],
  value: [
    { required: true, message: '请输入角色值', trigger: 'blur' },
    { pattern: /^[a-z_]+$/i, message: '只能包含字母和下划线', trigger: 'blur' },
  ],
  status: [
    { required: true, message: '请选择状态', trigger: 'change' },
  { type: 'number', message: '必须为数字值' }
  ],
  menuIds: [
    { type: 'array', required: true, message: '请至少选择一个菜单权限', trigger: 'change' }
  ]
})

const queryRules = reactive<Record<string, FormItemRule[]>>({
  name: [
    { min: 2, message: '至少2个字符', trigger: 'blur' },
  ],
  value: [
    { pattern: /^[a-z_]+$/i, message: '只能包含字母和下划线', trigger: 'blur' },
  ],
})
</script>

<template>
  <CmsCrudTemplate
    generic="TableColumn ,IRoleModelQuery,null"
    name="角色"
    identifier="role"
    :rules="rules"
    :query-rules="queryRules"
    :table-data="tableData"
    :template-data="templateData"
    :crud-controller="15"
    :query-form="queryForm"
  >
    <template #QueryForm>
      <el-form-item prop="name" label="角色名称">
        <el-input v-model="queryForm.name" placeholder="搜索角色名称" clearable />
      </el-form-item>
      <el-form-item prop="value" label="角色值">
        <el-input v-model="queryForm.value" placeholder="搜索角色值" clearable />
      </el-form-item>
    </template>

    <template #TableColumn>
      <el-table-column label="序号" prop="id" width="80" />
      <el-table-column label="角色名称" prop="name" />
      <el-table-column label="角色值" prop="value" />
      <el-table-column label="备注" prop="remark" />
      <el-table-column label="状态" prop="status" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updatedAt" width="180">
        <template #default="{ row }">
          {{ $dayjs(row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
    </template>

    <template #CrudForm="{ data }">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="data.name" placeholder="请输入角色名称" />
      </el-form-item>

      <el-form-item label="角色值" prop="value">
        <el-input v-model="data.value" placeholder="请输入角色值(英文)" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="data.status">
          <el-radio :label="1">
            启用
          </el-radio>
          <el-radio :label="0">
            禁用
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="菜单权限" prop="menuIds">
        <el-tree
          ref="menuTreeRef"
          :data="menuTree"
          show-checkbox
          node-key="id"
          :props="{
            label: 'name',
            children: 'children'
          }"
          :default-checked-keys="data.menuIds"
          @check="(node, checked) => data.menuIds = checked.checkedKeys"
        />
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="data.remark"
          type="textarea"
          :rows="3"
          placeholder="请输入备注信息"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
    </template>
  </CmsCrudTemplate>
</template>

<style scoped>
/* 可以添加自定义样式 */
.el-tree {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}
</style>
