<script setup lang="ts">
const route = useRoute()
console.log('route', route)
const { rootRoutes } = useRouteChildren(route.path)
</script>

<template>
  <section class="layout-container">
    <Header class="layout-header" :routes="rootRoutes">
      <!-- 头部内容 -->
    </Header>
    <main class="layout-main">
      <slot />
    </main>
  </section>
</template>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 确保 section 占满整个视口高度 */
  width: 100%;
  // background-color: var(--app-content-bg-color);
  background: url('/bg.jpg') no-repeat center/cover;
}

.layout-header {
  flex-shrink: 0;
  height: 60px; /* 你可以根据需要调整头部的高度 */
}

.layout-main {
  flex-grow: 1; /* 使 main 占据剩余的空间 */
  overflow: auto;
}
</style>
