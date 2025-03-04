<script setup lang="ts">
const { childrenRoutes } = useRouteChildren()
</script>

<template>
  <div class="sr-layout">
    <Header class="sr-header" :routes="childrenRoutes">
      <!-- 头部内容 -->
    </Header>
    <main class="sr-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.sr-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  
}

.sr-header {
  height: 80px;
  flex-shrink: 0;
  background-color: #1f1f1f;
  color: white;
}

.sr-main {
  flex-grow: 1;
  overflow: hidden;
  position: relative;
}

</style>
