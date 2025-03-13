<script setup lang='ts'>
interface CardProps {
  title: string
  data: number
  color: string

}
const props = withDefaults(defineProps<CardProps>(), {
  title: '总额度',
  data: 21829,
  color: '#fff',
})
</script>

<template>
  <div class="card-container">
    <div class="card-content" :style="{ color: props.color }">
      <p>{{ props.data }}</p>
    </div>
    <div class="card-title" text-lg>
      <p>{{ props.title }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .card-content {
    font-size: 20px;
    color: #fff;
    background: url('/border.png') no-repeat center / cover;
    background-size: 300px 400px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .card-title {
      color: rgb(112, 224, 224);
    }
  }
}
</style>
