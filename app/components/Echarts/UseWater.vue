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
    <div class="water-title">
      <div class="name">
        用水数据
      </div>
      <div class="unit">
        单位：m
      </div>
    </div>
    <div class="water-content">
      <EchartsComponentsUserWaterItem v-for="(item, index) in data" :key="index" :title="item.name" :content="item.content" :unit="item.unit" class="water-item" />
    </div>
  </div>
</template>

<style lang="scss" scope>
.water {
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  color: #cfcfd0;

  .water-title {
    height: 25px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    flex-shrink: 1;
    display: flex;
    text-align: left;
    .name {
      flex: 1;
    }
    .unit {
      width: 80px;
    }
  }
  .water-content {
    display: grid; /* 确保使用 grid 布局 */
    flex-grow: 1;
    grid-template-columns: repeat(2, 1fr); /* 两列布局 */
    grid-template-rows: repeat(2, 1fr); /* 两行布局 */
    gap: 10px; /* 网格间距 */
  }

  .water-item {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding-inline: 10px;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
