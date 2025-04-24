<script lang="ts" setup>
definePageMeta({
  layout: 'quota',

})

const typeData = ref([
  { label: '请选择类型', value: 1 },
  { label: '水', value: 2 },
  { label: '电', value: 3 },
])

const titleData = ref([
  { label: '请选择建筑', value: 1 },
  { label: '学生宿舍1栋', value: 2 },
  { label: '学生宿舍2栋', value: 3 },
  { label: '学生宿舍3栋', value: 4 },
  { label: '学生宿舍4栋', value: 5 },
  { label: '学生宿舍5栋', value: 6 },
  { label: '学生宿舍6栋', value: 7 },
  { label: '学生宿舍7栋', value: 8 },
  { label: '学生宿舍8栋', value: 9 },
  { label: '学生宿舍9栋', value: 10 },
  { label: '学生宿舍10栋', value: 11 },
])

const month = ref([
  { label: '1月', value: null },
  { label: '2月', value: null },
  { label: '3月', value: null },
  { label: '4月', value: null },
  { label: '5月', value: null },
  { label: '6月', value: null },
  { label: '7月', value: null },
  { label: '8月', value: null },
  { label: '9月', value: null },
  { label: '10月', value: null },
  { label: '11月', value: null },
  { label: '12月', value: null },
])

const tableData = ref([{
  num: 1,
  warning: '水定额超标',
  area: '学生宿舍6栋',
  time: '1/8/25',
  ratedValue: 1000,
  utilityValue: 1029,
  people: '系统',
  status: '待处理',
  controls: '',
}, {
  num: 2,
  warning: '水定额超标',
  area: '学生宿舍2栋',
  time: '1/8/25',
  ratedValue: 900,
  utilityValue: 1036,
  people: '系统',
  status: '待处理',
  controls: '',
}, {
  num: 3,
  warning: '水定额超标',
  area: '学生宿舍3栋',
  time: '1/8/25',
  ratedValue: 800,
  utilityValue: 928,
  people: '系统',
  status: '待处理',
  controls: '',
}, {
  num: 4,
  warning: '水定额超标',
  area: '学生宿舍7栋',
  time: '1/8/25',
  ratedValue: 1000,
  utilityValue: 1821,
  people: '系统',
  status: '待处理',
  controls: '',
}, {
  num: 5,
  warning: '水定额超标',
  area: '学生宿舍9栋',
  time: '1/8/25',
  ratedValue: 600,
  utilityValue: 829,
  people: '系统',
  status: '待处理',
  controls: '',
}, {
  num: 6,
  warning: '水定额超标',
  area: '科技楼',
  time: '1/8/25',
  ratedValue: 1000,
  utilityValue: 2918,
  people: '系统',
  status: '待处理',
  controls: '',
}, {
  num: 7,
  warning: '水定额超标',
  area: '学生宿舍12栋',
  time: '1/8/25',
  ratedValue: 600,
  utilityValue: 829,
  people: '系统',
  status: '待处理',
  controls: '',
}, {
  num: 8,
  warning: '水定额超标',
  area: '一教1',
  time: '1/8/25',
  ratedValue: 800,
  utilityValue: 1023,
  people: '系统',
  status: '待处理',
  controls: '',
}, {
  num: 9,
  warning: '水定额超标',
  area: '一教2',
  time: '1/8/25',
  ratedValue: 500,
  utilityValue: 628,
  people: '系统',
  status: '待处理',
  controls: '',
}, {
  num: 10,
  warning: '水定额超标',
  area: '一教3',
  time: '1/8/25',
  ratedValue: 800,
  utilityValue: 928,
  people: '系统',
  status: '待处理',
  controls: '',
}])
const tableColumn = ref([{ field: 'num', header: '序号' }, { field: 'warning', header: '超标类型' }, { field: 'area', header: '报警区域' }, { field: 'time', header: '报警时间' }, { field: 'ratedValue', header: '额定值' }, { field: 'utilityValue', header: '实用值' }, { field: 'people', header: '报警人' }, { field: 'status', header: '处理状态' }, { field: 'controls', header: '操作' }])

const title = ref('111')
</script>

<template>
  <div class="grid grid-rows-[1fr_6fr_1fr_4fr] h-full w-full">
    <CommonTitle :title="title">
      <template #extra>
        <div class="flex items-center gap-4">
          <QuotaSettingType :data="titleData" />
          <QuotaSettingType :data="typeData" />
          <button class="h-10 w-25 rounded-full bg-cyan-500 text-white transition-colors hover:bg-cyan-600">
            设定
          </button>
        </div>
      </template>
    </CommonTitle>

    <div class="grid grid-cols-4 grid-rows-3 place-items-center gap-4 p-4">
      <QuotaMonth
        v-for="(item, index) in month" :key="index" v-model:count="item.value" :month-data="item.label"
        class="flex items-center justify-center"
      />
    </div>

    <div class="flex items-center justify-center">
      <img src="/line.png" alt="分割线" class="w-full">
    </div>

    <div class="h-full w-full flex-1 p-4">
      <CommonTable :table-data="tableData" :table-column="tableColumn" />
    </div>
  </div>
</template>
