<template>
  <div>
    <LyNav />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LySnow />
    <!-- 全局底部 -->
    <footer class="fixed bottom-0 left-0 right-0 bg-gray-30 py-4">
      <div class="container mx-auto px-4">
        <div class="text-center text-gray-600 text-xs">
          &copy; 2025 老baby·二爷. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import useMobile from "@store/useMobile";

const mobileStore = useMobile();
const { isMobile } = storeToRefs(mobileStore);

// 移动端菜单状态
const mobileMenuOpen = ref(false);

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// 设备检测函数
const detectDevice = () => {
  // 屏幕宽度检测
  const isScreenMobile = window.innerWidth < 768;

  // 用户代理检测
  const isUserAgentMobile = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
    navigator.userAgent
  );

  // 综合判断
  isMobile.value = isScreenMobile || isUserAgentMobile;

  // 更新全局类名
  const htmlElement = document.documentElement;
  if (isMobile.value) {
    htmlElement.classList.remove("pc");
    htmlElement.classList.add("mobile");
  } else {
    htmlElement.classList.remove("mobile");
    htmlElement.classList.add("pc");
  }
};

// 初始化检测
onMounted(() => {
  detectDevice();

  // 监听窗口大小变化
  window.addEventListener("resize", detectDevice);

  // 监听方向变化（移动设备）
  window.addEventListener("orientationchange", detectDevice);
});

// 清理资源
onUnmounted(() => {
  window.removeEventListener("resize", detectDevice);
  window.removeEventListener("orientationchange", detectDevice);
});

// 响应式设备状态变化
watchEffect(() => {
  console.log(`当前设备: ${isMobile.value ? "移动设备" : "桌面设备"}`);

  // 如果切换到桌面设备，关闭移动菜单
  if (!isMobile.value) {
    mobileMenuOpen.value = false;
  }
});
</script>

<style scoped>
footer {
  margin-top: 4rem;
  z-index: 2;
}
</style>
