<script setup lang="ts">
const chartData = ref([
  { category: '生活用水', percentage: 46, value: 1120 },
  { category: '教学用水', percentage: 28, value: 682 },
  { category: '商业用水', percentage: 11, value: 268 },
  { category: '其他用水', percentage: 15, value: 365 },
])
</script>

<template>
  <ClientOnly>
    <div class="water-usage-chart">
      <div class="chart-title">
        <div class="name">
          用水数据
        </div>
        <div class="unit">
          单位：m
        </div>
      </div>
      <div class="chart-container">
        <EchartsComponentsLineProport />
        <EchartsComponentsPipeProport />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.water-usage-chart {
  font-family: Arial, sans-serif;
  text-align: center;
}
.chart-title {
  height: 25px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  flex-shrink: 1;
  display: flex;
  text-align: left;
  .name {
    flex: 1;
  }
  .unit {
    width: 80px;
  }
}

.chart-container {
  margin-top: 20px;
}
</style>
