<script setup lang="ts">
</script>

<template>
  <section class="layout-container">
    <Header class="layout-header">
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
  background-color: var(--app-content-bg-color);
}

.layout-header {
  flex-shrink: 0;
  height: 60px; /* 你可以根据需要调整头部的高度 */
  background-color: var(--header-bg-color); /* 设置头部背景颜色 */
}

.layout-main {
  flex-grow: 1; /* 使 main 占据剩余的空间 */
  overflow: auto;
  background-color: var(--main-bg-color); /* 设置主内容背景颜色 */
}
</style>
