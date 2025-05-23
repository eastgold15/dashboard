<script lang="ts" setup>
import type { FormItemRule, FormRules } from 'element-plus'
import type { IDeptModel, IMenuBase, IMenuModel, IMenuModelQuery, IOrgModel, IOrgModelQuery, IRoleModel, IUserModel, IUserModelQuery } from '~/api/base/index.type'
import { useCmsApi } from '@/api/base/index'
import { string } from 'vue-types'
import { genCmsTemplateData } from '~/composables/cms/useTemplateGen'
// 定义页面元信息
definePageMeta({
  name: '用户管理',
  layout: 'cms',
})

const $crud = useCmsApi().user
// 使用 ref 存储异步加载的 templateData
const templateData = await genCmsTemplateData<IUserModel, IUserModelQuery, null>({
  // 1. 定义查询表单
  getList: $crud.list,
  create: $crud.create,
  update: $crud.update,
  delete: $crud.delete,
  // 2. 定义初始表格列
  getEmptyModel: () => ({
    id: '1',
    avatar: '', // 或者可以设置为默认头像的URL
    deptId: 1, // 示例部门ID
    email: 'user@example.com', // 必需字段
    nickname: '新用户', // 必需字段
    organizationId: 1, // 示例组织ID
    password: 'securePassword123', // 必需字段，实际应用中应使用加密存储
    phone: '1234567890', // 可选字段
    qq: '123456789', // 可选字段
    remark: '这是一个新注册的用户', // 可选字段
    roleIds: [1, 2], // 必需字段，示例角色ID数组
    status: 1, // 示例状态，具体含义视业务需求而定
    username: 'newUser', // 必需字段
  }),
  // 3. 定义删除框标题
  getDeleteBoxTitle(id: string) {
    return `删除用户${id}`
  },
  getDeleteBoxTitles(ids: Array<string>) {
    return ` 用户#${ids.join(',')} `
  },
  // 4. 生命周期
  onFetchSuccess: async () => {
    const permissionStore = useMyPermissionStore()
    await permissionStore.fetchPermissions()
  },
  transformSubmitData: (data, type) => {
    console.log('type:', type)
    if (type === 'NEW') {
      return {
        ...data,
        passwaord: 'a123456',
      }
    }
    const { password, ...rest } = data
    Object.keys(data).forEach((key) => {
      delete data['password']
    })

    return rest
  },

},
// 5. 定义查询表单
{
  username: '',
  page: 1,
  pageSize: 10,
})
// 等待 templateData 初始化完成

const { tableData, queryForm, fetchList, crudDialogOptions } = templateData

onMounted(async () => {
  await fetchList()
  await loadData()
})


const rules = reactive<FormRules<Partial<IUserModel>>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 20, message: '长度在4到20个字符', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
  ],
  deptId: [
    { required: true, message: '请选择部门', trigger: 'change' }
  ],
  roleIds: [
    { required: true, message: '请至少选择一个角色', trigger: 'change' }
  ]
})

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



// 部门数据
const deptList = ref<IDeptModel[]>([])
// 组织数据
const orgList = ref<IOrgModel[]>([])
// 角色数据
const roleList = ref<IRoleModel[]>([])
// 加载数据
const loadData = async () => {

  console.log('loadData')
  const [deptRes, orgRes, roleRes] = await Promise.all([
    useCmsApi().dept.list({ page: 1, pageSize: 1000 }),
    useCmsApi().organization.list({ page: 1, pageSize: 100 }),
    useCmsApi().role.list({ page: 1, pageSize: 100 })
  ])
  deptList.value = deptRes.data!
  console.log(' deptList.value =:',  deptList.value)
  orgList.value = orgRes.data.items
  console.log(' orgList.value:',  orgList.value)
  roleList.value = roleRes.data.items
  console.log(' roleList.value:',  roleList.value)

}

</script>

