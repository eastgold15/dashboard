<script lang="ts" setup>
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
    <div class="img">
      <!-- 这里可以放置动画，例如一个 SVG 动画 -->
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" stroke="blue" stroke-width="5" fill="none" />
        <circle cx="25" cy="25" r="20" stroke="lightblue" stroke-width="5" fill="none" stroke-dasharray="125.6" stroke-dashoffset="125.6">
          <animate attributeName="stroke-dashoffset" from="125.6" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
    <div class="text-container">
      <div class="text-item item-title">
        {{ props.title }}
      </div>
      <div class="text-item item-content">
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
.item-content {
  color: #35d6ef;
}
</style>
