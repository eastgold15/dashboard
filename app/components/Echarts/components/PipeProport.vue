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

const pieChartOptions = ref<ECOption>({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  series: props.data.map((item, index) => ({
    name: item.category,
    type: 'pie',
    top: '0',
    left: '0',
    radius: ['50%', '75%'], // 调整圆环的大小
    center: [`${(index + 1) * 25 - 12.5}%`, '40%'],
    data: [
      { value: item.value, name: item.category },
      { value: item.quota - item.value, name: '剩余定额', itemStyle: { color: '#e0e0e0' } },
    ],
    label: {
      show: true,
      position: 'center',
      color: 'inherit', // 继承饼图颜色
      formatter: (params) => {
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
  legend: props.data.map((item, index) => ({
    data: [item.category],
    left: `${(index) * 25 + 6}%`,
    top: '86%', // 调整到图表下方
    textStyle: {
      fontSize: 12, // 稍微调小字体
      color: '#333',
      align: 'center',
    },
    itemWidth: 0, // 移除图例标记
    itemHeight: 0,
    textAlign: 'center',
  })),
})
</script>

<template>
  <VChart :option="pieChartOptions" style="width: 100%; height: 140px;" />
</template>

<style scoped>
/* 添加一些全局样式以确保图表在不同设备上都能良好显示 */
.v-chart {
  max-width: 100%;
  height: auto;
  max-width: 200px;
}
</style>
