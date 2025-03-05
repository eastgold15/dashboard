<template>
  <div class="h-full w-full flex flex-col">
    <EchartsComponentsEchartsTitle title="用水类别占比分析" />
    <ClientOnly class="flex-1">
  
      <VChart :option="barChartOptions" style="width: 100%; height: 100%;" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>




const waterData = [
  { name: '生活用水', value: 46 },
  { name: '其他用水', value: 28 },
  { name: '商业用水', value: 11 },
  { name: '其他用水', value: 15 }
]

const barChartOptions = ref<ECOption>({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c}%'
  },
  series: [
    {
      name: '用水类别',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#0C1F31',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}\n{c}%',
        color: '#4DCEF8'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      data: waterData,
      color: ['#4DCEF8', '#00FF00', '#FFFF00', '#FF69B4']
    }
  ]
  })

</script>

<style scoped>

</style>
