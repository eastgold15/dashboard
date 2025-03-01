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

interface Prop {
  data: any
}
use([CanvasRenderer, PieChart, BarChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent])

const pieChartOptions = ref({
  title: {
    text: '用水占比',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    left: 'auto',
    top: '50%',
  },
  series: [
    {
      name: '用水占比',
      type: 'pie',
      radius: '50%',
      data: props.data.map(item => ({ value: item.value, name: item.category })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})
</script>

<template>
  <VChart :option="pieChartOptions" style="width: 100%; height: 200px;" />
</template>

<style>

</style>
