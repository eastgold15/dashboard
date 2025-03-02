<script lang="ts" setup>
import { format } from 'echarts'
import { PieChart } from 'echarts/charts'
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

use([CanvasRenderer, PieChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent])

const pieChartOptions = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  series: props.data.map((item: { category: any, value: number, quota: number }, index: number) => ({
    name: item.category,
    type: 'pie',
    top: '0',
    left: '0',

    radius: ['50%', '80%'], // 调整圆环的大小
    center: [`${(index + 1) * 25 - 12.5}%`, '40%'],
    data: [
      { value: item.value, name: item.category },
      { value: item.quota - item.value, name: '剩余定额', itemStyle: { color: '#e0e0e0' } },
    ],
    label: {
      show: true,
      position: 'center',
      color: 'inherit', // 继承饼图颜色
      formatter: (params: { name: any, value: any, percent: any }) => {
        const { percent } = params
        if (params.name === '剩余定额') {
          return ``
        }
        return `${percent}%`
      },

      fontSize: 20,

    },
    labelLine: {
      show: false,
    },
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 2,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 20,
        shadowOffsetX: 0,
        // shadowColor: 'rgba(0, 0, 0, 0.8)',
      },
    },
  })),
  legend: props.data.map((item: { category: any }, index: number) => ({
    data: [item.category],
    left: `${(index) * 25 + 8.5}%`,
    top: '65%',
    align: 'left',
    textStyle: {
      fontSize: 18,
      color: '#333',
    },

  })),
})
</script>

<template>
  <VChart :option="pieChartOptions" style="width: 100%; height: 120px;" />
</template>

<style scoped>
/* 添加一些全局样式以确保图表在不同设备上都能良好显示 */
.v-chart {
  max-width: 100%;
  height: auto;
  max-width: 200px;
}
</style>
