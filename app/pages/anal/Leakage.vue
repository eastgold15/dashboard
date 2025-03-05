<script lang="ts" setup>
definePageMeta({
  layout: 'anal',
})
</script>

<template>
  <div class="loss-layout">
    <!-- 左侧 -->
    <div class="left-section">
      <div class="analysis">
        <AnalEchartsLossAnaly> </AnalEchartsLossAnaly>
      </div>
      <div class="rate">
        <AnalEchartsLossRate> </AnalEchartsLossRate>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="right-section">
        <AnalEchartsLossChart> </AnalEchartsLossChart>
    </div>
  </div>
</template>


<style>
.loss-layout {
  display: grid;
  flex-direction: row;
  height: 100%;
  /* weight: 100%; */
  grid-template-columns:1fr 3fr;
  gap: 10px;
  .left-section {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
  }
}
.right-section {
  display: grid;
  gap: 10px;
}
</style>
