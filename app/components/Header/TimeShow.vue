<script lang="ts" setup>
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

// 设置 dayjs 使用中文语言环境
dayjs.locale('zh-cn')

const time = ref(dayjs().format('HH:mm:ss'))
const dayOfWeek = ref(dayjs().format('dddd'))
const date = ref(dayjs().format('YYYY-MM-DD'))

function updateTime() {
  time.value = dayjs().format('HH:mm:ss')
  dayOfWeek.value = dayjs().format('dddd')
  date.value = dayjs().format('YYYY-MM-DD')
}

let intervalId: NodeJS.Timeout

onMounted(() => {
  intervalId = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <ClientOnly>
    <div class="justify- flex gap-1 color-#387e98">
      <div class="clipped-square">
        {{ time }}
      </div>
      |
      <div class="disClipped-square">
        <div>{{ dayOfWeek }}</div>
        <div>{{ date }}</div>
      </div>
    </div>
  </ClientOnly>

</template>

<style>
.clipped-square {
  width: 120px;
  height: 35px;

  /* 设置颜色 */
  /* 使用 clip-path 属性切去一个角 */
  clip-path: polygon(10% 0, 100% 1%, 100% 100%, 10% 100%, 0 50%);
  background: linear-gradient(to right, #387e98, #000000);
  /* 渐变颜色 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  font-weight: 700;
}

.disClipped-square {
  width: 120px;
  height: 35px;

  /* 设置颜色 */
  /* 使用 clip-path 属性切去一个角 */
  clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #000000, #387e98);
  /* 渐变颜色 */
  color: white;
  font-size: 10px;
  font-weight: 500;
}
</style>
