<script lang="ts" setup>
import type { FormItemRule, FormRules } from 'element-plus'
import type { IMenuBase, IMenuModel, IMenuModelQuery, IOrgModel, IOrgModelQuery } from '~/api/base/index.type'
import { useCmsApi } from '@/api/base/index'
import { string } from 'vue-types'
import { genCmsTemplateData } from '~/composables/cms/useTemplateGen'
// 定义页面元信息
definePageMeta({
  name: '组织管理',
  layout: 'cms',
})

const $crud = useCmsApi().organization
// 使用 ref 存储异步加载的 templateData
const templateData = await genCmsTemplateData<IOrgModel, IOrgModelQuery, null>({
  // 1. 定义查询表单
  getList: $crud.list,
  create: $crud.create,
  update: $crud.update,
  delete: $crud.delete,
  // 2. 定义初始表格列
  getEmptyModel: () => ({
    id: '1',
    address: '',
    contactPhone: '',
    email: '',
    logoUrl: '',
    name: '', // 必填字段建议初始化空字符串
    status: 1, // 默认启用状态
  }),
  // 3. 定义删除框标题
  getDeleteBoxTitle(id: string) {
    return `删除组织${id}`
  },
  getDeleteBoxTitles(ids: Array<string>) {
    return ` 组织#${ids.join(',')} `
  },
  // 4. 生命周期
  onFetchSuccess: async () => {
    const permissionStore = useMyPermissionStore()
    await permissionStore.fetchPermissions()
  },
  transformSubmitData: (data, type) => {
    console.log('type:', type)
    // if (type === 'NEW') {
    //   if (data.parentId === -1) {
    //     return { ...data, parentId: undefined }
    //   }
    // }
    return data
  },

},
// 5. 定义查询表单
{
  name: '',
  page: 1,
  pageSize: 10,
})
// 等待 templateData 初始化完成

const { tableData, queryForm, fetchList } = templateData

onMounted(async () => {
  await fetchList()
})

// function cheackType(rule: any, value: number, callback: Function) {
//   if ([0, 1, 2].includes(value)) {
//     callback()
//   }
//   else {
//     callback(new Error('组织类型必须是 0（目录）、1（组织）或 2（权限）'))
//   }
// }

const rules = reactive<FormRules<Partial<IMenuBase>>>({
  // type: [
  //   { validator: cheackType, required: true, message: '请选择组织类型', trigger: 'blur' },
  //   { type: 'number', message: 'age must be a number' },
  // ],
})

// const rules = reactive<>({
//   type: {
//     available() {
//       return true
//     },
//     conditions: [
//       {
//         required: true,
//         type: 'number',
//         message: '请选择组织类型',
//         trigger: 'blur',
//         validator: (rule: any, value: number, callback: Function) => {
//           // 验证 type 是否为 0、1 或 2
//           if ([0, 1, 2].includes(value)) {
//             callback()
//           } else {
//             callback(new Error('组织类型必须是 0（目录）、1（组织）或 2（权限）'))
//           }
//         }
//       }
//     ],
//   },
//   name: {
//     available(type: number) {
//       if (type === 2)
//         this.conditions[0].message = '请输入权限名称'
//       else
//         this.conditions[0].message = '请输入组织名称'

//       return true
//     },
//     conditions: [
//       { required: true, message: '请输入组织名称', trigger: 'blur' },
//     ],
//   },
//   parentId: {
//     available() {
//       return true
//     },
//     conditions: [
//       {
//         required: true,
//         message: '请选择上级节点',
//         trigger: 'blur',
//         type: 'number'
//       }
//     ],
//   },
//   path: {
//     available(type: number) {
//       return type !== 2
//     },
//     conditions: [
//       { required: true, message: '请输入路由地址', trigger: 'blur' },
//     ],
//   },
//   permission: {
//     available(type: number) {
//       return type === 2
//     },
//     conditions: [
//       { required: true, message: '请输入权限', trigger: 'blur' },
//     ],
//   },
// })

const queryRules = reactive<Record<string, FormItemRule[]>>({
  user: [
    { min: 4, message: '用户名至少4个字符', trigger: 'blur' },
    { pattern: /^\w+$/, message: '只能包含字母、数字和下划线', trigger: 'blur' },
  ],
  email: [
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' },
  ],
  remark: [
    { max: 100, message: '备注不能超过100个字符', trigger: 'blur' },
  ],
})
</script>

<template>
  <CmsCrudTemplate
    generic="TableColumn ,IMenuModelQuery,null" name="组织" identifier="role" :rules="rules"
    :query-rules="queryRules" :table-data="tableData" :template-data="templateData" :crud-controller="15"
    :query-form="queryForm"
  >
    <template #QueryForm>
      <el-form-item prop="name" label="组织名称">
        <el-input v-model="queryForm.name" minlength="4" placeholder="搜索组织名称" clearable />
      </el-form-item>
      <el-form-item prop="path" label="路劲">
        <el-input v-model="queryForm.name" placeholder="搜索名称" clearable />
      </el-form-item>
      <!-- <el-form-item prop="isExt" label="外链">

        <el-radio-group v-model="queryForm.isExt" placeholder="是否外链">
          <el-radio-button label="1">是</el-radio-button>
          <el-radio-button label="0">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="show" label="显示">
        <el-input v-model="queryForm.show" placeholder="是否显示" clearable />
      </el-form-item> -->
    </template>
    <template #TableColumn>
      <el-table-column label="序号" prop="id" />
      <el-table-column label="组织名称" prop="name" />
      <el-table-column label="logoUrl">
        <template #default="{ row }">
          <div flex items-center justify-center>
            <div :class="row.icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="组织地址" prop="address" />
      <el-table-column label="联系电话" prop="contactPhone" />
      <el-table-column label="权限标识">
        <template #default="{ row }">
          <el-tag v-if="row.permission" type="primary">
            {{ row.permission }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="orderNo" />
      <el-table-column label="email" prop="email" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="updatedAt" label="更新时间">
        <template #default="scope">
          {{ $dayjs(scope.row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column> -->
    </template>
    <template #CrudForm="{ data }">
      <!-- 修改所有表单字段的v-model绑定方式 -->

      <el-form-item label="组织名称" prop="name">
        <el-input v-model="data.name" placeholder="请输入权限名称..." />
      </el-form-item>
      <!-- 其他表单字段也做同样修改 -->
      <el-form-item label="logo" prop="logoUrl">
        <!-- <IconSelector v-model="data.icon!" /> -->
        <el-input v-model="data.logoUrl" placeholder="请输入logo名称..." />
      </el-form-item>

      <el-form-item label="组织地址" prop="adress">
        <el-input v-model="data.address" placeholder="请输入组织地址..." />
      </el-form-item>
      <el-form-item label="联系电话" prop="permission">
        <el-input v-model="data.contactPhone" placeholder="请输入电话..." />
      </el-form-item>
      <el-form-item label="emil" prop="email">
        <el-input v-model="data.email" placeholder="请输入邮箱..." />
      </el-form-item>

      <!-- <el-form-item label="排序优先级" prop="orderNo">
        <el-input v-model="data.orderNo" placeholder="请输入排序优先级..." />
      </el-form-item> -->

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="data.status">
          <el-radio-button :value="0">
            否
          </el-radio-button>
          <el-radio-button :value="1">
            是
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
    </template>
  </CmsCrudTemplate>
</template>

<style></style>
