<script setup>
const error = useError()

const router = useRouter()
</script>

<template>
  <NuxtLayout>
    <div class="prose">
      <template v-if="error.statusCode === 404">
        <h1>404 页面不存在</h1>
        <p>抱歉，您访问的页面不存在。</p>
      </template>
      <template v-else>
        <h1>糟糕！</h1>
        <p><strong>{{ error.message }}</strong></p>
        <p>看起来发生了一些错误。</p>
        <p>非常抱歉。</p>
      </template>
      <p>
        返回 <a @click=" router.back()">回到首页</a>
      </p>
    </div>
  </NuxtLayout>
</template>
