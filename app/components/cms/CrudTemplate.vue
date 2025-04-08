<script lang="ts"
  generic="T extends Record<string, any> & { id: number }, Q extends T & { page: number, pageSize: number }, M extends Record<string, any> | null"
  setup>

  import type { FormInstance, FormRules } from 'element-plus'

  import type { IRes, IRoleModel, PageRes } from '~/api/base/index.type';
  import type { GenCmsTemplateDataResultType } from '~/composables/cms/template-generator';


  const props = defineProps<{
    name: string
    identifier?: string
    tableData: PageRes<T> | T[]
    templateData: GenCmsTemplateDataResultType
    rules?: FormRules<T>
    crudController?: number
  }>()






  const {
    tableData,
    queryForm,
    formLoading,
    crudDialogOptions,
    create,
    update,
    delete: handleDelete,
    handleCrudDialog,
    resetQueryForm,

  } = props.templateData;


  const _crudController = computed(() => props.crudController || 15)



  const formRef = ref<FormInstance>()

  // 重置表单
  function resetForm(formEl: FormInstance | undefined) {
    if (!formEl)
      return
    formEl.resetFields()
  }

  //提交表单
  const submitForm = async (ruleformEL: FormInstance) => {
    if (!ruleformEL) return;

    try {
      const valid = await ruleformEL.validate();
      if (!valid) return;

      const { data, mode } = crudDialogOptions;
      if (!data) return;

      const success = mode === 'NEW'
        ? await create(data)
        : await update(data.id, data);

      if (success) {
        crudDialogOptions.visible = false;
      }
    } catch (e) {
      console.error(e);
    }
  };

</script>

<template>
  <el-container class="CrudTemplate">
    <el-main>
      <!-- 查询表单区域 -->

      <slot name="IHeader" class="w-100%">
        <ElForm :disabled="formLoading" :inline="true" :model="queryForm">
          <slot name="QueryForm"></slot>

          <slot name="QueryFormAction">
            <el-form-item>
              <el-button @click="resetQueryForm">重置</el-button>
              <el-button type="primary" :loading="formLoading" @click="() => resetSearch">查询</el-button>
              <el-button type="success" @click="handleCrudDialog(null, 'NEW')">
                新建{{ name }}
              </el-button>
            </el-form-item>
          </slot>
        </ElForm>
      </slot>

      <ClientOnly>

        <ElMain>
          <ElRow>
            <ElCol :span="24">
              <slot name="ITable">
                <!-- 表格区域 -->
                <ElTable v-if="tableData" table-layout="auto" class="w-100%" :data="tableData.items" row-key="id"
                  default-expand-all border style="width: 100%;">
                  <slot name="TableColumn" />
                  <slot name="TableColumnAction">
                    <el-table-column label="操作" width="250" fixed="right">
                      <template #default="{ row }">
                        <el-button v-if="_crudController & 2" @click="handleCrudDialog(row, 'READ')">详情</el-button>
                        <el-button v-if="_crudController & 4" type="warning"
                          @click="handleCrudDialog(row, 'EDIT')">编辑</el-button>
                        <el-button v-if="_crudController & 8" type="danger" @click="handleDelete(row.id)">删除</el-button>
                      </template>
                    </el-table-column>
                  </slot>

                </ElTable>

              </slot>

            </ElCol>
          </ElRow>

          <ElPagination v-if="tableData" v-model:current-page="tableData.meta.currentPage"
            v-model:page-size="tableData.meta.itemsPerPage" :page-sizes="[20, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper" :total="tableData.meta.totalItems" @change="() => fetch()">

          </ElPagination>

        </ElMain>
      </ClientOnly>




    </el-main>

    <el-drawer v-model="crudDialogOptions.visible" :close-on-click-modal="false" :close-on-press-escape="false">
      <template #header>
        <h4>
          <span v-if="crudDialogOptions.mode === 'NEW'">新建</span>
          <span v-else-if="crudDialogOptions.mode === 'EDIT'">编辑</span>
          <span v-else-if="crudDialogOptions.mode === 'READ'">查看</span>{{ name }}信息
          <span v-if="crudDialogOptions.data" mx-4 op-50>#{{
            crudDialogOptions.data.id }}</span>
        </h4>
      </template>

      <template #default>
        <el-form v-if="crudDialogOptions.data" ref="formRef"
          :disabled="crudDialogOptions.loading || crudDialogOptions.mode === 'READ'" style="max-width: 600px"
          :model="crudDialogOptions.data" :rules="rules" label-width="auto" status-icon>
          <!-- <slot :data="() => crudDialogOptions.data" :mode="crudDialogOptions.mode" name="CrudForm" /> -->
          <slot :data="crudDialogOptions.data" :mode="crudDialogOptions.mode" name="CrudForm" />
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <slot name="CrudFormAction">
            <template v-if="crudDialogOptions.mode === 'READ'">
              <el-button @click="crudDialogOptions.visible = false">
                关闭
              </el-button>
            </template>
            <template v-else>
              <el-button @click="crudDialogOptions.visible = false">
                取消
              </el-button>
              <el-button @click="resetForm(formRef)">
                重置
              </el-button>
              <el-button :loading="crudDialogOptions.loading" type="primary" @click="submitForm(formRef)">
                {{ crudDialogOptions.mode !== 'NEW' ? "修改" : "新增" }}
              </el-button>
            </template>
          </slot>
        </div>
      </template>
    </el-drawer>
  </el-container>
</template>
