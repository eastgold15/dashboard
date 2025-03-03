<script lang="ts" setup>

</script>

<template>
  <div class="echart-layout">
    <EchartsComponentsEchartsTitle title="历年用水量数据" unit="万吨" />
    <div class="last-month-water echart">
      <div class="wave-circle">
        <div class="wave-water" :style="{ height: '45%' }">
          <div class="wave wave1" />
          <div class="wave wave2" />
        </div>
        <div class="wave-text">
          45%
        </div>
        <div class="wave-label">
          节水率
        </div>
      </div>
      <div class="water-data">
        <div class="data-item">
          <div class="label">
            月基准水量
          </div>
          <div class="value">
            116253<span class="unit">m³</span>
          </div>
        </div>
        <div class="data-item">
          <div class="label">
            上月用水量
          </div>
          <div class="value">
            62362<span class="unit">m³</span>
          </div>
        </div>
        <div class="data-item">
          <div class="label">
            上月节水量
          </div>
          <div class="value">
            53891<span class="unit">m³</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.last-month-water {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  place-items: center;
  background: rgba(0, 0, 0, 0.2);
}

.wave-circle {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.wave-water {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45%;
  background: rgba(0, 153, 255, 0.2);
  transition: height 0.5s ease;
}

.wave {
  position: absolute;
  width: 200%;
  height: 200%;
  background-color: #09f;
  border-radius: 40%;
  opacity: 0.4;
  left: -50%;
  bottom: 0;
  animation: wave 8s infinite linear;
}

.wave2 {
  animation: wave 10s infinite linear;
  opacity: 0.2;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.wave-text {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 36px;
  font-weight: bold;
  color: #09f;
}

.wave-label {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #fff;
}

.water-data {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.data-item .label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.data-item .value {
  font-size: 24px;
  font-weight: bold;
  color: #09f;
}

.data-item .unit {
  font-size: 14px;
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.7);
}
</style>
