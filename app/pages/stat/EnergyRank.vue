<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'stat',
})

const date = ref(new Date())
</script>

<template>
  <div class="energy-ranking">
    <el-card class="ranking-card">
      <template #header>
        <div class="card-header">
          <h2>用能排名</h2>
          <el-date-picker
            v-model="date"
            type="month"
            placeholder="选择月份"
          />
        </div>
      </template>
      <div class="ranking-content">
        <el-table :data="[]" style="width: 100%">
          <el-table-column type="index" label="排名" width="80" />
          <el-table-column prop="department" label="部门" />
          <el-table-column prop="consumption" label="用水量" />
          <el-table-column prop="ratio" label="同比" />
          <el-table-column prop="trend" label="趋势">
            <template #default="{ row }">
              <el-tag :type="row.trend === 'up' ? 'danger' : 'success'">
                {{ row.trend === 'up' ? '上升' : '下降' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.energy-ranking {
  padding: 20px;
}

.ranking-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ranking-content {
  min-height: 200px;
}
</style>
