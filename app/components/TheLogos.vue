<script setup lang="ts">
</script>

<template>
  <div class="display-logo" flex="~" items-center gap-2>
    <img
      class="logo"
      src="https://element-plus.org/images/element-plus-logo.svg"
    >
    <el-icon><ElIconPlus /></el-icon>
    <NuxtLogo class="logo" />
  </div>
  <h2>
    <a target="_blank" href="https://element-plus.org/">Element Plus</a>
    With
    <a target="_blank" href="https://v3.nuxtjs.org/">NuxtJS</a>
  </h2>
</template>

<style>
.display-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  max-height: 3rem;
}
</style>
