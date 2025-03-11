<script lang="ts" setup>
interface Props {
  title: string
  icon?: string
  unit?: string
}

defineProps<Props>()
</script>

<template>
  <div class="common-title">
    <!-- 左侧图标区域 -->
    <div class="title-left">
      <slot name="icon">
        <el-icon v-if="icon">
          <component :is="icon" />
        </el-icon>
      </slot>
      <span class="title-text">{{ title }}</span>
    </div>

    <!-- 中间内容区域 -->
    <div class="title-content">
      <slot name="content" />
    </div>

    <!-- 右侧操作区域 -->
    <div class="title-right">
      <slot name="extra" />
      <span v-if="unit" class="unit-text">({{ unit }})</span>
    </div>
  </div>
</template>

<style scoped>
.common-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  width: 100%;
}

.title-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-text {
  font-size: 16px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.title-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.unit-text {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
</style>
