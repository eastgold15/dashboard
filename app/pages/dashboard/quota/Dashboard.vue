<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  alias: ['/quota'],
})

interface QuotaData {
  title: string
  data: number
  color: string
}
const data = ref<QuotaData[]>([
  {
    title: '累计报警量',
    data: 21829,
    color: 'yellow',
  },
  {
    title: '今日报警量',
    data: 1234,
    color: 'green',
  },
  {
    title: '已处理量',
    data: 1000,
    color: 'white',
  },
  {
    title: '待处理量',
    data: 234,
    color: 'red',
  },
])

const tableData = ref([
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
  {
    num: 6,
    warning: '水定额超标',
    area: '科技楼',
    time: '1/8/25',
    ratedValue: 1000,
    utilityValue: 2918,
    people: '系统',
    status: '待处理',
    controls: '',
  },
  {
    num: 7,
    warning: '水定额超标',
    area: '学生宿舍12栋',
    time: '1/8/25',
    ratedValue: 600,
    utilityValue: 829,
    people: '系统',
    status: '待处理',
    controls: '',
  },
  {
    num: 8,
    warning: '水定额超标',
    area: '一教1',
    time: '1/8/25',
    ratedValue: 800,
    utilityValue: 1023,
    people: '系统',
    status: '待处理',
    controls: '',
  },
  {
    num: 9,
    warning: '水定额超标',
    area: '一教2',
    time: '1/8/25',
    ratedValue: 500,
    utilityValue: 628,
    people: '系统',
    status: '待处理',
    controls: '',
  },
  {
    num: 10,
    warning: '水定额超标',
    area: '一教3',
    time: '1/8/25',
    ratedValue: 800,
    utilityValue: 928,
    people: '系统',
    status: '待处理',
    controls: '',
  },

])

const tableColumn = ref([
  { field: 'num', header: '序号' },
  { field: 'warning', header: '超标类型' },
  { field: 'area', header: '报警区域' },
  { field: 'time', header: '报警时间' },
  { field: 'ratedValue', header: '额定值' },
  { field: 'utilityValue', header: '实用值' },
  { field: 'people', header: '报警人' },
  { field: 'status', header: '处理状态' },
  { field: 'controls', header: '操作' },
])
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="h-400px w-full flex">
      <QuotaCard v-for="(item, index) in data" :key="index" :title="item.title" :color="item.color" :data="item.data" />
    </div>

    <!-- 两侧间距由px指定 -->
    <div class="h-full w-full px-80px pt-20px">
      <CommonTable :table-column="tableColumn" :table-data="tableData" />
    </div>
  </div>
</template>

<style scoped>

</style>
