<script lang="ts" setup>
import logo from '/logo.png'

const props = defineProps<Props>()
const appStore = useMyAppStore()
const title = appStore.getTitle() // 确保路径正确



const config =useAppConfig()
console.log(config)
const appName = config.appName || 'App'
interface Props {
  routes: Array<Route>
}
</script>

<template>

  <div class=" flex justify-between items-center   px-4">
    <div class="flex-start  ">
      <NuxtLink to="/" class="">
        <img :src="logo" alt="logo" class="mr-2  w-9 h-9  inline-block">
        <h1 class="inline-block text-9 v-middle">{{ title }}</h1>
      </NuxtLink>

      <nav class="flex flex-center px-9  gap-4">
        <HeaderNavItem v-for="route in props.routes" :key="route.path" :path="route.path" :label="route.label" />
      </nav>

    </div>

    <div class="flex gap-4">
      <HeaderTimeShow class="header-time" />
      <HeaderSetting />
    </div>


  </div>
</template>


