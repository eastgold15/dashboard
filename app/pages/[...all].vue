<script setup lang="ts">
const router = useRouter()
const route = useRoute()

// 从路由参数获取错误信息
const errorInfo = computed(() => ({
  code: route.query.code || '未知错误',
  message: route.query.message || '发生了一个未知错误',
  from: route.query.from || '/'
}))

// 返回上一页或指定页面
function goBack() {
  if (errorInfo.value.from) {
    router.push(errorInfo.value.from.toString())
  } else {
    router.back()
  }
}
</script>

<template>
  <main class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-8 text-center">
      <!-- 错误图标 -->
      <div class="text-6xl text-yellow-500 mb-6">
        <div class="i-ep-warning" />
      </div>

      <!-- 错误信息 -->
      <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        哎呀，出错了！
      </h1>

      <div class="space-y-4 text-gray-600 dark:text-gray-300 mb-8">
        <div class="flex justify-between items-center border-b pb-2">
          <span class="font-medium">错误代码：</span>
          <span class="text-red-500">{{ errorInfo.code }}</span>
        </div>

        <div class="flex flex-col items-start border-b pb-2">
          <span class="font-medium mb-1">错误信息：</span>
          <p class="text-left">{{ errorInfo.message }}</p>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-medium">来源页面：</span>
          <span class="text-blue-500 truncate max-w-xs">{{ errorInfo.from }}</span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <button @click="goBack"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
        返回上一页
      </button>
    </div>
  </main>
</template>
