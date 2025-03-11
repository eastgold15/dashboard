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
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" stroke="blue" stroke-width="5" fill="none" />
        <circle cx="25" cy="25" r="20" stroke="lightblue" stroke-width="5" fill="none" stroke-dasharray="125.6" stroke-dashoffset="125.6">
          <animate attributeName="stroke-dashoffset" from="125.6" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
    <div class="text-container">
      <div class="item-title text-item">
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
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  place-items: center;
}

.img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.text-container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.text-item {
  margin-bottom: 5px;
}

.item-title {
  font-size: 16px;
  font-weight: bold;
}

.unit {
  font-size: 14px;
  margin-left: 4px;
}
</style>
