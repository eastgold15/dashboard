<script setup lang="ts">
const { rootRoutes } = useRouteChildren()
</script>

<template>
  <section class="layout-container flex-col">
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
  height: 100vh;
  width: 100%;
  background: url('/bg.png') no-repeat center/cover;
  overflow: hidden; /* 防止整体滚动 */
}

.layout-header {
  flex-shrink: 0;
  height: 80px; /* 调整header高度为80px */
}

.layout-main {
  flex-grow: 1;
  overflow: hidden; /* 禁止内容区域滚动 */
  position: relative; /* 为内部定位提供参考 */
}
</style>
