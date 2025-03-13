<script lang="ts" setup>
interface Props {
  title: string
  aligns: 'left' | 'center' | 'right'
}
withDefaults(defineProps<Props>(), {
  title: '标题',
  aligns: 'center',
})
</script>

<template>
  <div class="title-container">
    <div class="left-slot">
      <slot name="left">
        <span class="title-text">{{ title }}</span>
      </slot>
    </div>
    <div
      class="center-slot"
      :class="{ 'text-left': aligns === 'left', 'text-center': aligns === 'center', 'text-right': aligns === 'right' }"
    >
      <slot name="center" />
    </div>
    <div class="right-slot">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-container {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 16px;
  padding: 12px 20px;
  background: #1a1a1a;
  color: rgb(113, 201, 220);
  border-radius: 4px;
  align-items: center;

  .title-text {
    font-size: 16px;
    font-weight: 500;
  }

  .center-slot {
    min-width: 0;
  }

  .text-left {
    text-align: left;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }
}
</style>
