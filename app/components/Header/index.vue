<script lang="ts" setup>
const props = defineProps<Props>()
const appStore = useMyAppStore()
const title = appStore.getTitle()

interface Props {
  routes: Array<Route>
}
</script>

<template>
  <div class="header bgAlpha">
    <div class="header-title">
      <h1>{{ title }}</h1>
    </div>
    <nav class="header-nav">
      <HeaderNavItem v-for="route in props.routes" :key="route.path" :path="route.path" :label="route.label" />
    </nav>
    <HeaderTimeShow class="header-time" />
  </div>
</template>

<style lang="scss">
.header {
  display: grid;
  height: 80px;
  grid-template-columns: 1fr 2fr 0.5fr;
  /* 定义网格列的比例 */
  align-items: center;
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    /* 定义网格列的比例 */
  }

  .header-time {
    text-align: right;
  }
}
</style>
