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
  
  </div>
</template>

<style scoped>
.wa-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('/bg.png') no-repeat center/cover;
}

.layout-header {


  color: white;
  flex-shrink: 0;
}

.wa-main {
  flex-grow: 1;
  padding-top: 10px;


}


</style>
