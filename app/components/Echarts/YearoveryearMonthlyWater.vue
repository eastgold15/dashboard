<script lang="ts" setup>
const option = ref<ECOption>({

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['去年同期', '本期'],
    right: '10%',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
  },
  yAxis: {
    type: 'value',
    name: '用水量',
    axisLabel: {
      formatter: '{value}',
    },
  },
  series: [
    {
      name: '去年同期',
      type: 'bar',
      data: [35, 45, 57, 75, 50, 70, 72, 52, 78],
      itemStyle: {
        color: '#ffffff',
      },
    },
    {
      name: '本期',
      type: 'bar',
      data: [22, 32, 45, 52, 25, 45, 32, 55, 70],
      itemStyle: {
        color: '#67C23A',
      },
    },
  ],
})
</script>

<template>
  <div class="echart-layout">
    <EchartsComponentsEchartsTitle title="年度用水量同比分析图" unit="m" />
    <ClientOnly>
      <VChart :option="option" style="width: 100%; height: 140px;" class="echart" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
