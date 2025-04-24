<script lang="ts" setup>
const permission = useMyPermissionStore()

const { loggedIn } = useMyAuthStore()

// 监听登录状态变化
watch(() => loggedIn, async (newVal) => {
  if (newVal && !permission.permissions?.length) {
    await permission.fetchPermissions()
  }
}) // immediate: true 会立即执行一次
</script>

<template>
  <div class="h-80vh w-100%">
    <slot />
  </div>
</template>

<style></style>
