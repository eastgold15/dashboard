<script setup lang="ts">
const route = useRoute()
const { childrenRoutes } = useRouteChildren(route.path)
</script>

<script setup lang="ts">
// 布局组件逻辑

</script>

<template>
  <div class="am-layout">
    <Header class="layout-header" :routes="childrenRoutes">
      <!-- 头部内容 -->
    </Header>
    <main class="am-main">
      <slot />
    </main>
    <footer class="am-footer">
      <p>&copy; 2024 水务管理系统</p>
    </footer>
  </div>
</template>

<style scoped>
.am-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.am-header {
  padding: 1rem;
  background-color: var(--el-color-primary);
  color: white;
}

.am-main {
  flex: 1;
  padding: 1rem;
}

.am-footer {
  padding: 1rem;
  background-color: #f5f5f5;
  text-align: center;
}
</style>
