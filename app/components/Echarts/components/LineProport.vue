<script lang="ts" setup>
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ref } from 'vue'
import VChart from 'vue-echarts'

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

use([CanvasRenderer, PieChart, BarChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent])

const barChartOptions = ref({
  xAxis: {
    type: 'value',
    show: false, // 隐藏 X 轴
    max: Math.max(...props.data.map(item => item.quota)),
    min: 0,
  },
  yAxis: {
    type: 'category',
    data: props.data.map(item => item.category), // 使用 category 字段
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: props.data.length - 1,
    axisLabel: {
      fontSize: 14, // 调整字体大小
      color: '#333', // 调整字体颜色
    },
  },
  grid: {
    left: '3%',
    right: '10%',
    bottom: '3%',
    containLabel: true,
  },
  series: [
    {
      realtimeSort: true,
      name: '用水量',
      type: 'bar',
      data: props.data.map(item => item.value),
      label: {
        show: true,
        position: 'insideRight',
        formatter: '{c}', // 显示 quota 值
        valueAnimation: true,
      },
      itemStyle: {
        borderRadius: 5, // 设置圆角
      },
    },
  ],
  legend: {
    show: false, // 隐藏图例
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
})
</script>

<template>
  <div>
    <VChart :option="barChartOptions" style="width: 100%; height: 150px;" />
  </div>
</template>

<style scoped>
/* 可以添加一些样式来调整图表的外观 */
.v-chart {
  max-width: 100%;
  height: auto;
  max-width: 200px;
}
</style>




