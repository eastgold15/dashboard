<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const waterData = [
  { name: '图书馆总进水', flow: 612, leak: 0 },
  { name: '图书馆支路总用水', flow: 54, leak: 8 },
  { name: '商业街总进水', flow: 413, leak: 0 },
  { name: '商业街支路总用水', flow: 32, leak: 16 },
  { name: '四教总进水', flow: 693, leak: 0 },
  { name: '四教支路总用水', flow: 56, leak: 13 },
]

const barChartOptions = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['小时水量', '漏损量'],
    textStyle: {
      color: '#4DCEF8',
    },
    right: 10,
    top: 0,
  },
  grid: {
    left: '140px',
    right: '40px',
    top: '40px',
    bottom: '20px',
  },
  xAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#4DCEF8',
      },
    },
    axisLabel: {
      color: '#4DCEF8',
    },
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'category',
    data: waterData.map(item => item.name),
    axisLine: {
      lineStyle: {
        color: '#4DCEF8',
      },
    },
    axisLabel: {
      color: '#4DCEF8',
    },
  },
  series: [
    {
      name: '小时水量',
      type: 'bar',
      data: waterData.map(item => item.flow),
      itemStyle: {
        color: '#4DCEF8',
      },
      barWidth: 12,
      label: {
        show: true,
        position: 'right',
        color: '#4DCEF8',
      },
    },
    {
      name: '漏损量',
      type: 'bar',
      data: waterData.map(item => item.leak),
      itemStyle: {
        color: 'rgba(77,206,248,0.3)',
      },
      barWidth: 12,
      label: {
        show: true,
        position: 'right',
        color: 'rgba(77,206,248,0.3)',
      },
    },
  ],
})

// 模拟数据更新
let timer: any

onMounted(() => {
  timer = setInterval(() => {
    waterData.forEach((item) => {
      item.flow += Math.random() * 10 - 5
      item.leak += Math.random() * 2 - 1
    })
    const series = barChartOptions.value.series as any
    series[0].data = waterData.map(item => item.flow)
    series[1].data = waterData.map(item => item.leak)
  }, 3000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <EchartsComponentsEchartsTitle title="区域用水监测" />
    <ClientOnly class="flex-1">
      <VChart :option="barChartOptions" style="width: 100%; height: 100%;" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
