<script setup lang="ts">
const chartData = ref([
  { category: '生活用水', percentage: 46, value: 1120, quota: 1500 },
  { category: '教学用水', percentage: 28, value: 682, quota: 1000 },
  { category: '商业用水', percentage: 11, value: 268, quota: 500 },
  { category: '其他用水', percentage: 15, value: 365, quota: 600 },
])
</script>

<template>
  <div class="water-usage-chart">
    <EchartsComponentsEchartsTitle title="用水占比" unit="m" />
    <div class="chart-container">
      <ClientOnly>
        <EchartsComponentsPipeProport :data="chartData" />
        <EchartsComponentsLineProport :data="chartData" />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.water-usage-chart {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.chart-container {
  flex: 1;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  place-items: center;
  /* 接受主轴 侧轴 两个参数，主轴是竖线 侧轴是横线 */
  gap: 10px;
}
</style>
