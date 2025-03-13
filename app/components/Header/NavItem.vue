<script setup lang="ts">
// filepath: /d:/1codespace/flutter/web/dashboard/app/components/Header/NavItem.vue
interface Props {
  path: string
  label: string
}

const props = defineProps<Props>()
const route = useRoute()
const isActive = computed(() => route.path === props.path)
</script>

<template>
  <NuxtLink :to="props.path" :class="[{ 'btn-active': isActive }]" class="parallelogram btn btn">
    <p>
      {{ label }}
    </p>
  </NuxtLink>
</template>

<style scoped>
.parallelogram {
  display: inline-block;

  /* 使用 skewX 函数让 div 向右倾斜 */
  transform: skewX(-45deg);

  /* 可选：添加阴影效果以增强立体感 */
  /*   box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); */
  p {
    transform: skewX(45deg);
  }
}
</style>
