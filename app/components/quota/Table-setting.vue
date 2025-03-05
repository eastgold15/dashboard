<script setup lang='ts'>
    const tableData = [
  {
    type:'水',
    area:'',
    name:"学生宿舍6栋",
    year:'',
    createTime:'',
    people:'',
    normMount:'',
    control:'',
  },
  {
    type:'水',
    area:'',
    name:"学生宿舍7栋",
    year:'',
    createTime:'',
    people:'',
    normMount:'',
    control:'',
  },
  {
    type:'水',
    area:'',
    name:"学生宿舍2栋",
    year:'',
    createTime:'',
    people:'',
    normMount:'',
    control:'',
  },
  {
    type:'水',
    area:'',
    name:"学生宿舍3栋",
    year:'',
    createTime:'',
    people:'',
    normMount:'',
    control:'',
  },
  {
    type:'水',
    area:'',
    name:"学生宿舍9栋",
    year:'',
    createTime:'',
    people:'',
    normMount:'',
    control:'',
  },
  {
    type:'水',
    area:'',
    name:"学生宿舍10栋",
    year:'',
    createTime:'',
    people:'',
    normMount:'',
    control:'',
  },
  {
    type:'水',
    area:'',
    name:"科技楼",
    year:'',
    createTime:'',
    people:'',
    normMount:'',
    control:'',
  },
  {
    type:'水',
    area:'',
    name:"学生宿舍12栋",
    year:'',
    createTime:'',
    people:'',
    normMount:'',
    control:'',
  },

]
</script>

<template>
      <div class="table"  w-85% h-90%>
        <el-table 
        :data="tableData" 
        style="width: 100%"
        highlight-current-row
        :stripe="true" 
        :border="true"
        height=240>
          <el-table-column prop="type" label="类型" align="center"/>
          <el-table-column prop="area" label="区域" align="center"/>
          <el-table-column prop="name" label="名称" align="center"/>
          <el-table-column prop="year" label="年份" align="center"/>
          <el-table-column prop="createTime" label="创建时间" align="center"/>
          <el-table-column prop="people" label="创建人" align="center"/>
          <el-table-column prop="normMount" label="定额" align="center"/>
          <el-table-column prop="control" label="操作" align="center"/>
        </el-table>
      </div>
</template>