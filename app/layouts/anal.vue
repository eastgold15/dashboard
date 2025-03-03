<script setup lang="ts">
const { childrenRoutes } = useRouteChildren()
</script>

<template>
  <div class="wa-layout">
    <Header class="layout-header" :routes="childrenRoutes">
      <!-- 头部内容 -->
    </Header>
    <main class="wa-main">
      <slot />
    </main>
    <footer class="wa-footer">
      <p>&copy; 2024 水务管理系统</p>
    </footer>
  </div>
</template>

<style scoped>
.wa-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.wa-header {
  padding: 1rem;
  background-color: var(--el-color-primary);
  color: white;
}

.wa-main {
  flex: 1;
  padding: 1rem;
}

.wa-footer {
  padding: 1rem;
  background-color: #f5f5f5;
  text-align: center;
}
</style>
