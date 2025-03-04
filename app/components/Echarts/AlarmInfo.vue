<template>
  <div class="water-alarm-info">
    <EchartsComponentsEchartsTitle title="本年月度用水量走势" unit="m" />
    <el-table :data="tableData" style="width: 100%" :header-cell-style="headerStyle"
      :row-class-name="tableRowClassName">
      <el-table-column prop="type" label="报警类型" />
      <el-table-column prop="area" label="报警区域" />
      <el-table-column prop="time" label="报警时间" />
      <el-table-column prop="content" label="报警内容" />
      <el-table-column prop="reporter" label="报警人" />
      <el-table-column prop="status" label="处理状态">
        <template #default="{ row }">
          <el-tag :type="row.status === '待处理' ? 'warning' : 'success'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="maintainer" label="维修人员" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const headerStyle = {
  backgroundColor: '#1a253b',
  color: '#fff',
  fontWeight: 'bold'
}

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  return rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
}

const tableData = [
  {
    type: '设备故障',
    area: '一教1',
    time: '1/8/25',
    content: '设备离线',
    reporter: '系统',
    status: '待处理',
    maintainer: ''
  },
  {
    type: '流量超标',
    area: '一教2',
    time: '1/8/25',
    content: '流量超预定值',
    reporter: '系统',
    status: '待处理',
    maintainer: ''
  },
  {
    type: '设备故障',
    area: '一教3',
    time: '1/8/25',
    content: '设备离线',
    reporter: '系统',
    status: '待处理',
    maintainer: ''
  },
  {
    type: '设备故障',
    area: '图书馆1',
    time: '1/8/25',
    content: '设备离线',
    reporter: '系统',
    status: '待处理',
    maintainer: ''
  },
  {
    type: '流量超标',
    area: '图书馆2',
    time: '1/8/25',
    content: '流量超预定值',
    reporter: '系统',
    status: '待处理',
    maintainer: ''
  }
]
</script>

<style>
.water-alarm-info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.water-alarm-info .el-table {
  --el-table-border-color: #304156;
  --el-table-border: 1px solid var(--el-table-border-color);
  --el-table-text-color: #fff;
  --el-table-header-text-color: #fff;
  --el-table-row-hover-bg-color: #304156;
  background-color: transparent;
  color: var(--el-table-text-color);
}

.water-alarm-info .even-row {
  background-color: #1a253b;
}

.water-alarm-info .odd-row {
  background-color: #263445;
}
</style>
