<script setup lang="ts">
// 布局组件逻辑

const { childrenRoutes } = useRouteChildren()
</script>

<template>
  <div class="qm-layout">
    <Header class="layout-header" :routes="childrenRoutes">
      <!-- 头部内容 -->
    </Header>
    <main class="qm-main">
      <slot />
    </main>
    <footer class="qm-footer">
      <p>&copy; 2024 水务管理系统</p>
    </footer>
  </div>
</template>

<style scoped>
.qm-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.qm-header {
  padding: 1rem;
  background-color: var(--el-color-primary);
  color: white;
}

.qm-main {
  flex: 1;
  padding: 1rem;
}

.qm-footer {
  padding: 1rem;
  background-color: #f5f5f5;
  text-align: center;
}
</style>
