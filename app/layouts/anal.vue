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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('/bg.png') no-repeat center/cover;
  overflow: hidden;
}

.layout-header {
  flex-shrink: 0;
  height: 80px;
}

.layout-main {
  flex-grow: 1;
  overflow: hidden;
  /* 禁止内容区域滚动 */
  position: relative;
}
</style>
