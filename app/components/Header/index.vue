<script lang="ts" setup>
import logo from '/logo.png'

const props = defineProps<Props>()
const { logout } = useMyAuthStore()

const config = useAppConfig()

const appName = config.appName || 'App'
interface Props {
  routes: Array<any>
}
</script>

<template>
  <div class="flex items-center justify-between px-4">
    <div class="flex-start">
      <NuxtLink to="/" class="">
        <img :src="logo" alt="logo" class="mr-2 inline-block h-9 w-9">
        <h1 class="inline-block v-middle text-9">
          {{ appName }}
        </h1>
      </NuxtLink>

      <nav class="flex flex-center gap-4 px-9">
        <HeaderNavItem v-for="route in props.routes" :key="route.path" :path="route.path" :label="route.label" />
      </nav>
    </div>

    <div class="flex flex-center gap-4">
      <HeaderTimeShow class="header-time" />
      <div class="i-tabler:logout cursor-pointer dark:text-white" @click="logout" />
      <HeaderSetting />
    </div>
  </div>
</template>
