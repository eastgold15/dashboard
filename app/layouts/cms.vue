<script setup lang="ts">
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { ref } from 'vue'

const permission = useMyPermissionStore()
const menulist = permission.getMenuList

const isCollapsed = ref(false)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="h-screen w-full">
    <ClientOnly>
      <el-container class="h-screen w-full">
        <el-header class="flex items-center">
          <el-button @click="toggleCollapse">
            <el-icon>
              <IconMenu />
            </el-icon>
          </el-button>
          <span class="ml-2">cms菜单权限</span>
        </el-header>
        <el-container>
          <el-aside :width="isCollapsed ? '64px' : '200px'" class="h-full">
            <CmsMenu :menu-list="menulist!" :is-collapsed="isCollapsed" />
          </el-aside>
          <el-main>
            <slot />
          </el-main>
        </el-container>
      </el-container>
    </ClientOnly>
  </div>
</template>
