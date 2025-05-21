<template>
  <div class="cherry-blossoms-container" ref="containerRef">
    <div class="petal" v-for="(petal, index) in petals" :key="index" :style="petal.style"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'

// 容器引用
const containerRef = ref<HTMLElement | null>(null)

// 花瓣数组
const petals = reactive<Array<{ style: any }>>([])

// 配置参数
const config = {
  petalCount: 50,        // 花瓣数量
  createInterval: 100,   // 创建花瓣的间隔时间(ms)
  maxSpeed: 3,           // 最大下落速度
  maxSize: 15,           // 最大花瓣尺寸
  windForce: 0.1,        // 风力
  windChangeInterval: 5000 // 风力变化间隔(ms)
}

// 当前风力
let currentWind = 0
// 动画帧ID
let animationFrameId: number | null = null
// 创建花瓣定时器
let createPetalTimer: ReturnType<typeof setInterval> | null = null
// 改变风力定时器
let changeWindTimer: ReturnType<typeof setInterval> | null = null

// 创建单个花瓣
const createPetal = () => {
  if (!containerRef.value) return

  const containerWidth = containerRef.value.clientWidth
  const containerHeight = containerRef.value.clientHeight
  
  // 随机属性
  const size = Math.random() * config.maxSize + 5
  const left = Math.random() * containerWidth
  const rotation = Math.random() * 360
  const opacity = Math.random() * 0.5 + 0.5
  const speed = Math.random() * config.maxSpeed + 1
  const rotationSpeed = (Math.random() - 0.5) * 2 // 旋转速度，可正可负
  
  // 随机颜色
  const colors = [
    'rgba(255, 200, 221, {opacity})',
    'rgba(255, 182, 193, {opacity})',
    'rgba(255, 192, 203, {opacity})',
    'rgba(250, 197, 205, {opacity})',
    'rgba(255, 174, 185, {opacity})'
  ]
  const color = colors[Math.floor(Math.random() * colors.length)].replace('{opacity}', opacity.toString())
  
  // 创建花瓣对象
  const petal = {
    style: {
      position: 'absolute',
      left: `${left}px`,
      top: '-20px',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: '50% 50% 50% 0',
      transform: `rotate(${rotation}deg)`,
      transformOrigin: '0 100%',
      animation: `fall ${Math.random() * 10 + 10}s linear forwards`,
      zIndex: '1'
    },
    // 花瓣的物理属性
    physics: {
      x: left,
      y: -20,
      size,
      speed,
      rotation,
      rotationSpeed,
      windEffect: (Math.random() * 0.5 + 0.5) * (Math.random() > 0.5 ? 1 : -1) // 风力影响因子
    }
  }
  
  petals.push(petal)
  
  // 移除超出容器的花瓣
  if (petals.length > config.petalCount) {
    petals.shift()
  }
}

// 更新花瓣位置
const updatePetals = () => {
  if (!containerRef.value) return
  
  const containerHeight = containerRef.value.clientHeight
  
  petals.forEach(petal => {
    const p = petal.physics
    
    // 更新位置
    p.y += p.speed
    p.x += currentWind * p.windEffect
    
    // 更新旋转
    p.rotation += p.rotationSpeed
    
    // 应用样式
    petal.style.left = `${p.x}px`
    petal.style.top = `${p.y}px`
    petal.style.transform = `rotate(${p.rotation}deg)`
    
    // 如果花瓣超出容器底部，重置位置
    if (p.y > containerHeight + 20) {
      p.y = -20
      p.x = Math.random() * containerRef.value.clientWidth
    }
  })
  
  // 继续下一帧
  animationFrameId = requestAnimationFrame(updatePetals)
}

// 改变风力
const changeWind = () => {
  currentWind = (Math.random() - 0.5) * config.windForce
}

// 初始化
const init = () => {
  // 创建初始花瓣
  for (let i = 0; i < config.petalCount; i++) {
    setTimeout(createPetal, i * 100)
  }
  
  // 定期创建新花瓣
  createPetalTimer = setInterval(createPetal, config.createInterval)
  
  // 开始动画
  animationFrameId = requestAnimationFrame(updatePetals)
  
  // 定期改变风力
  changeWindTimer = setInterval(changeWind, config.windChangeInterval)
}

// 清理资源
const cleanup = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  if (createPetalTimer) {
    clearInterval(createPetalTimer)
  }
  
  if (changeWindTimer) {
    clearInterval(changeWindTimer)
  }
}

// 生命周期钩子
onMounted(() => {
  nextTick(() => {
    init()
  })
})

onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.cherry-blossoms-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #f8f9fa;
}

.petal {
  position: absolute;
  animation: fall linear forwards;
}

@keyframes fall {
  to {
    transform: translateY(100vh) rotate(720deg);
  }
}
</style>  