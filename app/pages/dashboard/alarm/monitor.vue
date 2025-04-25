<script lang="ts" setup>
import { CommonTable } from '#components'

definePageMeta({
  layout: 'default',
  alias: ['/alarm'],
})
// 定义一些模拟数据
const stats = [
  { label: '累计报警量', value: '21,829条', color: 'yellow' },
  { label: '今日报警量', value: '1,234条', color: 'green' },
  { label: '已处理量', value: '1,000条', color: 'white' },
  { label: '待处理量', value: '234条', color: 'red' },
]

// 使用 ref 创建响应式数据
const tableData = ref([
  {
    id: 1,
    type: '自动报警',
    area: '手动报警',
    time: '10:00',
    content: '自动报警区域',
    person: '高级',
    status: '待处理',
    repairPerson: '',
  },
  {
    id: 2,
    type: '报警',
    area: '大字显示OFFICY',
    time: '18:00',
    content: '自动报警区域',
    person: 'di级',
    status: '待处理',
    repairPerson: '',
  },
  {
    id: 3,
    type: '自动报警',
    area: '手动报警',
    time: '15:00',
    content: '自动报警区域',
    person: '高',
    status: '处理',
    repairPerson: '',
  },
  {
    id: 4,
    type: 'NACK报警',
    area: '手动报警',
    time: '26:00',
    content: '自动报警区域',
    person: '高',
    status: '未处理',
    repairPerson: '',
  },
  {
    id: 5,
    type: 'NACK报警',
    area: '手动报警',
    time: '28:00',
    content: '自动报警区域',
    person: '高',
    status: '已处理',
    repairPerson: '',
  },
  {
    id: 6,
    type: '报警',
    area: '大字显示OFFICY',
    time: '18:00',
    content: '自动报警区域',
    person: 'di级',
    status: '待处理',
    repairPerson: '',
  },
  {
    id: 7,
    type: '报警',
    area: '大字显示OFFICY',
    time: '18:00',
    content: '自动报警区域',
    person: 'di级',
    status: '待处理',
    repairPerson: '',
  },
  {
    id: 8,
    type: '不报警',
    area: '大字显示OFFICY',
    time: '36:00',
    content: '自动报警区域',
    person: 'di级',
    status: '处理',
    repairPerson: '',
  },
])

const tableColumn = ref([
  { field: 'num', header: '序号' },
  { field: 'type', header: '序号' },
  { field: 'area', header: '序号' },
  { field: 'time', header: '超标类型' },
  { field: 'content', header: '报警区域' },
  { field: 'person', header: '报警时间' },
  { field: 'status', header: '额定值' },
  { field: 'repairPerson', header: '实用值' },
])

// 定义定时器
let intervalId: any

// 数据循环流动的逻辑
function startDataCycle() {
  intervalId = setInterval(() => {
    // 将数组的第一个元素移动到最后一个位置
    const firstItem = tableData.value.shift()
    if (firstItem) {
      tableData.value.push(firstItem)
    }
  }, 2000) // 每 2 秒循环一次
}

// 在组件挂载时启动循环
onMounted(() => {
  startDataCycle()
})

// 在组件卸载时清除定时器
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="TheAlarmMonitor">
    <div class="theButton">
      <button class="theButtonOne">
        返回主页面
      </button>
    </div>

    <el-row :gutter="20">
      <el-col v-for="stat in stats" :key="stat.label" :span="6" :style="{ fontSize: '14px' }">
        <el-card
          :style="{ backgroundColor: '#CDCDCD', border: '2px solid #3EABCB', borderRadius: '10px', height: '100px' }"
        >
          <div class="stat-value" :style="{ color: stat.color }">
            {{ stat.value }}
          </div>
        </el-card>
        <div class="stat-label" :style="{ marginTop: '30px', color: '#3EABCB', fontWeight: 'bold' }">
          {{ stat.label }}
        </div>
      </el-col>
    </el-row>

    <CommonTable :table-data="tableData" :table-column="tableColumn" class="table-main" />
    <!-- 使用 transition-group 包裹 el-table 的行 -->
  </div>
</template>

<style scoped>
.TheAlarmMonitor {
  width: 100%;
  height: 100vh;
  padding: 5%;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.stat-label {
  font-size: 14px;
  text-align: center;
  color: #666;
}

.table-main {
  margin-top: 30px;
  width: 100%;
  height: '60%';

  overflow: hidden;
}

.el-card {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-table {
  margin-top: 20px;
}

/* 自定义表格行背景颜色 */
:deep(.el-table__row--striped) {
  background-color: #00ff7f;
  /* 绿色 */
}

:deep(.el-table__row) {
  background-color: #2f4f4f;
  /* 黑色 */
  color: white;
}

/* 确保表格右边没有空白 */
.el-table__body-wrapper {
  overflow-x: hidden;
}

.theButton {
  margin-bottom: 20px;
  text-align: left;
}

.theButtonOne {
  border: none;
  border-radius: 5px;
  background-color: #3eabcb;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.theButtonOne:hover {
  background-color: #144b4b;
  color: white;
}

.el-card__body {
  margin-top: -10px;
}

/* 过渡效果 */
:deep(.el-table__row) {
  transition: all 1s ease;
}

:deep(.el-table__row.move) {
  opacity: 0;
  transform: translateX(30px);
}
</style>
