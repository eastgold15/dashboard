<script lang="ts" setup>
const data = [
  29.3,
  23.4,
  33.2,
  45.5,
  56.3,
  31.3,
  47.2,
  34.2,
  56.5,
  74.3,
  66.5,
  61.3,
]

const option = ref<ECOption>({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  yAxis: {
    type: 'value',
    name: '单位：万吨',
  },
  series: [
    {
      name: '本年水量',
      type: 'line',
      data,
      smooth: true,
      showSymbol: true,
      symbolSize: 8,
      lineStyle: {
        width: 2,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#1890FF',
            },
            {
              offset: 1,
              color: '#91D5FF',
            },
          ],
        },
      },
      areaStyle: {
        opacity: 0.1,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#1890FF',
            },
            {
              offset: 1,
              color: '#91D5FF',
            },
          ],
        },
      },
    },
  ],
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <EchartsComponentsEchartsTitle title="本年月度用水量走势" unit="m" />
    <div class="flex-1 justify-center">
      <ClientOnly>
        <VChart :option="option" autoresize class="h-full w-full" />
      </ClientOnly>
    </div>
  </div>
</template>
