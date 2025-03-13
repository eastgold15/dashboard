<script lang="ts" setup>
interface Propr {
  title: string
  unit?: string
}
const props = withDefaults(defineProps<Propr>(), {
  title: '用水数据',
})
</script>

<template>
  <div class="Echart-title bgAlpha">
    <div class="name">
      {{ props.title }}
    </div>
    <div v-if="props.unit" class="unit">
      单位:{{ props.unit }}
    </div>
  </div>
</template>

<style lang="scss" scope>
.Echart-title {
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 24px;
  background: linear-gradient(90deg, rgba(28, 34, 42, 0.8), rgba(28, 34, 42, 0.6));
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .name {
    flex: 1;
    text-align: left;
    padding-left: 16px;
  }

  .unit {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
  }
}
</style>
