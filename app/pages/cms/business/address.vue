<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 定义页面元信息
definePageMeta({
  name: '区域管理',
  layout: 'cms',
})

// 区域数据类型
interface Coordinates {
  lat: number
  lng: number
}

interface Area {
  id: number
  createdAt: string
  updatedAt: string
  areaCode: string
  areaName: string
  areaType: string
  level: number
  coordinates: Coordinates
  children: Area[]
  imageUrl?: string // 为未来图片预留
}

// 响应数据
interface ApiResponse {
  data: Area[]
  code: number
  message: string
}

// 状态管理
const loading = ref(false)
const drawerVisible = ref(false)
const isEditMode = ref(false)
const currentArea = ref<Partial<Area> | null>(null)

// 表单数据
const searchForm = reactive({
  name: '',
  type: '',
})

// 区域列表
const areaList = ref<Area[]>([])

// 区域类型选项
const areaTypeOptions = [
  { label: '校区', value: 'CAMPUS' },
  { label: '楼宇', value: 'BUILDING' },
  { label: '楼层', value: 'FLOOR' },
  { label: '房间', value: 'ROOM' },
]

// 模拟API请求
async function fetchAreas() {
  loading.value = true
  try {
    // 这里应该是实际的API调用，我们模拟一个
    const mockResponse: ApiResponse = {
      data: [
        {
          id: 1,
          createdAt: '2025-04-24T14:10:38.128Z',
          updatedAt: '2025-04-24T14:10:38.000Z',
          areaCode: 'CAMPUS_001',
          areaName: '主校区',
          areaType: 'CAMPUS',
          level: 0,
          coordinates: {
            lat: 8,
            lng: 21,
          },
          children: [],
          imageUrl: 'https://via.placeholder.com/300x200?text=校区图片', // 模拟图片
        },
        {
          id: 2,
          createdAt: '2025-04-25T09:15:22.128Z',
          updatedAt: '2025-04-25T09:15:22.000Z',
          areaCode: 'BUILDING_001',
          areaName: '实验楼',
          areaType: 'BUILDING',
          level: 1,
          coordinates: {
            lat: 8.001,
            lng: 21.001,
          },
          children: [],
          imageUrl: 'https://via.placeholder.com/300x200?text=实验楼图片',
        },
      ],
      code: 200,
      message: 'success',
    }

    areaList.value = mockResponse.data
  }
  catch (error) {
    ElMessage.error('获取区域列表失败')
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

// 打开详情抽屉
function openDetail(area: Area) {
  currentArea.value = area
  isEditMode.value = false
  drawerVisible.value = true
}

// 打开编辑抽屉
function openEdit(area?: Area) {
  currentArea.value = area
    ? JSON.parse(JSON.stringify(area))
    : {
        id: 0,
        areaCode: '',
        areaName: '',
        areaType: 'CAMPUS',
        level: 0,
        coordinates: { lat: 0, lng: 0 },
        children: [],
      } as unknown as Area
  isEditMode.value = true
  drawerVisible.value = true
}

// 保存区域信息
async function saveArea() {
  try {
    loading.value = true
    // 这里应该是实际的API保存操作
    // 模拟保存成功
    ElMessage.success(isEditMode.value ? '更新成功' : '添加成功')
    drawerVisible.value = false
    await fetchAreas() // 刷新列表
  }
  catch (error) {
    ElMessage.error('保存失败')
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

// 删除区域
async function deleteArea(id: number) {
  try {
    loading.value = true
    // 这里应该是实际的API删除操作
    // 模拟删除成功
    ElMessage.success('删除成功')
    await fetchAreas() // 刷新列表
  }
  catch (error) {
    ElMessage.error('删除失败')
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

// 初始化加载
onMounted(() => {
  fetchAreas()
})
</script>

<template>
  <div class="area-management">
    <!-- 搜索和操作区域 -->
    <div class="mb-4 flex items-center justify-between">
      <el-button type="primary" @click="openEdit()">
        新增区域
      </el-button>

      <el-form :model="searchForm" label-width="auto" :inline="true">
        <el-form-item label="区域名称">
          <el-input v-model="searchForm.name" placeholder="请输入区域名称" />
        </el-form-item>
        <el-form-item label="区域类型">
          <el-select v-model="searchForm.type" placeholder="请选择区域类型" clearable>
            <el-option v-for="item in areaTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchAreas">
            搜索
          </el-button>
          <el-button @click="() => { searchForm.name = ''; searchForm.type = ''; fetchAreas() }">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 区域列表 -->
    <div v-loading="loading" class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
      <el-card v-for="area in areaList" :key="area.id" class="area-card" shadow="hover">
        <!-- 图片区域 -->
        <div v-if="area.imageUrl" class="area-image">
          <el-image :src="area.imageUrl" fit="cover" class="h-40 w-full" :preview-src-list="[area.imageUrl]" />
        </div>
        <div v-else class="empty-image h-40 w-full flex items-center justify-center bg-gray-100">
          <span class="text-gray-400">暂无图片</span>
        </div>

        <template #header>
          <div class="card-header">
            <div class="flex items-center justify-between">
              <span class="font-bold text-lg">{{ area.areaName }}</span>
              <el-tag :type="area.areaType === 'CAMPUS' ? 'success' : 'primary'">
                {{ areaTypeOptions.find(item => item.value === area.areaType)?.label || area.areaType }}
              </el-tag>
            </div>
            <div class="mt-1 text-gray-500 text-sm">
              {{ area.areaCode }}
            </div>
          </div>
        </template>

        <div class="area-info">
          <p><span class="info-label">层级:</span> {{ area.level }}</p>
          <p>
            <span class="info-label">坐标:</span> ({{ area.coordinates.lat.toFixed(3) }}, {{
              area.coordinates.lng.toFixed(3) }})
          </p>
          <p><span class="info-label">创建时间:</span> {{ new Date(area.createdAt).toLocaleDateString() }}</p>
        </div>

        <template #footer>
          <div class="flex justify-between">
            <el-button type="warning" plain @click="openDetail(area)">
              详细
            </el-button>
            <div>
              <el-button type="primary" plain @click="openEdit(area)">
                编辑
              </el-button>
              <el-button type="danger" plain @click="deleteArea(area.id)">
                删除
              </el-button>
            </div>
          </div>
        </template>
      </el-card>
    </div>

    <!-- 详情/编辑抽屉 -->
    <el-drawer
      v-model="drawerVisible" :title="isEditMode ? (currentArea?.id ? '编辑区域' : '新增区域') : '区域详情'"
      direction="rtl" size="40%"
    >
      <template #default>
        <el-form v-if="currentArea" :model="currentArea" label-width="100px" :disabled="!isEditMode">
          <!-- 图片上传区域 -->
          <el-form-item label="区域图片">
            <el-upload
              v-if="isEditMode" class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
            >
              <el-image v-if="currentArea.imageUrl" :src="currentArea.imageUrl" class="h-40 w-full" fit="cover" />
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
            <el-image v-else-if="currentArea.imageUrl" :src="currentArea.imageUrl" class="h-40 w-full" fit="cover" />
            <div v-else class="empty-image h-40 w-full flex items-center justify-center bg-gray-100">
              <span class="text-gray-400">暂无图片</span>
            </div>
          </el-form-item>

          <el-form-item label="区域编码" required>
            <el-input v-model="currentArea.areaCode" />
          </el-form-item>
          <el-form-item label="区域名称" required>
            <el-input v-model="currentArea.areaName" />
          </el-form-item>
          <el-form-item label="区域类型" required>
            <el-select v-model="currentArea.areaType" placeholder="请选择">
              <el-option v-for="item in areaTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="层级">
            <el-input-number v-model="currentArea.level" :min="0" />
          </el-form-item>
          <el-form-item label="纬度">
            <el-input-number v-model="currentArea.coordinates.lat" :precision="6" :step="0.000001" />
          </el-form-item>
          <el-form-item label="经度">
            <el-input-number v-model="currentArea.coordinates.lng" :precision="6" :step="0.000001" />
          </el-form-item>
          <el-form-item v-if="!isEditMode && currentArea.createdAt" label="创建时间">
            <el-input :value="new Date(currentArea.createdAt).toLocaleString()" disabled />
          </el-form-item>
          <el-form-item v-if="!isEditMode && currentArea.updatedAt" label="更新时间">
            <el-input :value="new Date(currentArea.updatedAt).toLocaleString()" disabled />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerVisible = false">
            取消
          </el-button>
          <el-button v-if="isEditMode" type="primary" @click="saveArea">
            保存
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped>
.area-management {
  padding: 20px;
}

.area-card {
  margin-bottom: 20px;
  transition: all 0.3s;
}

.area-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  font-size: 16px;
}

.area-info {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

.info-label {
  display: inline-block;
  width: 60px;
  color: #999;
}

.area-image {
  border-radius: 4px 4px 0 0;
  overflow: hidden;
}

.empty-image {
  border-radius: 4px 4px 0 0;
}

.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 160px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
