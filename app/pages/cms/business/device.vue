<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 定义页面元信息
definePageMeta({
  name: '设备管理',
  layout: 'cms',
})

// 设备数据类型
interface Device {
  id: number
  createdAt: string
  updatedAt: string
  deviceCode: string
  deviceType: number
  manufacturer: string
  status: number
  model: string | null
  gatewayId: string | null
}

// 分页数据
interface Pagination {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

// 响应数据
interface ApiResponse {
  data: {
    items: Device[]
    meta: Pagination
  }
  code: number
  message: string
}

// 状态管理
const loading = ref(false)
const drawerVisible = ref(false)
const isEditMode = ref(false)
const currentDevice = ref<Device | null>(null)

// 表单数据
const form = reactive({
  name: '',
})

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})

// 设备列表
const deviceList = ref<Device[]>([])

// 模拟API请求
async function fetchDevices() {
  loading.value = true
  try {
    // 这里应该是实际的API调用，我们模拟一个
    const mockResponse: ApiResponse = {
      data: {
        items: [
          {
            id: 1,
            createdAt: '2025-04-24T13:21:20.550Z',
            updatedAt: '2025-04-24T13:21:20.550Z',
            deviceCode: '23',
            deviceType: 1,
            manufacturer: 'aliqua incididunt',
            status: 1,
            model: null,
            gatewayId: null,
          },
          {
            id: 2,
            createdAt: '2025-04-25T10:15:30.550Z',
            updatedAt: '2025-04-25T10:15:30.550Z',
            deviceCode: '45',
            deviceType: 2,
            manufacturer: '测试制造商',
            status: 0,
            model: 'X100',
            gatewayId: 'GW001',
          },
        ],
        meta: {
          totalItems: 2,
          itemCount: 2,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
      },
      code: 200,
      message: 'success',
    }

    deviceList.value = mockResponse.data.items
    pagination.total = mockResponse.data.meta.totalItems
  }
  catch (error) {
    ElMessage.error('获取设备列表失败')
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

// 打开详情抽屉
function openDetail(device: Device) {
  currentDevice.value = device
  isEditMode.value = false
  drawerVisible.value = true
}

// 打开编辑抽屉
function openEdit(device: Device) {
  currentDevice.value = JSON.parse(JSON.stringify(device)) // 深拷贝
  isEditMode.value = true
  drawerVisible.value = true
}

// 保存设备信息
async function saveDevice() {
  try {
    loading.value = true
    // 这里应该是实际的API保存操作
    // 模拟保存成功
    ElMessage.success(isEditMode.value ? '更新成功' : '添加成功')
    drawerVisible.value = false
    await fetchDevices() // 刷新列表
  }
  catch (error) {
    ElMessage.error('保存失败')
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

// 删除设备
async function deleteDevice(id: number) {
  try {
    loading.value = true
    // 这里应该是实际的API删除操作
    // 模拟删除成功
    ElMessage.success('删除成功')
    await fetchDevices() // 刷新列表
  }
  catch (error) {
    ElMessage.error('删除失败')
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

// 分页变化
function handlePageChange(page: number) {
  pagination.currentPage = page
  fetchDevices()
}

// 初始化加载
onMounted(() => {
  fetchDevices()
})
</script>

<template>
  <div class="device-management">
    <!-- 搜索和操作区域 -->
    <div class="mb-4 flex items-center justify-between">
      <el-button type="primary" @click="openEdit({} as Device)">
        新增设备
      </el-button>

      <el-form :model="form" label-width="auto" :inline="true">
        <el-form-item label="搜索设备">
          <el-input v-model="form.name" placeholder="请输入设备名称或编码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchDevices">
            搜索
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 设备列表 -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
      <el-card
        v-for="device in deviceList"
        :key="device.id"
        class="device-card"
      >
        <template #header>
          <div class="card-header flex items-center justify-between">
            <span class="font-bold">{{ device.deviceCode }} - {{ device.manufacturer }}</span>
            <el-tag :type="device.status === 1 ? 'success' : 'danger'">
              {{ device.status === 1 ? '在线' : '离线' }}
            </el-tag>
          </div>
        </template>

        <div class="device-info">
          <p><span class="info-label">设备类型:</span> {{ device.deviceType }}</p>
          <p><span class="info-label">型号:</span> {{ device.model || '无' }}</p>
          <p><span class="info-label">网关ID:</span> {{ device.gatewayId || '无' }}</p>
          <p><span class="info-label">创建时间:</span> {{ new Date(device.createdAt).toLocaleString() }}</p>
        </div>

        <template #footer>
          <div class="flex justify-between">
            <el-button type="warning" plain @click="openDetail(device)">
              详细
            </el-button>
            <div>
              <el-button type="primary" plain @click="openEdit(device)">
                编辑
              </el-button>
              <el-button type="danger" plain @click="deleteDevice(device.id)">
                删除
              </el-button>
            </div>
          </div>
        </template>
      </el-card>
    </div>

    <!-- 分页 -->
    <div class="mt-4 flex justify-center">
      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        layout="total, prev, pager, next, jumper"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 详情/编辑抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      :title="isEditMode ? '编辑设备' : '设备详情'"
      direction="rtl"
      size="40%"
    >
      <template #default>
        <el-form
          v-if="currentDevice"
          :model="currentDevice"
          label-width="120px"
          :disabled="!isEditMode"
        >
          <el-form-item label="设备编码">
            <el-input v-model="currentDevice.deviceCode" />
          </el-form-item>
          <el-form-item label="制造商">
            <el-input v-model="currentDevice.manufacturer" />
          </el-form-item>
          <el-form-item label="设备类型">
            <el-select v-model="currentDevice.deviceType" placeholder="请选择">
              <el-option label="类型1" :value="1" />
              <el-option label="类型2" :value="2" />
              <el-option label="类型3" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              v-model="currentDevice.status"
              :active-value="1"
              :inactive-value="0"
              active-text="在线"
              inactive-text="离线"
            />
          </el-form-item>
          <el-form-item label="型号">
            <el-input v-model="currentDevice.model" />
          </el-form-item>
          <el-form-item label="网关ID">
            <el-input v-model="currentDevice.gatewayId" />
          </el-form-item>
          <el-form-item v-if="!isEditMode" label="创建时间">
            <el-input :value="new Date(currentDevice.createdAt).toLocaleString()" disabled />
          </el-form-item>
          <el-form-item v-if="!isEditMode" label="更新时间">
            <el-input :value="new Date(currentDevice.updatedAt).toLocaleString()" disabled />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerVisible = false">
            取消
          </el-button>
          <el-button v-if="isEditMode" type="primary" @click="saveDevice">
            保存
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped>
.device-management {
  padding: 20px;
}

.device-card {
  margin-bottom: 20px;
  transition: all 0.3s;
}

.device-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  font-size: 16px;
}

.device-info {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

.info-label {
  display: inline-block;
  width: 80px;
  color: #999;
}
</style>
