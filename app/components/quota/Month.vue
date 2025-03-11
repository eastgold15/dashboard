<script setup lang='ts'>
import { InputNumber } from 'primevue'

interface Props {
  monthData: string
}
const props = defineProps<Props>()
const input = defineModel<number | null>('count')
</script>

<template>
  <div class="h-full w-full flex">
    <div class="w-20% flex flex-col items-center justify-center">
      <div class="month text-size-4xl">
        {{ props.monthData }}
      </div>
      <div class="bg-img h-20px w-80%" />
    </div>

    <div class="flex-1">
      <div class="w-50%">
        <InputGroup>
          <InputNumber v-model="input" placeholder="月份" />
        </InputGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-img {
  background: linear-gradient(0.25turn, #4a67ea, #fc0000);
  border-radius: 30px;
}
</style>
