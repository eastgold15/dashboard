<script setup lang="ts">
import { ref } from 'vue'
import { StatSRTitle } from '#components'

definePageMeta({
  layout: 'stat',
})

const date = ref(new Date())
const rankData = ref([
  { id: 1, name: '江西11栋', value: '32.4', unit: 'm³' },
  { id: 2, name: '江西12栋', value: '31.0', unit: 'm³' },
  { id: 3, name: '江西13栋', value: '30.6', unit: 'm³' },
  { id: 4, name: '江西14栋', value: '29.3', unit: 'm³' },
  { id: 5, name: '江西15栋', value: '28.5', unit: 'm³' },
])

const compareData = ref([
  { id: 1, name: '江西11栋', value: '31.0', percent: '+3.2%' },
  { id: 2, name: '江西12栋', value: '30.5', percent: '+2.8%' },
  { id: 3, name: '江西13栋', value: '29.8', percent: '+2.5%' },
  { id: 4, name: '江西14栋', value: '28.9', percent: '+2.1%' },
  { id: 5, name: '江西15栋', value: '28.0', percent: '+1.8%' },
])

const chainData = ref([
  { id: 1, name: '江西11栋', value: '31.0', percent: '+14.0%' },
  { id: 2, name: '江西12栋', value: '30.5', percent: '+13.5%' },
  { id: 3, name: '江西13栋', value: '29.8', percent: '+12.8%' },
  { id: 4, name: '江西14栋', value: '28.9', percent: '+12.1%' },
  { id: 5, name: '江西15栋', value: '28.0', percent: '+11.8%' },
])
</script>

<template>
  <div class="energy-ranking">
    <div class="ranking-grid">
      <el-card class="ranking-card" body-style="background-color: #1a1a1a;">
        <StatSRTitle title="建筑用水量排名">
          <template #right>
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </template>
        </StatSRTitle>
        <div class="ranking-content">
          <div v-for="item in rankData" :key="item.id" class="rank-item" :style="{'--percent': (parseFloat(item.value) / 35) * 100}">
            <span class="rank-number">{{ item.id }}</span>
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-value">{{ item.value }}<span class="unit">{{ item.unit }}</span></span>
          </div>
        </div>
      </el-card>

      <el-card class="ranking-card" body-style="background-color: #1a1a1a;">
        <StatSRTitle title="建筑用水同比排名" />
        <div class="ranking-content">
          <div v-for="item in compareData" :key="item.id" class="rank-item" :style="{'--percent': (parseFloat(item.value) / 35) * 100}">
            <span class="rank-number">{{ item.id }}</span>
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-value">{{ item.value }}<span class="unit">m³</span></span>
            <span class="rank-percent">{{ item.percent }}</span>
          </div>
        </div>
      </el-card>

      <el-card class="ranking-card" body-style="background-color: #1a1a1a;">
        <StatSRTitle title="建筑用水环比排名" />
        <div class="ranking-content">
          <div v-for="item in chainData" :key="item.id" class="rank-item" :style="{'--percent': (parseFloat(item.value) / 35) * 100}">
            <span class="rank-number">{{ item.id }}</span>
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-value">{{ item.value }}<span class="unit">m³</span></span>
            <span class="rank-percent">{{ item.percent }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.energy-ranking {
  padding: 20px;
  height: 100%;
  background-color: #1a1a1a;
}

.ranking-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  height: 100%;
}

.ranking-card {
  height: 100%;
  background-color: #1a1a1a;
}

.ranking-content {
  margin-top: 20px;
  overflow: hidden;
}

.rank-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #fff;
  border-bottom: 1px solid #303030;
  animation: scrollUp 15s linear infinite;
  position: relative;
  margin-bottom: 10px;
}

.rank-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: calc(var(--percent) * 1%);
  background: linear-gradient(90deg, rgba(24, 144, 255, 0.1) 0%, rgba(24, 144, 255, 0.2) 100%);
  z-index: 0;
}

.rank-number {
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background: linear-gradient(180deg, #1890FF 0%, #096DD9 100%);
  border-radius: 4px;
  margin-right: 12px;
}

.rank-name {
  flex: 1;
  margin-right: 12px;
}

.rank-value {
  font-weight: bold;
  color: #1890FF;
}

.rank-percent {
  margin-left: 12px;
  color: #52C41A;
}

.unit {
  font-size: 12px;
  margin-left: 4px;
  color: #8c8c8c;
}

@keyframes scrollUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
