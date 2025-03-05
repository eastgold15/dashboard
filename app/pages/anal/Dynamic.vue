<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'anal',
  alias: ['/anal/dynamic', '/anal'],
})


</script>

<template>
  <div class="dynamic-analysis">
    <div class="left-section ">
      <div class="chart1 ">
        <AnalEchartsDynamicDashboard></AnalEchartsDynamicDashboard>
      </div>
      <div class="chart2">
        <AnalEchartsWaterAnalogyAnaly></AnalEchartsWaterAnalogyAnaly>
      </div>
    </div>
    <!-- 右侧自适应区域 -->
    <div class="right-section">
      <div class="w-full h-full">
        <AnalEchartsBalanceDynamic></AnalEchartsBalanceDynamic>
      </div>
      <div class="w-full h-full">
        <AnalEchartsMiddleLine></AnalEchartsMiddleLine>
      </div>
        <div class="w-full h-full">
        <AnalEchartsMonthlyWaterSavings></AnalEchartsMonthlyWaterSavings>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.dynamic-analysis {

  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 400px 1fr;
  /* 左侧固定400px，右侧自适应 */
  gap: 20px;

  .left-section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
.left-section .chart1 {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.left-section .chart2{
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

  .right-section {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 20px;
   
    align-items: center;
  }
}
</style>



