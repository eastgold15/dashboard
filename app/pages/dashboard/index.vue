<script setup lang="ts">
definePageMeta({
  layout: 'default',
  alias: ["/dashboard/index"]
})
</script>

<template>
  <div class="page-container">
    <div class="grid-container">
      <div class="grid-item bgAlpha">
        <!-- 用水数据 -->
        <EchartsUseWater />
      </div>
      <div class="grid-item bgAlpha">
        <!-- 用水占比 -->
        <EchartsWaterProportion />
      </div>
      <div class="grid-item bgAlpha">
        <!-- 用水趋势 -->
        <EchartsAnnualTrends />
      </div>

      <div class="grid-item bgAlpha">
        <!-- 用水历史 -->
        <EchartsHistoryWater />
      </div>
      <div class="grid-item bgAlpha">
        <!-- 本月水量 -->
        <EchartsLastMonth />
      </div>
      <div class="grid-item bgAlpha">
        <!-- 年度用水量同比分析图 -->
        <EchartsYearoveryearMonthlyWater />
      </div>
      <div class="grid-item grid-item-bottom bgAlpha">
        <EchartsAlarmInfo />

      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1.2fr 1fr;
  gap: 10px;
  padding: 15px;
  height: 100%;
  overflow: hidden;
}

.grid-item {
  backdrop-filter: blur(1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  overflow: hidden;
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
}
</style>
