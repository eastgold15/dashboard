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

      <EchartsComponentsEchartsTitle title="用水占比" unit="m"></EchartsComponentsEchartsTitle>
      <div class="chart-container">
        <EchartsComponentsPipeProport />
        <EchartsComponentsLineProport />
     
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.chart-container {
  margin-top: 20px;

}
</style>
