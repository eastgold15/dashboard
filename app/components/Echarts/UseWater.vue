<script lang="ts" setup>
const data = ref([
  {
    name: '今日水量',
    content: 100,
    unit: 'm',
  },
  {
    name: '本月水量',
    content: 100,
    unit: 'm',
  },
  {
    name: '本年水量',
    content: 100,
    unit: 'm',
  },
  {
    name: '上月水量',
    content: 100,
    unit: 'm',
  },
])
</script>

<template>
  <div class="water">
    <EchartsComponentsEchartsTitle title="用水数据" unit="m" />
    <div class="water-content">
      <EchartsComponentsUserWaterItem
        v-for="(item, index) in data"
        :key="index"
        :title="item.name"
        :content="item.content"
        :unit="item.unit"
        class="water-item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.water {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: var(--echart-title-color);

  .water-content {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 10px;

    .water-item {
      min-height: 0;
      height: 100%;
    }
  }
}
</style>
