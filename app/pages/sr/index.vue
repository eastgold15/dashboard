<script setup lang="ts">
definePageMeta({
  layout: 'sr',
})
</script>

<template>
  <div class="statistics-kanban">
    <el-card class="kanban-card">
      <template #header>
        <div class="card-header">
          <h2>统计看板</h2>
        </div>
      </template>
      <div class="kanban-content">
        <p>统计看板内容区域</p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.statistics-kanban {
  padding: 20px;
}

.kanban-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.kanban-content {
  min-height: 200px;
}
</style>
