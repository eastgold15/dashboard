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
  <NuxtLink :to="props.path" :class="[{ 'header-btn-active': isActive }]" class="  text-4 skew-x--45 header-btn ">
    <p class="skew-x-45    ">
      {{ label }}
    </p>
  </NuxtLink>
</template>

<style scoped></style>
