<script lang="ts" setup>
import { BarChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ref } from 'vue'
import VChart from 'vue-echarts'

const props = withDefaults(defineProps<Prop>(), {
  data: [{ category: '生活用水', percentage: 46, value: 1120 }, { category: '教学用水', percentage: 28, value: 682 }, { category: '商业用水', percentage: 11, value: 268 }, { category: '其他用水', percentage: 15, value: 365 }],
})

use([CanvasRenderer, PieChart, BarChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent])

interface Prop {
  data: any
}
const barChartOptions = ref({
  xAxis: {
    max: 'dataMax',
    show: false, // 隐藏X轴
  },
  yAxis: {
    type: 'category',
    data: ['生活用水', '教学用水', '商业用水', '其他用水'],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 3,
  },
  series: [
    {
      realtimeSort: true,
      name: 'X',
      type: 'bar',
      data: props.data.map(item => item.value),
      label: {
        show: true,
        position: 'right',
        valueAnimation: true,
      },
    },
  ],
  legend: {
    show: true,
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
})
</script>

<template>
  <div>
    <VChart :option="barChartOptions" style="width: 100%; height: 100px;" />
  </div>
</template>

<style>

</style>
