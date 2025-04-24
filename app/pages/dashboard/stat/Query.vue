<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'stat',
})

const dateRange = ref([])
</script>

<template>
  <div class="statistical-query">
    <el-card class="query-card">
      <template #header>
        <div class="card-header">
          <h2>统计查询</h2>
          <div class="query-controls">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
            <el-button type="primary" class="ml-4">
              查询
            </el-button>
          </div>
        </div>
      </template>
      <div class="query-content">
        <el-table :data="[]" style="width: 100%">
          <el-table-column prop="date" label="日期" />
          <el-table-column prop="department" label="部门" />
          <el-table-column prop="waterUsage" label="用水量" />
          <el-table-column prop="cost" label="费用" />
          <el-table-column label="操作">
            <template #default>
              <el-button type="primary" link>
                详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.statistical-query {
  padding: 20px;
}

.query-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.query-controls {
  display: flex;
  align-items: center;
}

.query-content {
  min-height: 200px;
}
</style>
