<template>
    <div class="canvas-container">
      <canvas ref="canvasRef" class="canvas-element" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'
  
  // 获取 Canvas 元素引用
  const canvasRef = ref(null)
  let ctx = null
  
  // 使用响应式数据存储窗口尺寸
  const windowSize = reactive({
    width: 0,
    height: 0
  })
  
  const snowCount = 400;
  // 存放雪花信息：位置、半径、速度等
  const snows = ref([])
  
  // 更新窗口尺寸
  const updateWindowSize = () => {
    windowSize.width = window.innerWidth
    windowSize.height = window.innerHeight
  }
  
  // 创建雪花
  const createSnows = () => {
    const snowArr = []
    for (let i = 0; i < snowCount; i++) {
      snowArr.push({
        x: Math.random() * windowSize.width,
        y: Math.random() * windowSize.height,
        r: Math.random() * 2 + 1, // 雪花半径
        speedX: (Math.random() - 0.5) * 2, // 水平速度
        speedY: Math.random() * 1 + 1 // 垂直速度
      })
    }
    snows.value = snowArr
  }
  
  // 初始化 Canvas
  const initCanvas = () => {
    if (!canvasRef.value) return
    
    const canvas = canvasRef.value
    ctx = canvas.getContext('2d')
    
    // 设置 Canvas 尺寸（考虑 Retina 屏幕）
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = windowSize.width * dpr
      canvas.height = windowSize.height * dpr
      ctx.scale(dpr, dpr)
      
      // 重置样式尺寸
      canvas.style.width = `${windowSize.width}px`
      canvas.style.height = `${windowSize.height}px`
    }
    
    updateWindowSize()
    setCanvasSize()
    
    window.addEventListener('resize', () => {
      updateWindowSize()
      setCanvasSize()
    })
    
    // 创建雪花并开始动画
    createSnows()
    animateSnow()
  }
  
  // 绘制雪花
  const drawSnow = () => {
    if (!ctx) return
    
    // 清除画布
    ctx.clearRect(0, 0, windowSize.width, windowSize.height)
    
    // 绘制圆形
    ctx.beginPath()
    // 填充颜色
    ctx.fillStyle = "#ffc0cb"
    // 阴影
    ctx.shadowColor = "#ffc0cb"
    // 阴影模糊
    ctx.shadowBlur = 10
    
    const snowArr = snows.value
    for (let i = 0; i < snowCount; i++) {
      const snow = snowArr[i]
      // 圆的圆心 x,y 半径r 从0度开始画 画一个整圆
      ctx.moveTo(snow.x, snow.y)
      ctx.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2)
    }
    // 填充
    ctx.fill()
    // 关闭路径
    ctx.closePath()
  }
  
  // 雪花动画
  const animateSnow = () => {
    // 更新雪花位置
    const snowArr = snows.value
    for (let i = 0; i < snowCount; i++) {
      const snow = snowArr[i]
      snow.x += snow.speedX
      snow.y += snow.speedY
      
      // 如果雪花超出边界，重新放置
      if (snow.y > windowSize.height) {
        snow.y = 0
        snow.x = Math.random() * windowSize.width
      }
      
      if (snow.x > windowSize.width) {
        snow.x = 0
        snow.y = Math.random() * windowSize.height
      } else if (snow.x < 0) {
        snow.x = windowSize.width
        snow.y = Math.random() * windowSize.height
      }
    }
    
    // 绘制雪花
    drawSnow()
    
    // 下一帧动画
    requestAnimationFrame(animateSnow)
  }
  
  // 组件挂载后初始化 Canvas
  onMounted(() => {
    // 确保在客户端环境下执行
    if (typeof window !== 'undefined') {
      updateWindowSize()
      nextTick(() => {
        initCanvas()
      })
    }
  })
  
  // 组件卸载时清理
  onUnmounted(() => {
    window.removeEventListener('resize', updateWindowSize)
  })
  </script>
  
  <style scoped>
  .canvas-container {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background-image: url("./snow-bg.jpg");
    background-size: cover;
    background-position: center;
  }
  
  .canvas-element {
    border: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
  }
  </style>