<template>
 
<ClientOnly >
  <el-table 
  :data="tableData" 
  :stripe="true" 
  :border="true" 
  style="width: 100%;padding-top: 30px;" 
  highlight-current-row  >
        <el-table-column prop="num" label="序号" width="55%" align="center"/>
        <el-table-column prop="warning" label="超标类型" width="100%" align="center"/>
        <el-table-column prop="area" label="报警区域" width="130px" align="center"/>
        <el-table-column prop="time" label="报警时间" width="100px" align="center"/>
        <el-table-column prop="ratedValue" label="额定值" align="center"/>
        <el-table-column prop="utilityValue" label="实用值" align="center"/>
        <el-table-column prop="people" label="报警人" align="center"/>
        <el-table-column prop="status" label="处理状态" align="center"/>
        <el-table-column prop="controls" label="操作" align="center"/>
    </el-table>
</ClientOnly>
</template>

<script setup lang="ts">

interface TableData{
    num:number,
    warning:string,
    area:string,
    time:string,
    ratedValue:number,
    utilityValue:number,
    people:string,
    status:string,
    controls:string
}
interface Props {
    tableData: TableData[]
}
const props = withDefaults(defineProps<Props>(),{
  tableData:()=>[
    {
      num: 1,
      warning: '水定额超标',
      area:'学生宿舍6栋',
      time:'1/8/25',
      ratedValue:1000,
      utilityValue:1029,
      people:'系统',
      status:'待处理',
      controls:'',
    },
    {
      num: 2,
      warning: '水定额超标',
      area:'学生宿舍2栋',
      time:'1/8/25',
      ratedValue:900,
      utilityValue:1036,
      people:'系统',
      status:'待处理',
      controls:'',
    },
    {
      num: 3,
      warning: '水定额超标',
      area:'学生宿舍3栋',
      time:'1/8/25',
      ratedValue:800,
      utilityValue:928,
      people:'系统',
      status:'待处理',
      controls:'',
    },
    {
      num: 4,
      warning: '水定额超标',
      area:'学生宿舍7栋',
      time:'1/8/25',
      ratedValue:1000,
      utilityValue:1821,
      people:'系统',
      status:'待处理',
      controls:'',
    },
    {
      num: 5,
      warning: '水定额超标',
      area:'学生宿舍9栋',
      time:'1/8/25',
      ratedValue:600,
      utilityValue:829,
      people:'系统',
      status:'待处理',
      controls:'',
    },
    {
      num: 6,
      warning: '水定额超标',
      area:'科技楼',
      time:'1/8/25',
      ratedValue:1000,
      utilityValue:2918,
      people:'系统',
      status:'待处理',
      controls:'',
    },
    {
      num: 7,
      warning: '水定额超标',
      area:'学生宿舍12栋',
      time:'1/8/25',
      ratedValue:600,
      utilityValue:829,
      people:'系统',
      status:'待处理',
      controls:'',
    },
    {
      num: 8,
      warning: '水定额超标',
      area:'一教1',
      time:'1/8/25',
      ratedValue:800,
      utilityValue:1023,
      people:'系统',
      status:'待处理',
      controls:'',
    },
    {
      num: 9,
      warning: '水定额超标',
      area:'一教2',
      time:'1/8/25',
      ratedValue:500,
      utilityValue:628,
      people:'系统',
      status:'待处理',
      controls:'',
    },
    {
      num: 10,
      warning: '水定额超标',
      area:'一教3',
      time:'1/8/25',
      ratedValue:800,
      utilityValue:928,
      people:'系统',
      status:'待处理',
      controls:'',
    },

  ]
  
}
)



    
</script>