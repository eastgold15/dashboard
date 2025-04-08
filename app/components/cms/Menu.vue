<script setup lang="ts">
import { h } from 'vue'

defineProps<{
  menuList: any[]
  isCollapsed: boolean
}>()

const emit = defineEmits(['open', 'close'])

function handleOpen(key: string, keyPath: string[]) {
  emit('open', key, keyPath)
}

function handleClose(key: string, keyPath: string[]) {
  emit('close', key, keyPath)
}
</script>

<template>

  <ElMenu default-active="2" class="el-menu-vertical-demo h-full" :collapse="isCollapsed" @open="handleOpen"
    @close="handleClose">
    <template v-for="menu in menuList" :key="menu.id">
      <el-sub-menu v-if="menu.children" :index="menu.path">
        <template #title>
          <el-icon>
            <component :is="() => h('i', { class: menu.meta?.icon })" />
          </el-icon>
          <span v-if="!isCollapsed">{{ menu.meta?.title }}</span>
        </template>
        <ElMenuItem v-for="subMenu in menu.children" :key="subMenu.id" :index="subMenu.path">
          <NuxtLink :to="subMenu.path">
            <el-icon>
              <component :is="() => h('i', { class: subMenu.meta?.icon })" />
            </el-icon>
            <span v-if="!isCollapsed">{{ subMenu.meta?.title }}</span>
          </NuxtLink>
        </ElMenuItem>
      </el-sub-menu>

      <ElMenuItem v-else :index="menu.path" :disabled="menu.meta?.status !== 1">
        <NuxtLink :to="menu.path">
          <el-icon>
            <component :is="() => h('i', { class: menu.meta?.icon })" />
          </el-icon>
          <span v-if="!isCollapsed">{{ menu.meta?.title }}</span>
        </NuxtLink>
      </ElMenuItem>
    </template>
  </ElMenu>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
</style>
