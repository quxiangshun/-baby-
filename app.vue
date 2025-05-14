<template>
  <div>
    <!-- 这里可以添加全局的头部、导航栏等 -->
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
    <!-- 这里可以添加全局的底部 -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import useMobile from "@store/useMobile";
// import useLoginInfo from "@store/useLoginInfo";

const mobileStore = useMobile();
// const loginInfo = useLoginInfo();
let { isMobile } = storeToRefs(mobileStore);

onMounted(()=>{
  //判断是哪个客户端（pc，mobile），主要用来兼容样式
  if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    //增加全局class，用于设置全局样式
    document.getElementsByTagName('html')[0].className = 'mobile';
    isMobile.value = true;
  }else{
    //增加全局class，用于设置全局样式
    document.getElementsByTagName('html')[0].className = 'pc';
    isMobile.value = false;
  }
});
</script>

<style scoped>
/* 可以在这里添加全局样式 */
</style>