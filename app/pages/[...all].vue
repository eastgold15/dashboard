<script setup lang="ts">
const router = useRouter()
//接收传来的错误显示出来
const route = useRoute()
console.log("route", route)
console.log("router", route)

</script>

<template>

  <main>
    <div class="">错误码：{{ route.query.code }}</div>
    <div class="">错误信息：{{ route.query?.message }}</ div>
      <div class="flex flex-col items-center justify-center h-screen">
        <div class="text-4xl">

          <div class="i-ep-warning"></div>
        </div>
        <div class="text-2xl">Not found</div>
        <button class="btn m-3 t8" @click="router.back()">
          Back
        </button>
      </div>
  </main>

</template>
