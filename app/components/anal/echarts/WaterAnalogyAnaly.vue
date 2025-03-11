<script lang="ts" setup>
const waterData = [
  { name: '食堂', value: 9.98 },
  { name: '公共区域', value: 21.93 },
  { name: '休息区', value: 3.3 },
  { name: '商业区', value: 8.34 },
  { name: '教学区', value: 5.42 },
]

const barChartOptions = ref<ECOption>({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}%',
  },
  series: [
    {
      name: '区域用水',
      type: 'pie',
      radius: ['65%', '85%'],
      startAngle: 180,
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#0C1F31',
        borderWidth: 2,
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}\n{c}%',
        color: '#4DCEF8',
        fontSize: 12,
        lineHeight: 15,
      },
      labelLine: {
        length: 15,
        length2: 10,
        maxSurfaceAngle: 80,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
      data: waterData,
      color: ['#4DCEF8', '#FFD700', '#90EE90', '#1E90FF', '#FF69B4'],
    },
  ],
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <EchartsComponentsEchartsTitle title="区域用水占比分析" />
    <ClientOnly class="flex-1">
      <VChart :option="barChartOptions" style="width: 100%; height: 100%;" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
