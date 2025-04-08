<script setup lang="ts">

const appConfig = useAppConfig();
useHead({
  title: appConfig.title as string,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
