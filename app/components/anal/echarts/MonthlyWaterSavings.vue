<template>
    <div class="h-full w-full flex flex-col">
        <EchartsComponentsEchartsTitle title="月节水量" />
        <ClientOnly class="flex-1">
            <VChart :option="barChartOptions" style="width: 100%; height: 100%;" />
        </ClientOnly>
    </div>
</template>

<script lang="ts" setup>


const monthlyData = ref([
    { month: '1月', baseline: 116253, actual: 83748, saving: 32505 },
    { month: '2月', baseline: 115000, actual: 82000, saving: 33000 },
    { month: '3月', baseline: 114000, actual: 81000, saving: 33000 },
    { month: '4月', baseline: 113000, actual: 80000, saving: 33000 },
    { month: '5月', baseline: 112000, actual: 79000, saving: 33000 },
    { month: '6月', baseline: 111000, actual: 78000, saving: 33000 },
    { month: '7月', baseline: 110000, actual: 77000, saving: 33000 },
    { month: '8月', baseline: 109000, actual: 76000, saving: 33000 },
    { month: '9月', baseline: 108000, actual: 75000, saving: 33000 },
    { month: '10月', baseline: 107000, actual: 74000, saving: 33000 },
    { month: '11月', baseline: 106000, actual: 73000, saving: 33000 },
    { month: '12月', baseline: 105000, actual: 72000, saving: 33000 }
])

const barChartOptions = ref<ECOption>({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['月基准水量', '月实际用量', '月节水量'],
        textStyle: {
            color: '#4DCEF8'
        },
        top: 0,
        right: 10
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '40px',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: monthlyData.value.map(item => item.month),
        axisLine: {
            lineStyle: {
                color: '#4DCEF8'
            }
        },
        axisLabel: {
            color: '#4DCEF8'
        }
    },
    yAxis: {
        type: 'value',
        name: '单位：m³',
        nameTextStyle: {
            color: '#4DCEF8'
        },
        axisLine: {
            lineStyle: {
                color: '#4DCEF8'
            }
        },
        axisLabel: {
            color: '#4DCEF8'
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(77,206,248,0.1)',
                type: 'dashed'
            }
        }
    },
    series: [
        {
            name: '月基准水量',
            type: 'bar',
            data: monthlyData.value.map(item => item.baseline),
            itemStyle: {
                color: '#4DCEF8'
            },
            barMaxWidth: 20
        },
        {
            name: '月实际用量',
            type: 'bar',
            data: monthlyData.value.map(item => item.actual),
            itemStyle: {
                color: '#808080'
            },
            barMaxWidth: 20
        },
        {
            name: '月节水量',
            type: 'bar',
            data: monthlyData.value.map(item => item.saving),
            itemStyle: {
                color: '#90EE90'
            },
            barMaxWidth: 20
        }
    ]
})

// // 模拟数据更新
// let timer: NodeJS.Timer

// onMounted(() => {
//     timer = setInterval(() => {
//         monthlyData.value = monthlyData.value.map(item => ({
//             ...item,
//             baseline: item.baseline + Math.random() * 1000 - 500,
//             actual: item.actual + Math.random() * 800 - 400,
//             saving: item.saving + Math.random() * 200 - 100
//         }))
        
//         barChartOptions.value.series[0].data = monthlyData.value.map(item => item.baseline)
//         barChartOptions.value.series[1].data = monthlyData.value.map(item => item.actual)
//         barChartOptions.value.series[2].data = monthlyData.value.map(item => item.saving)
//     }, 3000) // 每3秒更新一次数据
// })

// onUnmounted(() => {
//     if (timer) {
//         clearInterval(timer)
//     }
// })
</script>

<style scoped>

</style>
