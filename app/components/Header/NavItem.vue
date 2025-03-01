<script setup lang="ts">
// filepath: /d:/1codespace/flutter/web/dashboard/app/components/Header/NavItem.vue
interface Props {
  path: string
  label: string
}

const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="props.path" class="parallelogram">
    <p class="">
      {{ label }}
    </p>
  </NuxtLink>
</template>

<style scoped>
.parallelogram {
  width: 120px;
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;

  background-color: #387e98; /* 设置颜色 */
  color: #fff;
  /* 使用 skewX 函数让 div 向右倾斜 */
  transform: skewX(-45deg);
  /* 可选：添加阴影效果以增强立体感 */
  /*   box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); */
  p {
    transform: skewX(45deg);
  }
}
</style>
