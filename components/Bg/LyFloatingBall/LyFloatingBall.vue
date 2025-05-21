<template>
  <div
    class="floating-ball"
    @mousedown="onMouseDown"
    :style="{ left: ballLeft + 'px', top: ballTop + 'px' }"
  >
    <div class="floating-container">
      <!-- 中心等边六边形按钮 -->
      <div
        id="center-button"
        class="absolute inset-0 m-auto w-10 h-10 bg-primary flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg hexagon-clip z-30"
        :class="{ 'scale-110 bg-dark': isExpanded }"
        @click="toggleMenu"
      >
        A
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";

// 悬浮球位置（初始在右下角）
const ballLeft = ref(0);
const ballTop = ref(0);
// 鼠标交互相关变量
const startX = ref(0);
const startY = ref(0);
const isDragging = ref(false);
const offsetX = ref(0);
const offsetY = ref(0);

const isExpanded = ref(false);
const activeButton = ref(null);

// 组件挂载后初始化位置
onMounted(() => {
  ballLeft.value = window.innerWidth - 60;
  ballTop.value = window.innerHeight - 200;
});

// 鼠标按下事件处理
const onMouseDown = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.clientX;
  startY.value = e.clientY;
  offsetX.value = e.clientX - ballLeft.value;
  offsetY.value = e.clientY - ballTop.value;
  e.preventDefault();

  const onGlobalMouseMove = (e: MouseEvent) => {
    if (isDragging.value) {
      ballLeft.value = e.clientX - offsetX.value;
      ballTop.value = e.clientY - offsetY.value;
    }
  };

  const onGlobalMouseUp = () => {
    isDragging.value = false;
    window.removeEventListener("mousemove", onGlobalMouseMove);
    window.removeEventListener("mouseup", onGlobalMouseUp);
  };

  window.addEventListener("mousemove", onGlobalMouseMove);
  window.addEventListener("mouseup", onGlobalMouseUp);
};

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
  activeButton.value = null;

  const buttons = document.querySelectorAll(".hexagon-button");
  if (isExpanded.value) {
    document.getElementById("center-button").classList.add("scale-110", "bg-dark");
    document.getElementById("center-button").classList.remove("bg-primary");

    buttons.forEach((btn, index) => {
      setTimeout(() => {
        btn.style.opacity = "1";
        btn.style.transform = "scale(1)";
      }, index * 100);
    });
  } else {
    document.getElementById("center-button").classList.remove("scale-110", "bg-dark");
    document.getElementById("center-button").classList.add("bg-primary");

    buttons.forEach((btn, index) => {
      setTimeout(() => {
        btn.style.opacity = "0";
        btn.style.transform = "scale(0)";
      }, (5 - index) * 100);
    });
  }
};
</script>

<style scoped>
.floating-ball {
  position: fixed;
  height: 150px;
  cursor: pointer;
  z-index: 9999;
  user-select: none;
  transition: left 0.1s ease, top 0.1s ease;
}

.floating-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  /* background: radial-gradient(circle 150px, #FFFFFF, transparent); */
  /* 使用计算属性的值作为背景色 */
  background-color: #fec8e0;
  text-align: center;
  color: white;
}
</style>
