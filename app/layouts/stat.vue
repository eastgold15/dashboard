<script setup lang="ts">
const { childrenRoutes } = useRouteChildren()
</script>

<template>
  <div class="sr-layout">
    <Header class="layout-header" :routes="childrenRoutes">
      <!-- 头部内容 -->
    </Header>
    <main class="sr-main">
      <slot />
    </main>
    <footer class="sr-footer">
      <p>&copy; 2024 水务管理系统</p>
    </footer>
  </div>
</template>

<style scoped>
.sr-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.sr-header {
  padding: 1rem;
  background-color: var(--el-color-primary);
  color: white;
}

.sr-main {
  flex: 1;
  padding: 1rem;
}

.sr-footer {
  padding: 1rem;
  background-color: #f5f5f5;
  text-align: center;
}
</style>
