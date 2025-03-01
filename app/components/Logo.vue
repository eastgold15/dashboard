<script lang="ts" setup>
const appStore = useMyAppStore()
const title = appStore.getTitle()
</script>

<template>
  <div>
    <NuxtLink to="#">
      {{ title }}
    </NuxtLink>
  </div>
</template>

<style>

</style>
