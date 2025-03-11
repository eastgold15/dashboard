<script setup lang='ts'>
const props = withDefaults(defineProps<Props>(), {
  data: () => [{ label: '请选择类型', value: 1 }, { label: '水', value: 2 }, { label: '电', value: 3 }],
})

const value = ref('')

interface Props {
  data: any[]
}
</script>

<template>
  <div class="setting-select2">
    <el-select
      v-model="value"
      size="large"
      style="width: 240px"
      filterable
      placeholder="请选择类型"
    >
      <el-option
        v-for="item in props.data"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<style scoped>

</style>
