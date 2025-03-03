<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'anal',
})

const analysisDate = ref([])
</script>

<template>
  <div class="water-supply-analysis">
    <el-card class="supply-card">
      <template #header>
        <div class="card-header">
          <h2>供水分析</h2>
          <div class="header-controls">
            <el-date-picker
              v-model="analysisDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button type="primary" class="ml-4">
              分析
            </el-button>
          </div>
        </div>
      </template>
      <div class="supply-content">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                供水总量
              </template>
              <div class="stat-value">
                0 m³
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" class="stat-card">
              <template #header>
                供水压力
              </template>
              <div class="stat-value">
                0 MPa
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="chart-container">
          <p class="text-center">
            供水趋势图表区域
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.water-supply-analysis {
  padding: 20px;
}

.supply-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-controls {
  display: flex;
  align-items: center;
}

.supply-content {
  margin-top: 20px;
}

.stat-card {
  margin-bottom: 20px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--el-color-primary);
  text-align: center;
  margin-top: 10px;
}

.chart-container {
  min-height: 300px;
  margin-top: 20px;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 20px;
}

.text-center {
  text-align: center;
}
</style>
