<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'stat',
  alias: ['/stat'],
})
const year = ref('2025')
// const monthlyData = ref([
//   { month: '1月', value: 29.3 },
//   { month: '2月', value: 23.4 },
//   { month: '3月', value: 33.2 },
//   { month: '4月', value: 44.5 },
//   { month: '5月', value: 56.1 },
//   { month: '6月', value: 47.2 },
//   { month: '7月', value: 42.2 },
//   { month: '8月', value: 34.2 },
//   { month: '9月', value: 56.6 },
//   { month: '10月', value: 74.3 },
//   { month: '11月', value: 66.5 },
//   { month: '12月', value: 61.3 },
// ])

const tableData = ref([
  { id: 7, department: '学生宿舍楼', month1: 2147, month2: 2843, month3: 3125, month4: 3887 },
  { id: 8, department: '学生食堂楼', month1: 3887, month2: 2843, month3: 3125, month4: 1887 },
  { id: 9, department: '学生活动楼', month1: 1887, month2: 2643, month3: 3125, month4: 3326 },
  { id: 10, department: '学生教学楼', month1: 2735, month2: 8228, month3: 3125, month4: 2623 },
  { id: 11, department: '学生宿舍楼', month1: 24523, month2: 7289, month3: 3125, month4: 3511 },
  { id: 12, department: '学生宿舍楼', month1: 5731, month2: 7863, month3: 3125, month4: 2399 },
])

const chartOption = ref({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  yAxis: {
    type: 'value',
    name: '单位：万吨',
  },
  series: [
    {
      name: '用水量',
      type: 'line',
      data: [29.3, 23.4, 33.2, 44.5, 56.1, 47.2, 42.2, 34.2, 56.6, 74.3, 66.5, 61.3],
      smooth: true,
      showSymbol: true,
      symbolSize: 8,
      lineStyle: {
        width: 2,
        color: '#1890FF',
      },
      areaStyle: {
        opacity: 0.1,
        color: '#1890FF',
      },
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' },
        ],
      },
    },
  ],
})
</script>

<template>
  <div class="statistics-kanban">
    <ElCard class="kanban-card" body-style="height: 90%;">
      <CommonTitle title="全校月用水量统计看板">
        <template #extra>
          <InputGroup>
            <InputText v-model="year" placeholder="Price" />
            <InputGroupAddon>.确定</InputGroupAddon>
          </InputGroup>
        </template>
      </CommonTitle>
      <ClientOnly>
        <div class="kanban-content">
          <VChart :option="chartOption" autoresize style="width: 100%; height: 100%;" />
        </div>
      </ClientOnly>
    </ElCard>
    <ElCard class="kanban-card">
      <CommonTitle title="全校月用水量统计看板">
        <template #extra>
          <InputGroup>
            <InputText v-model="year" placeholder="Price" />
            <InputGroupAddon>.确定</InputGroupAddon>
          </InputGroup>
        </template>
      </CommonTitle>

      <div class="kanban-content">
        <SRTitle title="江西飞行学院2025年用水数据看板" />
        <div class="table-container">
          <el-table :data="tableData" style="width: 100%" stripe border>
            <el-table-column prop="id" label="序号" width="70" />
            <el-table-column prop="department" label="部门名称" />
            <el-table-column prop="month1" label="1月水量" />
            <el-table-column prop="month2" label="2月水量" />
            <el-table-column prop="month3" label="3月水量" />
            <el-table-column prop="month4" label="4月水量" />
          </el-table>
        </div>
      </div>
    </ElCard>
  </div>
</template>

<style scoped lang="scss">
.statistics-kanban {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  background-color: #1a1a1a;

  .kanban-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    color: #1a1a1a;

    .kanban-content {
      background-color: #1a1a1a;
      flex: 1;
      height: 100%;
    }

    .year-selector {
      display: flex;
      justify-content: flex-end;
      align-items: left;

      .year-input {
        height: 100%;
        width: 200px;
      }
    }
  }
}

.year-selector {
  display: flex;
  justify-content: flex-end;
  align-items: left;
  margin-bottom: 20px;
}

.year-input {
  width: 200px;
}

.chart-container {
  height: 300px;
  margin-bottom: 30px;
}

.water-chart {
  height: 100%;
  width: 100%;
}

.table-container {
  margin-top: 20px;
  overflow-x: auto;
}
</style>
