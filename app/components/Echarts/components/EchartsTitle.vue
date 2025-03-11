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
  <div class="Echart-title">
    <div class="name titileFont">
      {{ props.title }}
    </div>
    <div v-if="props.unit" class="unit p-4 text-right text-sm">
      单位:{{ props.unit }}
    </div>
  </div>
</template>

<style lang="scss" scope>
.Echart-title {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #cdcdcd;
  background-color: rgba(0, 0, 0, 0.3); /* 设置半透明背景 */
  backdrop-filter: blur(1px); /* 添加模糊效果 */
  border-top: 2px solid #bdc3c7;
  border-bottom: 2px solid #bdc3c7;
  font-size: 16px;
  padding-top: 5px;
  padding: 0px 10px 0;
  align-items: center; /* 确保子元素垂直居中 */

  .name {
    flex: 1;
    text-align: left;
    padding-left: 40px;
  }

  .unit {
    width: 80px;
  }
}
</style>
