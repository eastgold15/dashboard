<script lang="ts" setup>
definePageMeta({
  layout: 'default',
})

const tableData = ref([{
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄',
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄',
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄',
}])

const tableColumn = ref([
  {
    field: 'date',
    header: '日期',
  },
  {
    field: 'name',
    header: '姓名',
  },
  {
    field: 'address',
    header: '地址',
  },
])
</script>

<template>
  <div class="loss-layout">
    <!-- 左侧 -->
    <div class="left-section">
      <div class="analysis">
        <AnalEchartsLossAnaly />
      </div>
      <div class="rate">
        <AnalEchartsLossRate />
      </div>
    </div>
    <!-- 右侧 -->
    <div class="right-section">
      <AnalEchartsLossChart />
      <CommonTable :table-column="tableColumn" :table-data="tableData" />
    </div>
  </div>
</template>

<style>
.loss-layout {
  display: grid;
  flex-direction: row;
  height: 100%;
  /* weight: 100%; */
  grid-template-columns: 1fr 3fr;
  gap: 10px;

  .left-section {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
  }
}

.right-section {
  display: grid;
  gap: 10px;
}
</style>
