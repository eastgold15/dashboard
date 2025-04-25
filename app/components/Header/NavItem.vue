<script setup lang="ts">
// filepath: /d:/1codespace/flutter/web/dashboard/app/components/Header/NavItem.vue

const props = defineProps<{
  path: string
  label: string
  active?: boolean
}>()
console.log('props:', props)
</script>

<template>
  <NuxtLink :to="path" :class="[{ 'header-btn-active': active }]" class="skew-x--45 text-4 header-btn">
    <p class="skew-x-45">
      {{ label }}
    </p>
  </NuxtLink>
</template>

<style scoped></style>
