<script setup lang='ts'>
interface Props{
    monthData:string
}
    const props=defineProps<Props>()
    const input = defineModel<number | null>('count')
</script>

<template>
    <div class="month-container"  w-100% h-20% flex  >
        <div class="month-andimg" >
            <span class="month">{{ props.monthData }}</span>
            <div class="bg-img"></div>
        </div>
        <el-input v-model="input" style="width: 200px; height: 70px; padding-top:20px ; " placeholder="请输入数值" />
    </div>
</template>

<style scoped>
.month{
    font-size: 35px;
}

.month-container{
    justify-content: space-around;
}

.month-andimg{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.bg-img{
    width: 130%;
    height: 20%;
    background: linear-gradient(.25turn, #4a67ea, #fc0000);
    border-radius: 30px;
}

</style>