<template>
  <CmsCrudTemplate
    generic="TableColumn ,IMenuModelQuery,null" name="用户" identifier="role" :rules="rules"
    :query-rules="queryRules" :table-data="tableData" :template-data="templateData" :crud-controller="15"
    :query-form="queryForm"
  >
    <template #QueryForm>
      <el-form-item prop="username" label="用户名称">
        <el-input v-model="queryForm.username" minlength="4" placeholder="搜索登录账号名称" clearable />
      </el-form-item>
      <el-form-item prop="phone" label="电话">
        <el-input v-model="queryForm.phone" placeholder="搜索电话" clearable />
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
      <el-table-column prop="id" label="序号" width="60" />
      <el-table-column prop="date" label="头像" width="80">
        <template #default="scope">
          <UserAvatar :avatar="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名(昵称)" width="240">
        <template #default="{ row }">
          {{ row.username }}<span op-50>({{ row.nickname }})</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="organization" label="组织" width="180">
        <template #default="{ row }">
          <el-tag v-if="row.organization">
            {{ row.organization.name }}
          </el-tag>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" width="180">
        <template #default="{ row }">
          <el-tag v-if="row.dept">
            {{ row.dept.name }}
          </el-tag>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="role" label="角色" width="180">
        <template #default="{ row }">
          <span v-if="row.roles?.length">
            <el-tag v-for="role in row.roles" :key="role.id" mr-2> {{ role.name }}</el-tag>
          </span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180" />
      <el-table-column prop="createdAt" label="创建时间" width="180">
        <template #default="scope">
          {{ scope.row.createdAt }}
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="180">
        <template #default="scope">
          {{ scope.row.updatedAt }}
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

      <el-form-item label="用户头像" prop="avatar">
        <UserUploadAvatar
          v-model="data.avatar"
          :disabled="crudDialogOptions.loading || crudDialogOptions.mode === 'READ'"
        />
      </el-form-item>
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="data.username" :disabled="crudDialogOptions.mode !== 'NEW'" />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="data.nickname" />
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="data.password" :disabled="crudDialogOptions.mode !== 'NEW'" type="password" />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="data.email" />
      </el-form-item>
      <el-form-item label="QQ" prop="qq">
        <el-input v-model="data.qq" />
      </el-form-item>
      <el-form-item label="用户手机号" prop="phone">
        <el-input v-model="data.phone" />
      </el-form-item>
      <!-- <el-form-item label="用户部门" prop="dept">
        <el-tree-select
          v-model="data.deptId" :default-expand-all="true" :highlight-current="true" node-key="id"
          :check-on-click-node="true" :data="deptList" :render-after-expand="false"
        />
      </el-form-item>

      <el-form-item label="组织部门" prop="organizationId">
        <el-tree-select
          v-model="data.organizationId" :default-expand-all="true" :highlight-current="true" node-key="id"
          :check-on-click-node="true" :data="orgList" :render-after-expand="false"
        />
      </el-form-item>


      <el-form-item label="角色管理" prop="roleIds">
        <el-tree-select
          v-model="data.roleIds" :default-expand-all="true" :highlight-current="true" node-key="id"
          :check-on-click-node="true" :data="orgList" :render-after-expand="false"
        />
      </el-form-item>
      <el-form-item label="用户角色" prop="roleIds">
        <el-select v-model="data.roleIds" multiple placeholder="请选择角色">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item> -->


      
  <!-- 组织选择 -->
  <el-form-item label="所属组织" prop="organizationId">
    <el-select 
      v-model="data.organizationId" 
      placeholder="请选择组织"
      filterable
      clearable
      style="width: 100%"
    >
      <el-option
        v-for="org in orgList"
        :key="org.id"
        :label="org.name"
        :value="org.id"
      />
    </el-select>
  </el-form-item>
  <!-- 部门选择 -->
  <el-form-item label="所属部门" prop="deptId">
    <el-tree-select
      v-model="data.deptId"
      :data="deptList"
      :props="{ 
        label: 'name',
        value: 'id',
        children: 'children'
      }"
      placeholder="请选择部门"
      check-strictly
      clearable
      style="width: 100%"
    />
  </el-form-item>
  <!-- 角色选择 -->
  <el-form-item label="用户角色" prop="roleIds">
    <el-select
      v-model="data.roleIds"
      multiple
      placeholder="请选择角色"
      style="width: 100%"
    >
      <el-option
        v-for="role in roleList"
        :key="role.id"
        :label="role.name"
        :value="role.id"
      />
    </el-select>
  </el-form-item>
      <el-form-item label="用户状态" prop="status">
        <el-radio-group v-model="data.status">
          <el-radio-button :value="0">
            已禁用
          </el-radio-button>
          <el-radio-button :value="1">
            未禁用
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
        <el-input v-model="data.remark" placeholder="请输入备注..." type="textarea" />
      </el-form-item>
    </template>
  </CmsCrudTemplate>
</template>

<style></style>
