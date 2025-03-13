<script setup lang="ts">
interface TableData {
  [key: string]: any
}
interface TableColumn {
  field: string
  header: string

}
interface Props {
  tableData: TableData[]
  tableColumn: TableColumn[]
}
withDefaults(defineProps<Props>(), {
  tableData: () => [
    {
      num: 1,
      warning: '水定额超标',
      area: '学生宿舍6栋',
      time: '1/8/25',
      ratedValue: 1000,
      utilityValue: 1029,
      people: '系统',
      status: '待处理',
      controls: '',
    },
    {
      num: 2,
      warning: '水定额超标',
      area: '学生宿舍2栋',
      time: '1/8/25',
      ratedValue: 900,
      utilityValue: 1036,
      people: '系统',
      status: '待处理',
      controls: '',
    },
    {
      num: 3,
      warning: '水定额超标',
      area: '学生宿舍3栋',
      time: '1/8/25',
      ratedValue: 800,
      utilityValue: 928,
      people: '系统',
      status: '待处理',
      controls: '',
    },
    {
      num: 4,
      warning: '水定额超标',
      area: '学生宿舍7栋',
      time: '1/8/25',
      ratedValue: 1000,
      utilityValue: 1821,
      people: '系统',
      status: '待处理',
      controls: '',
    },
    {
      num: 5,
      warning: '水定额超标',
      area: '学生宿舍9栋',
      time: '1/8/25',
      ratedValue: 600,
      utilityValue: 829,
      people: '系统',
      status: '待处理',
      controls: '',
    },

  ],
  tableColumn: () => [
    { field: 'num', header: '序号' },
    { field: 'warning', header: '超标类型' },
    { field: 'area', header: '报警区域' },
    { field: 'time', header: '报警时间' },
    { field: 'ratedValue', header: '额定值' },
    { field: 'utilityValue', header: '实用值' },
    { field: 'people', header: '报警人' },
    { field: 'status', header: '处理状态' },
    { field: 'controls', header: '操作' },
  ],

})
</script>

<template>
  <ClientOnly>
    <DataTable :value="tableData" striped class="p-dark" :row-hover="true" table-style="width: 100%; height: 100%;">
      <Column v-for="col of tableColumn" :key="col.field" :field="col.field" :header="col.header" />
    </DataTable>
  </ClientOnly>
</template>
