<template>
    <div class="h-full w-full flex flex-col">
        <EchartsComponentsEchartsTitle title="今日漏损分析" />
        <ClientOnly class="flex-1">
            <VChart :option="barChartOptions" style="width: 100%; height: 100%;" />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>

const waterData = [
    { name: '今日总供水量', value: 2763 },
    { name: '今日总用水量', value: 2635 },
    { name: '今日漏损量', value: 128 }
]

const barChartOptions = ref<ECOption>({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['水量'],
        textStyle: {
            color: '#90EE90'
        },
        right: 10,
        top: 0
    },
    grid: {
        left: '120px',
        right: '60px',
        top: '40px',
        bottom: '20px',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: '#4DCEF8'
            }
        },
        axisLabel: {
            color: '#4DCEF8'
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        data: waterData.map(item => item.name),
        axisLine: {
            lineStyle: {
                color: '#4DCEF8'
            }
        },
        axisLabel: {
            color: '#4DCEF8'
        }
    },
    series: [
        {
            name: '水量',
            type: 'bar',
            data: waterData.map(item => ({
                value: item.value,
                itemStyle: {
                    color: item.name === '今日总供水量' ? '#DEB887' : '#4DCEF8',
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    color: '#4DCEF8'
                }
            })),
            barWidth: 16
        }
    ]
})

// 模拟数据更新
// let timer: number

// onMounted(() => {
//     timer = setInterval(() => {
//         waterData.forEach(item => {
//             if (item.name === '今日总供水量') {
//                 item.value = Math.floor(2700 + Math.random() * 100)
//             } else if (item.name === '今日总用水量') {
//                 item.value = Math.floor(2600 + Math.random() * 100)
//             } else {
//                 item.value = Math.floor(100 + Math.random() * 50)
//             }
//         })
        
//         barChartOptions.value.series[0].data = waterData.map(item => ({
//             value: item.value,
//             itemStyle: {
//                 color: item.name === '今日总供水量' ? '#DEB887' : '#4DCEF8',
//             },
//             label: {
//                 show: true,
//                 position: 'right',
//                 formatter: '{c}',
//                 color: '#4DCEF8'
//             }
//         }))
//     }, 3000)
// })

// onUnmounted(() => {
//     if (timer) {
//         clearInterval(timer)
//     }
// })
</script>

<style scoped>

</style>
