<script lang="ts" setup>
interface EchatsItem {
  category: string
  percentage: number
  value: number
  quota: number
}
interface Prop {
  data: EchatsItem[]
}
const props = withDefaults(defineProps<Prop>(), {
  data: () => [
    { category: '生活用水', percentage: 46, value: 1120, quota: 1500 },
    { category: '教学用水', percentage: 28, value: 682, quota: 1000 },
    { category: '商业用水', percentage: 11, value: 268, quota: 500 },
    { category: '其他用水', percentage: 15, value: 365, quota: 600 },
  ],
})

const barChartOptions = ref<ECOption>({
  xAxis: {
    type: 'value',
    show: false,
    max: Math.max(...props.data.map(item => item.quota)),
    min: 0,
  },
  yAxis: {
    type: 'category',
    data: props.data.map(item => item.category),
    inverse: true,
    axisLabel: {
      fontSize: 12,
      color: '#333',
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  grid: {
    left: '4%',
    top: '0%',
    bottom: '0%',
    right: '15%',
    containLabel: true,
  },
  series: [
    {
      // 定额线（底部白色）
      name: '定额',
      type: 'bar',
      data: props.data.map(item => item.quota),
      barWidth: 12,
      barGap: '-100%', // 确保两个bar完全重合
      itemStyle: {
        color: '#f0f0f0',
        borderRadius: [4, 4, 4, 4],
        borderWidth: 0,
      },
      z: 1,
    },
    {
      // 实际用水量（上层蓝色）
      name: '用水量',
      type: 'bar',
      data: props.data.map(item => item.value),
      barWidth: 12,
      barGap: '-100%', // 确保两个bar完全重合
      itemStyle: {
        color: '#409EFF',
        borderRadius: [4, 4, 4, 4],
        borderWidth: 0,
      },
      label: {
        show: true,
        position: 'right',
        formatter: (params: any) => {
          const item = props.data[params.dataIndex]
          return `${item!.value}/${item!.quota}`
        },
        fontSize: 12,
      },
      z: 2,
    },
  ],
  tooltip: {
    show: true,
    trigger: 'axis',
    formatter: (params: any) => {
      const item = props.data[params[0].dataIndex]
      return `${item!.category}<br/>用水量：${item!.value}<br/>定额：${item!.quota}`
    },
  },
})
</script>

<template>
  <div class="chart-container">
    <!-- 这里有一个细节，使用Div盖者VChart将再加一个类来扩展它的宽度和高度，否则VChar无法设置宽度和高度 -->

    <VChart :option="barChartOptions" style="width: 100%; height: 140px;" />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 140px;
}
</style>
