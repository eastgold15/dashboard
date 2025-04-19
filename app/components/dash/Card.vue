<script lang="ts" setup>
interface Props<T> {
  title: string
  data: T
  unit: string
  width?: string // 自定义宽度（如 "100px"、"50%"）
  height?: string // 自定义高度
}

const props = withDefaults(defineProps<Props<any>>(), {
  unit: 'danyuan',
  title: '用水数据',
  data: 'sss',
})

// 动态计算容器样式
const containerStyle = computed(() => ({
  width: props.width || 'auto', // 未设置宽度时由内容撑开
  height: props.height || 'auto', // 未设置高度时由内容撑开
}))
</script>

<template>
  <!-- 外层容器（宽度/高度由 props 或内容决定） -->
  <div class="flex flex-col" :style="containerStyle">
    <!-- 标题栏（仅在 title 或 unit 存在时显示） -->
    <div v-if="props.title || props.unit" class="bg-gradient-r w-full flex items-center from-black/100% to-black/0">
      <span class="mr-auto px-4 py-2 text-4">{{ props.title }}</span>
      <span class="ml-auto px-4 py-2 text-4">{{ props.unit }}</span>
    </div>
    <!-- 内容区（默认撑开剩余空间） -->
    <div class="min-h-0 flex-1">
      <slot />
    </div>
  </div>
</template>

<style></style>
