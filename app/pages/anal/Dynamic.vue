<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'anal',
  alias: ['/anal'],
})

const timeRange = ref('today')
</script>

<template>
  <div class="dynamic-analysis">
    <el-card class="analysis-card">
      <template #header>
        <div class="card-header">
          <h2>动态分析</h2>
          <el-select v-model="timeRange" placeholder="选择时间范围">
            <el-option label="今日" value="today" />
            <el-option label="本周" value="week" />
            <el-option label="本月" value="month" />
          </el-select>
        </div>
      </template>
      <div class="analysis-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                总用水量
              </template>
              <div class="stat-value">
                0 m³
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                平均用水量
              </template>
              <div class="stat-value">
                0 m³/天
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <template #header>
                用水趋势
              </template>
              <div class="stat-value">
                持平
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.dynamic-analysis {
  padding: 20px;
}

.analysis-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.analysis-content {
  margin-top: 20px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--el-color-primary);
  text-align: center;
  margin-top: 10px;
}
</style>
