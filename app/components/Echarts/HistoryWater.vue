<template>

<ClientOnly>
 <VChart :option="option" style="width: 100%; height: 140px;" />
</ClientOnly>
 
</template>

<script lang="ts" setup>
import { ref } from 'vue'



const waterData = [
  { year: '2019年', value: 187 },
  { year: '2020年', value: 192 },
  { year: '2021年', value: 196 },
  { year: '2022年', value: 208 },
  { year: '2023年', value: 201 }
]
const option = ref<ECOption>({
  title: {
    text: '历年用水量数据',
    textStyle: {
      color: '#fff',
      fontSize: 16
    },
    left: 10,
    top: 10
  },
  grid: {
    top: '20%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: waterData.map(item => item.year),
    axisLine: {
      lineStyle: {
        color: '#4DCEF8'
      }
    },
    axisLabel: {
      color: '#fff'
    }
  },
  yAxis: {
    type: 'value',
    name: '单位：万吨',
    nameTextStyle: {
      color: '#fff'
    },
    axisLine: {
      lineStyle: {
        color: '#4DCEF8'
      }
    },
    axisLabel: {
      color: '#fff'
    },
    splitLine: {
      show: false
    }
  },
  series: [
    {
      data: waterData.map(item => ({
        value: item.value,
        label: {
          show: true,
          position: 'top',
          formatter: '{c}',
          color: '#4DCEF8',
          fontSize: 16
        }
      })),
      type: 'scatter',
      symbolSize: 60,
      symbol: 'path://M50,0 L100,25 L100,75 L50,100 L0,75 L0,25 Z',
      itemStyle: {
        color: 'rgba(0, 147, 233, 0.1)',
        borderColor: '#4DCEF8',
        borderWidth: 2
      }
    }
  ]
})

</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>