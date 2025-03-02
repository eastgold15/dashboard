<script lang="ts" setup>
const appStore = useMyAppStore()
const title = appStore.getTitle()
</script>

<template>
  <div class="header">
    <div class="header-title">
      <h1>{{ title }}</h1>
    </div>
    <nav class="header-nav">
      <HeaderNavItem path="/" label="基础信息" />
      <HeaderNavItem path="/" label="统计报表" />
      <HeaderNavItem path="/" label="用水分析" />
      <HeaderNavItem path="/" label="报警管理" />
      <HeaderNavItem path="/" label="定额管理" />
    </nav>
    <HeaderTimeShow class="header-time" />
  </div>
</template>

<style lang="scss">
.header {
  display: grid;
  height: 80px;
  grid-template-columns: 1fr 2fr 0.5fr; /* 定义网格列的比例 */
  align-items: center;
  background-color: #2c8abf; /* 深蓝色背景 */
  color: white;
  font-size: 24px;
  padding: 10px;

  .header-title {
    text-align: left;
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-left: 2px solid #0074d9;
    border-bottom: 2px dashed #0074d9;
  }

  .header-nav {
    width: 80%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; /* 定义网格列的比例 */
  }

  .header-time {
    text-align: right;
  }
}
</style>
