<template>
  <div class="remote-meter-reading">
    <el-card class="meter-card">
      <template #header>
        <div class="card-header">
          <h2>远程抄表</h2>
          <el-button type="primary">刷新数据</el-button>
        </div>
      </template>
      <div class="meter-content">
        <el-table :data="[]" style="width: 100%">
          <el-table-column prop="meterNo" label="表号" />
          <el-table-column prop="location" label="位置" />
          <el-table-column prop="reading" label="读数" />
          <el-table-column prop="readTime" label="抄表时间" />
          <el-table-column prop="status" label="状态" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'sr'
})
</script>

<style scoped>
.remote-meter-reading {
  padding: 20px;
}

.meter-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meter-content {
  min-height: 200px;
}
</style>
