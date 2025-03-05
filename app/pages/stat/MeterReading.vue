<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'stat',
})

const dateValue = ref('2025-03-05')
const searchInput = ref('')
const tableData = ref([
  {
    id: 1,
    area: '学生宿舍2栋',
    type: '超声波水表',
    model: '/',
    diameter: 'DN100',
    meterNo: 'L1-2-2',
    pressure: 5.3,
    reading: 6543,
    status: '在线',
    baseReading: 1800,
    location: '学生宿舍2栋',
    time: '22:21',
    date: '2/20/25'
  },
  // ... 其他数据
  {
    id: 2,
    area: '学生宿舍3栋',
    type: '超声波水表',
    model: '/',
    diameter: 'DN100',
    meterNo: 'L1-2-2',
    pressure: 5.3,
    reading: 6543,
    status: '在线',
    baseReading: 1800,
    location: '学生宿舍3栋',
    time: '22:21',
    date: '2/20/25'
  },

  {
    id: 3,
    area: '学生宿舍4栋',
    type: '超声波水表',
    model: '/',
    diameter: 'DN100',
    meterNo: 'L1-2-2',
    pressure: 5.3,
    reading: 6543,
    status: '在线',
    baseReading: 1800,
    location: '学生宿舍5栋',
    time: '22:21',
    date: '2/20/25'
  },

  {
    id: 3,
    area: '学生宿舍4栋',
    type: '超声波水表',
    model: '/',
    diameter: 'DN100',
    meterNo: 'L1-2-2',
    pressure: 5.3,
    reading: 6543,
    status: '在线',
    baseReading: 1800,
    location: '学生宿舍5栋',
    time: '22:21',
    date: '2/20/25'
  },


  {
    id: 3,
    area: '学生宿舍4栋',
    type: '超声波水表',
    model: '/',
    diameter: 'DN100',
    meterNo: 'L1-2-2',
    pressure: 5.3,
    reading: 6543,
    status: '在线',
    baseReading: 1800,
    location: '学生宿舍5栋',
    time: '22:21',
    date: '2/20/25'
  },

  {
    id: 3,
    area: '学生宿舍4栋',
    type: '超声波水表',
    model: '/',
    diameter: 'DN100',
    meterNo: 'L1-2-2',
    pressure: 5.3,
    reading: 6543,
    status: '在线',
    baseReading: 1800,
    location: '学生宿舍5栋',
    time: '22:21',
    date: '2/20/25'
  },
  
])

const chartOption1 = ref({
  grid: {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
  },
  xAxis: {
    type: 'category',
    data: ['21:10', '21:12', '21:14', '21:16', '21:18', '21:20', '21:22', '21:24', '21:26', '21:28', '21:30'],
    axisLine: { lineStyle: { color: '#666' } },
    axisLabel: { color: '#666' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#666' } },
    axisLabel: { color: '#666' },
    splitLine: { lineStyle: { color: '#333' } }
  },
  series: [{
    data: [4, 5, 3, 4, 5, 6, 4, 3, 4, 5, 4],
    type: 'line',
    smooth: true,
    lineStyle: { color: '#67C23A' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{
          offset: 0, color: 'rgba(103, 194, 58, 0.2)'
        }, {
          offset: 1, color: 'rgba(103, 194, 58, 0)'
        }]
      }
    }
  }]
})

const chartOption2 = ref({
  grid: {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
  },
  xAxis: {
    type: 'category',
    data: ['21:10', '21:12', '21:14', '21:16', '21:18', '21:20', '21:22', '21:24', '21:26', '21:28', '21:30'],
    axisLine: { lineStyle: { color: '#666' } },
    axisLabel: { color: '#666' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#666' } },
    axisLabel: { color: '#666' },
    splitLine: { lineStyle: { color: '#333' } }
  },
  series: [{
    data: [4, 3, 4, 3, 5, 4, 3, 4, 5, 4, 3],
    type: 'line',
    smooth: true,
    lineStyle: { color: '#409EFF' },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [{
          offset: 0, color: 'rgba(64, 158, 255, 0.2)'
        }, {
          offset: 1, color: 'rgba(64, 158, 255, 0)'
        }]
      }
    }
  }]
})
</script>

<template>
  <div class="remote-meter-reading">
    <el-card class="meter-card">
      <StatSRTitle title="全校实时用水数据表">
        <template #right>
          <div class="header-controls">
            <el-date-picker v-model="dateValue" type="date" placeholder="选择日期" />
            <el-input v-model="searchInput" placeholder="搜索" class="search-input">
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>
        </template>
      </StatSRTitle>
      <div class="meter-content">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="70" />
          <el-table-column prop="area" label="用水区域" />
          <el-table-column prop="type" label="水表类型" />
          <el-table-column prop="model" label="型号" width="80" />
          <el-table-column prop="diameter" label="口径" width="100" />
          <el-table-column prop="meterNo" label="表号" width="100" />
          <el-table-column prop="pressure" label="压力" width="80" />
          <el-table-column prop="reading" label="读数" width="100" />
          <el-table-column prop="status" label="状态" width="80" />
          <el-table-column prop="baseReading" label="基数" width="100" />
          <el-table-column prop="location" label="位置" />
          <el-table-column prop="time" label="时间" width="80" />
          <el-table-column prop="date" label="日期" width="100" />
        </el-table>
      </div>
    </el-card>
    <div class="charts-container">
      <el-card class="chart-card" style="height: 100%">
        <div class="chart-title">自来水泵房出水表瞬时流量</div>
        <ClientOnly>
          <VChart :option="chartOption1" autoresize />
        </ClientOnly>
      </el-card>
      <el-card class="chart-card" style="height: 100%">
        <div class="chart-title">各计量表瞬时流量</div>
        <ClientOnly>
          <VChart :option="chartOption2" autoresize />
        </ClientOnly>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.remote-meter-reading {
  background-color: #1a1a1a;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.meter-card {
  flex: 1;
  background-color: #2b2b2b;
  border: none;
  display: flex;
  flex-direction: column;
  max-height: 50%;
}

.charts-container {
  height: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.chart-card {
  background-color: #2b2b2b;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chart-title {
  padding: 10px;
  color: #56b8de;
  font-size: 14px;
  border-bottom: 1px solid #333;
}

:deep(.echarts) {
  width: 100%;
  height: calc(100% - 40px);
  min-height: 200px;
}
.header-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-input {
  width: 200px;
  
}

.meter-content {
  margin-top: 20px;
  flex: 1;
  max-height: 300px;
  overflow-y: auto;
}
</style>
