<template>
  <div class="relative">
    <!-- 优化后的轮播图 -->
    <div class="swiper-container h-96 relative">
      <div class="swiper-wrapper">
        <!-- 第一张幻灯片 - 使用背景图片 -->
        <div class="swiper-slide">
          <div class="absolute inset-0 bg-black/30 z-0"></div>
          <img
            :src="cultureBg"
            class="absolute inset-0 w-full h-full object-cover"
            alt="屈氏文化背景"
          >
          <div class="relative z-10 flex items-center justify-center h-full text-center px-4">
            <div>
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 font-zcool">屈氏文化传承</h1>
              <p class="text-xl text-white/90 max-w-2xl mx-auto">探索千年屈氏家族的历史与文化精髓</p>
            </div>
          </div>
        </div>

        <!-- 第二张幻灯片 - 使用渐变背景 -->
        <div class="swiper-slide bg-gradient-to-r from-amber-600/90 to-red-600/90">
          <div class="absolute inset-0 bg-black/30 z-0"></div>
          <img
            :src="cultureBg1"
            class="absolute inset-0 w-full h-full object-cover"
            alt="屈氏文化背景"
          >
          <div class="relative z-10 flex items-center justify-center h-full text-center px-4">
            <div>
              <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 font-mashanzheng">屈原精神</h1>
              <p class="text-xl text-white/90 max-w-2xl mx-auto">传承爱国诗人的高尚品格与文学成就</p>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination !bottom-4"></div>
    </div>
  </div>
</template>
  
  <script setup>
  import {onMounted} from 'vue'
  import cultureBg from "~/assets/image/qu/cultureBg.png";
  import cultureBg1 from "~/assets/image/qu/cultureBg1.png";
  import Swiper from 'swiper'
  import 'swiper/css'

  onMounted(() => {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
  })
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+XiaoWei&display=swap');
  
  .font-zcool {
    font-family: 'ZCOOL XiaoWei', serif;
  }
  .font-mashanzheng {
    font-family: 'Ma Shan Zheng', cursive;
  }
  </style>