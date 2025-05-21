<template>
    <div class="canvas-container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
      <canvas ref="canvasRef" class="canvas-element" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'
  
  // 获取 Canvas 元素引用
  const canvasRef = ref(null)
  let ctx = null
  
  // 使用响应式数据存储窗口尺寸和鼠标位置
  const windowSize = reactive({
    width: 0,
    height: 0
  })
  
  const mouse = reactive({
    x: 0,
    y: 0,
    isMoving: false,
    lastMoveTime: 0
  })
  
  const lineCount = 50
  // 存放线条信息：起点、终点、速度等
  const lines = ref([])
  
  // 更新窗口尺寸
  const updateWindowSize = () => {
    windowSize.width = window.innerWidth
    windowSize.height = window.innerHeight
  }
  
  // 创建线条
  const createLines = () => {
    const lineArr = []
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2
    const radius = Math.min(windowSize.width, windowSize.height) * 0.3
    
    // 计算多边形顶点（正多边形）
    const polygonPoints = []
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2
      polygonPoints.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      })
    }
    
    // 创建线条
    for (let i = 0; i < lineCount; i++) {
      // 随机起点和终点
      const startX = Math.random() * windowSize.width
      const startY = Math.random() * windowSize.height
      const endX = Math.random() * windowSize.width
      const endY = Math.random() * windowSize.height
      
      lineArr.push({
        start: { x: startX, y: startY },
        end: { x: endX, y: endY },
        targetStart: { ...polygonPoints[i] }, // 多边形目标点
        targetEnd: { ...polygonPoints[(i + Math.floor(lineCount/2)) % lineCount] }, // 对面的点
        speed: Math.random() * 1 + 0.5, // 移动速度
        color: `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(Math.random() * 150)}, ${255}, 0.7)` // 蓝色系
      })
    }
    
    lines.value = lineArr
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
      // 窗口大小变化后重新计算多边形
      updatePolygonTargets()
    })
    
    // 创建线条并开始动画
    createLines()
    animateLines()
  }
  
  // 更新多边形目标点
  const updatePolygonTargets = () => {
    const lineArr = lines.value
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2
    const radius = Math.min(windowSize.width, windowSize.height) * 0.3
    
    for (let i = 0; i < lineCount; i++) {
      const angle = (i / lineCount) * Math.PI * 2
      lineArr[i].targetStart = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      }
      lineArr[i].targetEnd = {
        x: centerX + radius * Math.cos(angle + Math.PI),
        y: centerY + radius * Math.sin(angle + Math.PI)
      }
    }
    
    lines.value = [...lineArr]
  }
  
  // 处理鼠标移动
  const handleMouseMove = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    mouse.isMoving = true
    mouse.lastMoveTime = Date.now()
  }
  
  // 处理鼠标离开
  const handleMouseLeave = () => {
    mouse.isMoving = false
  }
  
  // 绘制线条
  const drawLines = () => {
    if (!ctx) return
    
    // 清除画布
    ctx.clearRect(0, 0, windowSize.width, windowSize.height)
    
    const lineArr = lines.value
    
    // 绘制所有线条
    for (let i = 0; i < lineCount; i++) {
      const line = lineArr[i]
      
      ctx.beginPath()
      ctx.moveTo(line.start.x, line.start.y)
      ctx.lineTo(line.end.x, line.end.y)
      
      ctx.strokeStyle = line.color
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.closePath()
    }
  }
  
  // 线条动画
  const animateLines = () => {
    const now = Date.now()
    const mouseIdleTime = now - mouse.lastMoveTime
    
    // 更新线条位置
    const lineArr = lines.value
    for (let i = 0; i < lineCount; i++) {
      const line = lineArr[i]
      let targetStart, targetEnd
      
      // 根据鼠标是否移动决定目标位置
      if (mouse.isMoving && mouseIdleTime < 1000) {
        // 鼠标正在移动，线条散开
        const offsetX = (Math.random() - 0.5) * windowSize.width * 0.5
        const offsetY = (Math.random() - 0.5) * windowSize.height * 0.5
        
        targetStart = {
          x: mouse.x + offsetX,
          y: mouse.y + offsetY
        }
        
        targetEnd = {
          x: mouse.x - offsetX,
          y: mouse.y - offsetY
        }
      } else {
        // 鼠标静止，线条聚集成多边形
        targetStart = line.targetStart
        targetEnd = line.targetEnd
      }
      
      // 平滑移动到目标位置
      line.start.x += (targetStart.x - line.start.x) * 0.03
      line.start.y += (targetStart.y - line.start.y) * 0.03
      line.end.x += (targetEnd.x - line.end.x) * 0.03
      line.end.y += (targetEnd.y - line.end.y) * 0.03
    }
    
    // 绘制线条
    drawLines()
    
    // 下一帧动画
    requestAnimationFrame(animateLines)
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
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: crosshair;
  }
  
  .canvas-element {
    border: none;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  </style>  