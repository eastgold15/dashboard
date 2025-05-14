<script lang="ts" setup>
import { AnnimalsCircular } from '#components'

interface Props {
  title: string
  content: number
  unit: string // 单位
}
const props = withDefaults(defineProps<Props>(), {
  title: '今日喝水',
  content: 2,
  unit: 'm',
})

const percent = computed(() => {
  if (props.unit === 'm³') {
    const e = 1000
    return Math.floor(props.content / e * 100)
  }
  else if (
    props.unit === '百m³'
  ) {
    const e = 1000
    return Math.floor(props.content / e * 100)
  }
  else if (props.unit === '千m³') {
    const e = 100
    return Math.floor(props.content / e * 100)
  }
  else {
    const e = 1000
    return Math.floor(props.content / e * 100)
  }
})
</script>

<template>
  <div class="container">
    <div class="img h-40% w-40%">
      <AnnimalsCircular :percent="percent" :wave-amplitude="5" :wave-speed="0.05" />
    </div>
    <div class="text-container">
      <div class="text-item item-title">
        {{ props.title }}
      </div>
      <div class="text-item bgAlpha">
        {{ props.content }}
        <span class="unit">{{ props.unit }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  height: 80px;
}

.img {
  margin-right: 20px;
}

.text-container {
  display: flex;
  flex-direction: column;
}

.text-item {
  margin-bottom: 5px;
}

.item-title {
  font-size: large;
}
</style>
