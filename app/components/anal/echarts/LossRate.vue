<script lang="ts" setup>
const lossRate = ref(4.63)
const chartOptions = ref<ECOption>({
  series: [
    {
      type: 'gauge',
      radius: '85%',
      startAngle: 90,
      endAngle: -270,
      max: 10, // 调整最大值，使进度更明显
      pointer: {
        show: false,
      },
      progress: {
        show: true,
        overlap: false,
        roundCap: false, // 移除圆角
        clip: false,
        width: 12, // 增加进度条宽度
        itemStyle: {
          color: '#FF0000', // 更鲜艳的红色
        },
      },
      axisLine: {
        lineStyle: {
          width: 12, // 与进度条宽度一致
          color: [[1, '#000B1C']], // 更深的背景色
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        show: true,
        fontSize: 28, // 增大字号
        fontWeight: 'normal', // 移除粗体
        offsetCenter: [0, 0],
        valueAnimation: true,
        formatter: '{value}%',
        color: '#FF0000', // 与进度条颜色一致
        padding: [0, 0, 0, 0], // 移除内边距
      },
      data: [{
        value: lossRate.value,
        name: '漏损率',
      }],
    },
  ],
})

// 模拟数据更新
let timer: any

onMounted(() => {
  // 初始更新一次
  updateLossRate()

  timer = setInterval(updateLossRate, 3000)
})

// 更新漏损率数据
function updateLossRate() {
  // 保持在 4-5 之间波动
  lossRate.value = Number((4.5 + Math.random() * 0.5 - 0.25).toFixed(2))
  const series = chartOptions.value.series as any[]
  series[0].data[0].value = lossRate.value
}

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <EchartsComponentsEchartsTitle title="今日漏损率" />
    <ClientOnly class="flex-1">
      <VChart :option="chartOptions" style="width: 100%; height: 100%;" />
    </ClientOnly>
  </div>
</template>

<style scoped></style>
