<template>
  <div class="history-water">
    <EchartsComponentsEchartsTitle title="历年用水量数据" unit="万吨" />
    <div class="hexagon-container">
      <div v-for="(item, index) in waterData" :key="index" class="hexagon-item">
        <div class="hexagon">
          <div class="value">{{ item.value }}</div>
          <div class="unit">亿</div>
          <div class="year">{{ item.year }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const waterData = ref([
  { year: '2019年', value: 187 },
  { year: '2020年', value: 192 },
  { year: '2021年', value: 196 },
  { year: '2022年', value: 208 },
  { year: '2023年', value: 201 },
])
</script>

<style lang="scss" scoped>
.history-water {
  width: 100%;
  padding: 20px;
}

.hexagon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.hexagon-item {
  position: relative;
}

.hexagon {
  width: 100px;
  height: 115px;
  background: rgba(24, 144, 255, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: transform 0.3s, background 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    background: rgba(24, 144, 255, 0.2);
  }

  .value {
    font-size: 24px;
    font-weight: bold;
    color: #1890ff;
  }

  .unit {
    font-size: 14px;
    color: #1890ff;
    margin-top: -5px;
  }

  .year {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
  }
}
</style>
