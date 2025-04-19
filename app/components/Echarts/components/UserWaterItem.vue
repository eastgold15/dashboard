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
  unit: 'ml',
})
</script>

<template>
  <div class="container">
    <div class="img h-40% w-40%">
      <AnnimalsCircular :percent="33" :wave-amplitude="5" :wave-speed="0.05" />
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
