<script setup lang='ts'>
    
</script>

<template>
    <div class="layout">
        <div class="item"><slot name="left"></slot></div>
        <div class="item"><slot name="middle"></slot></div>
        <div class="item"><slot name="right"></slot></div>
    </div>
</template >

<style scoped>
.layout{
    display: grid;
    grid-template-columns:1fr 1fr 2fr;
    width: 100%;
    height: 100%;
}

.item{
    display: flex;
    justify-content: space-around;
}
</style>