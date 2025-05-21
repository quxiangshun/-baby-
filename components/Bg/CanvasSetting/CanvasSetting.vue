<template>
  <div>
    <div class="max-w-md w-full mx-auto">
      <div class="w-full aspect-square max-w-xs mx-auto" id="hexagon-container">
        <!-- 中心等边六边形按钮 -->
        <div
          id="center-button"
          class="absolute inset-0 m-auto w-10 h-10 bg-primary flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg hexagon-clip z-30"
          :class="{ 'scale-110 bg-dark': isExpanded }"
          @click="toggleMenu"
        >
          A
        </div>
        <!-- 六个外围按钮 -->
        <div
          v-for="index in 6"
          :key="index"
          class="hexagon-button absolute w-8 h-8 flex items-center justify-center cursor-pointer transition-all duration-700 ease-in-out opacity-0 scale-0 hexagon-clip shadow-lg z-20"
          :class="[`hexagon-btn-${index}`, `btn-color-${index}`]"
          :style="{
            left: `${positions[index - 1].left}px`,
            top: `${positions[index - 1].top}px`,
          }"
          @mouseenter="handleMouseEnter(index - 1)"
          @mouseleave="handleMouseLeave(index - 1)"
          @click="handleButtonClick(index - 1)"
        >
          <i :class="icons[index - 1]" class="text-dark text-sm"></i>
        </div>

        <!-- 大六边形背景 -->
        <div
          class="absolute inset-0 m-auto w-24 h-24 bg-accent/30 rounded-full hexagon-clip z-10"
        ></div>
        <!-- 小六边形背景 -->
        <div
          class="absolute inset-0 m-auto w-14 h-14 bg-light/50 rounded-full hexagon-clip z-10"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
      activeButton: null,
      hoveredButton: null,
      icons: [
        "fa-solid fa-home",
        "fa-solid fa-user",
        "fa-solid fa-cog",
        "fa-solid fa-bell",
        "fa-solid fa-envelope",
        "fa-solid fa-book",
      ],
      positions: Array(6).fill({ left: 0, top: 0 }),
      colors: [
        "rgba(254, 200, 224, 0.9)",
        "rgba(255, 175, 204, 0.9)",
        "rgba(255, 214, 229, 0.9)",
        "rgba(249, 132, 180, 0.9)",
        "rgba(255, 175, 204, 0.9)",
        "rgba(254, 200, 224, 0.9)",
      ],
    };
  },
  mounted() {
    this.calculatePositions();
    window.addEventListener("resize", this.calculatePositions);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calculatePositions);
  },
  methods: {
    calculatePositions() {
      const container = document.getElementById("hexagon-container");
      const center = container.offsetWidth / 2;
      const centerHexRadius = 20; // 中心按钮半径
      const outerHexRadius = 16; // 外围按钮半径

      // 间距计算
      const radius = centerHexRadius + 8 + outerHexRadius * 0.866;

      this.positions = Array(6)
        .fill()
        .map((_, index) => {
          const angle = index * 60 * (Math.PI / 180);
          const x = center + radius * Math.cos(angle) - outerHexRadius;
          const y = center + radius * Math.sin(angle) - outerHexRadius;
          return { left: x, top: y };
        });
    },
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
      this.activeButton = null;

      const buttons = document.querySelectorAll(".hexagon-button");
      if (this.isExpanded) {
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
    },
    handleMouseEnter(index) {
      if (this.activeButton !== index) {
        const btn = document.querySelectorAll(".hexagon-button")[index];
        btn.classList.add("scale-110", "shadow-xl");
      }
    },
    handleMouseLeave(index) {
      if (this.activeButton !== index) {
        const btn = document.querySelectorAll(".hexagon-button")[index];
        btn.classList.remove("scale-110", "shadow-xl");
      }
    },
    handleButtonClick(index) {
      // 重置所有按钮状态
      document.querySelectorAll(".hexagon-button").forEach((btn) => {
        btn.classList.remove("active");
      });

      if (this.activeButton === index) {
        this.activeButton = null;
      } else {
        const btn = document.querySelectorAll(".hexagon-button")[index];
        btn.classList.add("active");
        this.activeButton = index;
      }

      // 添加点击动画
      const btn = document.querySelectorAll(".hexagon-button")[index];
      btn.classList.add("scale-120");
      setTimeout(() => btn.classList.remove("scale-120"), 200);

      alert(`点击了${this.getButtonName(index)}按钮`);
    },
    getButtonName(index) {
      const names = ["首页", "个人中心", "设置", "通知", "消息", "文档"];
      return names[index] || "未知";
    },
  },
};
</script>

<style scoped>
/* 为按钮添加过渡动画 */
.hexagon-button {
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
/* 为中心按钮添加更平滑的过渡 */
#center-button {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
/* 按钮激活状态样式 */
.hexagon-button.active {
  background-color: rgba(233, 113, 162, 0.9) !important;
  transform: scale(1.1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
/* 按钮正常状态样式 */
.btn-color-1 {
  background-color: rgba(254, 200, 224, 0.9);
}
.btn-color-2 {
  background-color: rgba(255, 175, 204, 0.9);
}
.btn-color-3 {
  background-color: rgba(255, 214, 229, 0.9);
}
.btn-color-4 {
  background-color: rgba(249, 132, 180, 0.9);
}
.btn-color-5 {
  background-color: rgba(255, 175, 204, 0.9);
}
.btn-color-6 {
  background-color: rgba(254, 200, 224, 0.9);
}
</style>

<style scoped type="text/tailwindcss">
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
  .hexagon-clip {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
  .hexagon-btn-1 {
    transform-origin: 173% 50%;
  }
  .hexagon-btn-2 {
    transform-origin: 136.6% 136.6%;
  }
  .hexagon-btn-3 {
    transform-origin: 50% 173%;
  }
  .hexagon-btn-4 {
    transform-origin: -36.6% 136.6%;
  }
  .hexagon-btn-5 {
    transform-origin: -73% 50%;
  }
  .hexagon-btn-6 {
    transform-origin: -36.6% -36.6%;
  }
}
</style>
