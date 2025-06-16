<template>
  <div class="qu-website">
    <!-- 导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <img :src="QuLogo" alt="屈氏文化" class="h-10">
            <span class="ml-2 text-xl font-bold text-gray-800">屈氏文化</span>
          </div>
          <nav class="hidden md:flex space-x-8">
            <a href="#history" class="text-gray-600 hover:text-indigo-600 transition">家族历史</a>
            <a href="#persons" class="text-gray-600 hover:text-indigo-600 transition">历史名人</a>
            <a href="#culture" class="text-gray-600 hover:text-indigo-600 transition">文化传承</a>
            <a href="#maxims" class="text-gray-600 hover:text-indigo-600 transition">家族家训</a>
          </nav>
          <button class="md:hidden">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <LyQuSwiper />
    <!-- 主要内容区 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section id="history" class="mb-20 scroll-mt-20">
        <FamilyHistorySection />
      </section>

      <section id="persons" class="mb-20 scroll-mt-20">
        <FamousPersonsSection />
      </section>

      <section id="culture" class="mb-20 scroll-mt-20">
        <CultureHeritageSection />
      </section>

      <section id="maxims" class="scroll-mt-20">
        <FamilyMaximsSection />
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">关于我们</h3>
            <p class="text-gray-300">屈氏文化研究会致力于研究和传播屈氏家族的历史文化。</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">快速链接</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-300 hover:text-white transition">家族历史</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition">历史名人</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition">文化传承</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-4">联系我们</h3>
            <p class="text-gray-300">邮箱: 735591110@qq.com</p>
            <p class="text-gray-300">电话: 18262299378</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import QuLogo from "~/assets/image/qu/qu-logo.png";
import { onMounted } from 'vue'
import Swiper from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

onMounted(() => {
  new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
  })
})
</script>

<style scoped>
.qu-website {
  @apply min-h-screen flex flex-col;
}

.swiper-slide {
  @apply h-full w-full;
}

.scroll-mt-20 {
  scroll-margin-top: 5rem;
}
</style>