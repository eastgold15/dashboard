<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="stat-sr-title">
    <div class="title-text">
      {{ title }}
    </div>
    <div class="title-right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.stat-sr-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #1a1a1a;
  color: #56b8de;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #333;

  .title-text {
    flex: 1;
  }

  .title-right {
    display: flex;
    align-items: center;
  }
}
</style>