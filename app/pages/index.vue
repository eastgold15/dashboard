<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div class="page-index">
    <div class="grid-container">
      <div class="grid-item h-220px">
        <EchartsUseWater />
      </div>
      <div class="grid-item">
        <EchartsWaterProportion />
      </div>
      <div class="grid-item">
        表格 3
      </div>
      <div class="grid-item">
        表格 4
      </div>
      <div class="grid-item">
        表格 5
      </div>
      <div class="grid-item">
        表格 6
      </div>
      <div class="grid-item grid-item-bottom">
        底部表格
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-index {
  width: 100%;
  text-align: center;
  background-color: #4dd;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 左中右三列布局 */
  grid-template-rows: auto auto auto; /* 三行布局，高度根据内容自动调整 */
  gap: 10px; /* 网格间距 */
  padding-top: 15px;
  height: calc(100vh - 60px); /* 减去顶部 padding */
}

.grid-item {
  background-color: #851f1f;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 500px;
}

.grid-item:nth-child(1) {
  grid-column: 1;
  grid-row: 1;
}

.grid-item:nth-child(2) {
  grid-column: 1;
  grid-row: 2;
}

.grid-item:nth-child(3) {
  grid-column: 1;
  grid-row: 3;
}

.grid-item:nth-child(4) {
  grid-column: 3;
  grid-row: 1;
}

.grid-item:nth-child(5) {
  grid-column: 3;
  grid-row: 2;
}

.grid-item:nth-child(6) {
  grid-column: 3;
  grid-row: 3;
}

.grid-item-bottom {
  grid-column: 2;
  grid-row: 3;
  background-color: #fff;
  border: 1px solid #ccc;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
