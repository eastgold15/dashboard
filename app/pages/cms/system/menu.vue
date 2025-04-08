<script lang="ts" setup>

import { $endApi } from '~/api/base';
import type { IMenuModel, IMenuModelQuery, IRoleModelQuery } from '~/api/base/index.type';
import { genCmsTemplateData } from '~/composables/cms/template-generator';

// 定义页面元信息
definePageMeta({
  name: '菜单管理',
  layout: 'cms',
})


type TableColumn = IMenuModel

const $crud = $endApi.v1.cms.menu


export type GenCmsTemplateDataResultType = typeof templateData


const templateData = await genCmsTemplateData<TableColumn, IMenuModelQuery, null>({
  //1. 定义查询表单
  getList: $crud.list,
  create: $crud.create,
  update: $crud.update,
  delete: $crud.delete,
  //2. 定义初始表格列
  getEmptyModel: () => ({
    id: -1,
    name: '',
    path: '',
    component: '',
    parentId: 0,
    sort: 0,
    icon: '',
    type: 0,
    status: 0,
    remark: ''
  }),
  //3. 定义删除框标题
  getDeleteBoxTitle(id) {
    return `删除菜单${id}`
  },
  getDeleteBoxTitles(ids: Array<number>): string {
    return ` 菜单#${ids.join(',')} `
  },
  //4. 生命周期
  onFetchSuccess: async () => {
    const permissionStore = useMyPermissionStore()
    await permissionStore.fetchPermissions()
  },
  handleCrudDialog(data, mode, meta) {

  },



},
  //5. 定义查询表单 
  {
    name: '',
    value: '',
    status: 0,
    remark: '',
    page: 1,
    pageSize: 60,
  })

const { tableData, queryForm, refresh } =  templateData




const rules = reactive<Partial<Record<keyof IMenuModel, any>>>({
  type: {
    available() {
      return true
    },
    conditions: [
      { required: true, message: '请选择菜单类型', trigger: 'blur' },
    ],
  },
  name: {
    available(type: number) {
      if (type === 2)
        this.conditions[0].message = '请输入权限名称'
      else
        this.conditions[0].message = '请输入菜单名称'

      return true
    },
    conditions: [
      { required: true, message: '请输入菜单名称', trigger: 'blur' },
    ],
  },
  parentId: {
    available() {
      return true
    },
    conditions: [
      { required: true, message: '请选择上级节点', trigger: 'blur' },
    ],
  },
  path: {
    available(type: number) {
      return type !== 2
    },
    conditions: [
      { required: true, message: '请输入路由地址', trigger: 'blur' },
    ],
  },
  permission: {
    available(type: number) {
      return type === 2
    },
    conditions: [
      { required: true, message: '请输入权限', trigger: 'blur' },
    ],
  },
})


const menuWithRoot = computed(() => ([{ id: -1, name: '根目录', children: [...tableData.value.items] }]))
</script>


<template>
  <CmsCrudTemplate name="菜单" identifier="role" :rules="rules" :tableData="tableData.items" :template-data="templateData"
    :crud-controller="15">
    <template #QueryForm>
      <el-form-item label="用户名">
        <el-input v-model="queryForm.user" minlength="4" placeholder="搜索用户名" clearable />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="queryForm.email" placeholder="搜索邮箱" clearable />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="queryForm.phone" placeholder="搜索手机号" clearable />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="queryForm.remark" placeholder="搜索备注" clearable />
      </el-form-item>
    </template>
    <template #TableColumn>
      <el-table-column label="序号" prop="id" />
      <el-table-column label="名称" prop="name" />
      <el-table-column label="图标">
        <template #default="{ row }">
          <div flex items-center justify-center>
            <div :class="row.icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类型">
        <template #default="{ row }">
          <el-tag v-if="!row.type" type="warning">
            目录
          </el-tag>
          <el-tag v-else-if="row.type === 2" type="danger">
            权限
          </el-tag>
          <el-tag v-else type="success">
            菜单
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="路由" prop="path" />
      <el-table-column label="文件路径" prop="component" />
      <el-table-column label="权限标识">
        <template #default="{ row }">
          <el-tag v-if="row.permission" type="primary">
            {{ row.permission }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="orderNo" />
      <el-table-column label="路由缓存">
        <template #default="{ row }">
          {{ row.keepAlive ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column label="是否显示">
        <template #default="{ row }">
          <el-tag v-if="!row.show" type="danger">
            隐藏
          </el-tag>
          <el-tag v-else type="success">
            显示
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间">
        <template #default="scope">
          {{ $dayjs(scope.row.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
    </template>
    <template #CrudForm="{ data }">
      <!-- 修改所有表单字段的v-model绑定方式 -->
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="data.type">
          <el-radio-button :value="0">目录</el-radio-button>
          <el-radio-button :value="1">菜单</el-radio-button>
          <el-radio-button :value="2">权限</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="data.type === 2" label="权限名称" prop="name">
        <el-input v-model="data.name" placeholder="请输入权限名称..." />
      </el-form-item>
      <el-form-item v-else label="节点名称" prop="name">
        <el-input v-model="data.name" placeholder="请输入节点名称..." />
      </el-form-item>

      <!-- 其他表单字段也做同样修改 -->
      <el-form-item label="上级节点" prop="parentId">
        <el-tree-select v-model="data.parentId" :data="menuWithRoot" default-expand-all
          :props="{ label: 'name', value: 'id' }" check-strictly :render-after-expand="false"
          placeholder="请选择上级节点..." />
      </el-form-item>
      <el-form-item v-if="data.type !== 2" label="路由地址" prop="name">
        <el-input v-model="data.path" placeholder="请输入路由地址..." />
      </el-form-item>
      <el-form-item v-if="data.type !== 0" label="权限" prop="permission">
        <el-input v-model="data.permission" placeholder="请输入权限..." />
      </el-form-item>
      <el-form-item v-show="data.type !== 2" label="节点图标" prop="icon">
        <!-- <IconSelector v-model="data.icon!" /> -->
      </el-form-item>
      <el-form-item label="排序优先级" prop="orderNo">
        <el-input v-model="data.orderNo" placeholder="请输入排序优先级..." />
      </el-form-item>
      <el-form-item v-if="data.type !== 2" label="是否外链" prop="isExt">
        <el-radio-group v-model="data.isExt">
          <el-radio-button :value="false">
            否
          </el-radio-button>
          <el-radio-button :value="true">
            是
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="data.type === 1" label="是否缓存" prop="keepAlive">
        <el-radio-group v-model="data.keepAlive">
          <el-radio-button :value="0">
            否
          </el-radio-button>
          <el-radio-button :value="1">
            是
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="data.type !== 2" label="是否显示" prop="show">
        <el-radio-group v-model="data.show">
          <el-radio-button :value="0">
            否
          </el-radio-button>
          <el-radio-button :value="1">
            是
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
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
