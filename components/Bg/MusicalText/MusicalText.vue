<template>
  <div class="musical-text-container">
    <div class="text-9xl rounded-xl p-4 md:p-6 overflow-hidden">
      <div class="flex justify-center">
        <div ref="textContainer" class="text-[clamp(1.5rem,5vw,3rem)] font-bold text-center leading-tight">
          <!-- 字符将通过 JS 动态生成 -->
        </div>
      </div>

      <div class="mt-6 flex flex-wrap justify-center gap-2">
        <el-button type="primary" @click="changeSpeed(-0.1)">
          减慢
        </el-button>
        <el-button type="primary" @click="changeSpeed(0.1)">
          加快
        </el-button>
        <el-button type="primary" @click="changeIntensity(-0.02)">
          减弱波动
        </el-button>
        <el-button type="primary" @click="changeIntensity(0.02)">
          增强波动
        </el-button>
        <el-button type="primary" @click="resetAnimation">
          重置
        </el-button>
      </div>
      <el-input
          v-model="showText"
          @input="handleTextChange"
          placeholder="请输入文字（支持中英文）"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

// 组件配置
const props = defineProps({
  baseSpeed: { type: Number, default: 1.0 },
  waveIntensity: { type: Number, default: 0.1 },
  jumpHeight: { type: String, default: '-8px' },
  animationEasing: { type: String, default: 'cubic-bezier(0.4, 0, 0.2, 1)' }
})

// 动态文本状态
const showText = ref(props.text || '栾媛') // 初始化空字符串兼容
const textContainer = ref<HTMLDivElement | null>(null)
const animationSpeed = ref(props.baseSpeed)
const currentWaveIntensity = ref(props.waveIntensity)

// Element UI 粉色主题颜色
const elementPinkColors = [
  '--el-color-primary', '--el-color-primary-light-3',
  '--el-color-primary-light-5', '--el-color-primary-light-7',
  '--el-color-primary-light-8', '--el-color-primary-light-9',
  '--el-color-primary-dark-2'
]

// 文本变化处理
const handleTextChange = (value: string) => {
  showText.value = value.trim() // 自动过滤空白字符
  createCharAnimations()
}

// 创建字符动画（增加空值处理）
const createCharAnimations = () => {
  if (!textContainer.value) return
  textContainer.value.innerHTML = '' // 清空容器

  const text = showText.value || ' ' // 处理空字符串，插入空白字符占位
  text.split('').forEach((char, index) => {
    const charElement = document.createElement('span')
    charElement.className = 'note-bounce'
    charElement.textContent = char === ' ' ? '\u00A0' : char // 替换空格为不换行空格

    // 颜色逻辑（保持原有渐变）
    const colorIndex = index % elementPinkColors.length
    const colorVar = elementPinkColors[colorIndex]
    charElement.style.setProperty('--color-start', `var(${colorVar}, #ff69b4)`)
    const peakColorIndex = (colorIndex + 2) % elementPinkColors.length
    const peakColorVar = elementPinkColors[peakColorIndex]
    charElement.style.setProperty('--color-peak', `var(${peakColorVar}, #ffd1e5)`)

    // 动画属性
    charElement.style.animationDuration = `${props.baseSpeed / animationSpeed.value}s`
    charElement.style.animationDelay = `${index * currentWaveIntensity.value}s`
    charElement.style.animationTimingFunction = props.animationEasing
    charElement.style.display = 'inline-block'

    textContainer.value.appendChild(charElement)
  })
}

// 其他交互逻辑（保持不变）
const changeSpeed = (delta: number) => {
  animationSpeed.value = Math.max(0.3, Math.min(3.0, animationSpeed.value + delta))
  createCharAnimations()
}

const changeIntensity = (delta: number) => {
  currentWaveIntensity.value = Math.max(0.05, Math.min(0.3, currentWaveIntensity.value + delta))
  createCharAnimations()
}

const resetAnimation = () => {
  animationSpeed.value = props.baseSpeed
  currentWaveIntensity.value = props.waveIntensity
  createCharAnimations()
}

// 生命周期钩子
onMounted(() => {
  createCharAnimations()
})

// 监听 showText 变化（优化响应）
watch(showText, (newValue) => {
  if (newValue !== undefined) createCharAnimations()
})
</script>

<style>
.musical-text-container {
  width: 100%;
  max-width: 600px;
  min-height: 200px; /* 增加最小高度防止布局塌陷 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.note-bounce {
  animation: noteBounce infinite;
  display: inline-block;
  margin: 0 2px; /* 增加字符间距 */
}

@keyframes noteBounce {
  0%, 100% {
    transform: translateY(0);
    color: var(--color-start);
  }
  50% {
    transform: translateY(var(--jump-height, -8px));
    color: var(--color-peak);
    /* 增加视觉反馈 */
    text-shadow: 0 0 8px rgba(255, 105, 180, 0.3);
  }
}
</style>