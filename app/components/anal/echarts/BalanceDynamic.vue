<script lang="ts" setup>
const waterData = {
  meters: [
    { name: '一级表', flow: 6253, leak: 0 },
    { name: '二级表', flow: 6253, leak: 211 },
    { name: '三级表', flow: 5981, leak: 161 },
  ],
  areas: [
    { name: '图书馆总进水', flow: 612, leak: 0 },
    { name: '图书馆支路总用水', flow: 54, leak: 8 },
    { name: '商业街总进水', flow: 413, leak: 0 },
    { name: '商业街支路总用水', flow: 32, leak: 16 },
    { name: '四教总进水', flow: 693, leak: 0 },
    { name: '四教支路总用水', flow: 56, leak: 13 },
  ],
}

const barChartOptions = ref<ECOption>({
  legend: {
    data: ['每小时总水量', '漏损量'],
    right: 20,
    top: 0,
    textStyle: { color: '#4DCEF8' },
  },
  grid: [
    { top: '10%', height: '30%', left: '3%', right: '3%' },
    { top: '50%', height: '45%', left: '3%', right: '3%' },
  ],
  xAxis: [
    {
      type: 'category',
      data: waterData.meters.map(item => item.name),
      axisLabel: { color: '#4DCEF8' },
      axisLine: { lineStyle: { color: '#4DCEF8' } },
    },
    {
      type: 'category',
      gridIndex: 1,
      data: waterData.areas.map(item => item.name),
      axisLabel: {
        color: '#4DCEF8',
        interval: 0,
        rotate: 45,
      },
      axisLine: { lineStyle: { color: '#4DCEF8' } },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: { color: '#4DCEF8' },
      axisLine: { lineStyle: { color: '#4DCEF8' } },
      splitLine: { show: false },
    },
    {
      gridIndex: 1,
      type: 'value',
      axisLabel: { color: '#4DCEF8' },
      axisLine: { lineStyle: { color: '#4DCEF8' } },
      splitLine: { show: false },
    },
  ],
  series: [
    {
      name: '每小时总水量',
      type: 'bar',
      data: waterData.meters.map(item => item.flow),
      itemStyle: { color: '#4DCEF8' },
      label: {
        show: true,
        position: 'top',
        color: '#4DCEF8',
      },
    },
    {
      name: '漏损量',
      type: 'bar',
      data: waterData.meters.map(item => item.leak),
      itemStyle: { color: '#FF4444' },
      label: {
        show: true,
        position: 'top',
        color: '#FF4444',
      },
    },
    {
      name: '每小时总水量',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: waterData.areas.map(item => item.flow),
      itemStyle: { color: '#4DCEF8' },
      label: {
        show: true,
        position: 'top',
        color: '#4DCEF8',
      },
    },
    {
      name: '漏损量',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: waterData.areas.map(item => item.leak),
      itemStyle: { color: '#FF4444' },
      label: {
        show: true,
        position: 'top',
        color: '#FF4444',
      },
    },
  ],
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <EchartsComponentsEchartsTitle title="水平衡动态看板" />
    <ClientOnly class="flex-1">
      <VChart :option="barChartOptions" style="width: 100%; height: 100%;" />
    </ClientOnly>
  </div>
</template>

<style scoped>
:deep(.echarts) {
  width: 100% !important;
  height: 100% !important;
}
</style>
