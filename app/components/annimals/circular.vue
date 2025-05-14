<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Props {
  percent?: number // 0-100 的百分比
  waveAmplitude?: number // 波浪振幅
  waveSpeed?: number // 波浪速度
  size?: number // 组件大小(px)
  color?: string // 主色
}

const props = withDefaults(defineProps<Props>(), {
  percent: 10,
  waveAmplitude: 5,
  waveSpeed: 0.002,
  size: 100,
  color: '#4dabf7',
})

const waveOffset = ref(0)
const viewBoxSize = 100 // 保持固定的视图框大小，通过缩放实现大小调整
const radius = viewBoxSize / 2

// // 计算缩放比例
// const scale = computed(() => props.size / viewBoxSize)

// 波浪动画
function animateWave() {
  waveOffset.value = (waveOffset.value + props.waveSpeed) % 1
  requestAnimationFrame(animateWave)
}

onMounted(() => {
  animateWave()
})

// 计算水位路径
const waterPath = computed(() => {
  const waterHeight = viewBoxSize - props.percent
  const offset = waveOffset.value * 20

  return `
    M -100,${waterHeight}
    Q ${-70 + offset},${waterHeight - props.waveAmplitude} 
      ${-40 + offset},${waterHeight}
    Q ${-10 + offset},${waterHeight + props.waveAmplitude} 
      ${20 + offset},${waterHeight}
    Q ${50 + offset},${waterHeight - props.waveAmplitude} 
      ${80 + offset},${waterHeight}
    Q ${110 + offset},${waterHeight + props.waveAmplitude} 
      ${140 + offset},${waterHeight}
    Q ${170 + offset},${waterHeight - props.waveAmplitude} 
      ${200 + offset},${waterHeight}
    L 200,200
    L -100,200
    Z
  `
})

// 计算字体大小，使其随组件大小缩放
const fontSize = computed(() => Math.max(10, props.size * 0.01))
</script>

<template>
  <div class="water-ball-container" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg
      class="water-ball"
      :width="size"
      :height="size"
      :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
      preserveAspectRatio="xMidYMid meet"
    >
      <!-- 玻璃球外框 -->
      <circle
        :cx="radius"
        :cy="radius"
        :r="radius"
        fill="none"
        :stroke="color"
        stroke-width="2"
      />
      <!-- 剪切路径 -->
      <defs>
        <clipPath id="waterClip">
          <circle :cx="radius" :cy="radius" :r="radius" />
        </clipPath>
      </defs>
      <!-- 水波部分 -->
      <g clip-path="url(#waterClip)">
        <path
          :d="waterPath"
          :fill="color"
          opacity="0.8"
        />
        <!-- 百分比文字 -->
        <text
          :x="radius"
          :y="radius"
          text-anchor="middle"
          dominant-baseline="middle"
          :font-size="fontSize"
          fill="white"
          font-weight="bold"
        >
          {{ percent }}%
        </text>
      </g>
      <!-- 高光效果 -->
      <circle
        :cx="radius + 10"
        :cy="radius - 10"
        :r="radius * 0.15"
        fill="white"
        opacity="0.2"
      />
      <!-- 浮动动画 -->
      <animateTransform
        xlink:href=".water-ball"
        attributeName="transform"
        type="translate"
        values="0,0; 3,1; 0,0; -3,1; 0,0"
        keyTimes="0; 0.3; 0.5; 0.8; 1"
        calcMode="spline"
        keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
        dur="12s"
        repeatCount="indefinite"
      />
    </svg>
  </div>
</template>

<style scoped>
.water-ball-container {
  display: inline-block;
  position: relative;
}

.water-ball {
  overflow: visible;
  filter: drop-shadow(0 0 calc(v-bind('size') * 0.08) rgba(0, 0, 0, 0.2));
}

text {
  user-select: none;
  pointer-events: none;
  text-shadow: 0 0 calc(v-bind('size') * 0.03 rgba(0, 0, 0, 0.5));
}
</style>
