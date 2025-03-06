<script lang="ts" setup>

definePageMeta({
  layout: 'quota',

})

const typeData = ref([
  {label: '请选择类型', value: 1},
  {label: '水', value: 2},
  {label: '电', value: 3},
])

const titleData = ref([
{label: '请选择建筑', value: 1},
        {label: '学生宿舍1栋', value: 2},
        {label: '学生宿舍2栋', value: 3},
        {label: '学生宿舍3栋', value: 4},
        {label: '学生宿舍4栋', value: 5},
        {label: '学生宿舍5栋', value: 6},
        {label: '学生宿舍6栋', value: 7},
        {label: '学生宿舍7栋', value: 8},
        {label: '学生宿舍8栋', value: 9},
        {label: '学生宿舍9栋', value: 10},
        {label: '学生宿舍10栋', value: 11},
])


const month=ref([
  {label: '1月', value: null},
  {label: '2月', value: null},
  {label: '3月', value: null},
  {label: '4月', value: null},
  {label: '5月', value: null},
  {label: '6月', value: null},
  {label: '7月', value: null},
  {label: '8月', value: null},
  {label: '9月', value: null},
  {label: '10月', value: null},
  {label: '11月', value: null},
  {label: '12月', value: null},
])


</script>

<template>
  <div class="setting-layout">
    <QuotaHeader>
      <template #right flex >
        <QuotaSettingType :data="titleData" />
        <QuotaSettingType :data="typeData" />
        <button class="confirm" bg-cyan w-100px h-40px>设定</button>
      </template>
    </QuotaHeader>

    <div class="input" flex flex-wrap justify-center items-center>
      <div class="grid-item" v-for="(item,index) in month" :key="index">
        <QuotaMonth :monthData="item.label" v-model:count="item.value"/>
      </div>
    </div>
    <div class="line">
      <img src="/line.png" alt="">
    </div>
    <div class="table-container" flex justify-center items-center>
      <QuotaTableSetting />
    </div>
  </div>
</template>

<style scoped lang="scss">
.setting-layout{
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 6fr 1fr 4fr;
}

.title{
  display: flex;
  justify-content: space-around;
}

.confirm{
  border-radius: 20px;
}

.grid-item{
  flex: 0 0 33.33%;
  text-align: center;
  justify-content: center;
  align-items: center;

}
</style>
