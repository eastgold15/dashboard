<script setup lang="ts">
const { childrenRoutes } = useRouteChildren()
</script>

<template>
  <div class="layout-container">
    <Header class="layout-header" :routes="childrenRoutes">
      <!-- 头部内容 -->
    </Header>
    <main class="layout-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('/bg.png') no-repeat center/cover;
  overflow: hidden;
  /* 防止整体滚动 */
}

.layout-header {
  height: 80px;
  flex-shrink: 0;
}

.layout-main {
  flex-grow: 1;
  overflow: hidden;
  position: relative;
}
</style>
