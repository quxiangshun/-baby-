<template>
    <el-menu
        :mode="isMobile ? 'vertical' : 'horizontal'"
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <el-menu-item index="0">
        <img src="/assets/image/logo.png" style="width: 70px" alt="Logo" />
      </el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-sub-menu index="5">
        <template #title>屈氏文化</template>
        <el-menu-item index="51">屈氏概览</el-menu-item>
        <el-menu-item index="52">屈氏起源</el-menu-item>
        <el-menu-item index="53">郡望堂号</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>工具</template>
        <el-menu-item index="23">数学</el-menu-item>
        <el-menu-item index="24">语文</el-menu-item>
        <el-menu-item index="25">英语</el-menu-item>
        <el-menu-item index="21">JSON</el-menu-item>
        <el-menu-item index="22">格式化</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3">资源</el-menu-item>
      <el-sub-menu index="4">
        <template #title>游戏</template>
        <el-menu-item v-if="isMobile" index="41">休闲游戏</el-menu-item>
        <el-menu-item index="42">咸鱼之王</el-menu-item>
      </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { watchEffect } from "vue"
import { useRoute, useRouter } from "vue-router"
import useMobile from "@/store/useMobile";
import { storeToRefs } from "pinia";

const mobileStore = useMobile();
const { isMobile, showDrawer, activeIndex } = storeToRefs(mobileStore);

const route = useRoute();
const router = useRouter();

// 根据当前路由更新活动菜单项
watchEffect(() => {
  const routeMap: Record<string, string> = {
    "/": "1",
    "/tools/json": "21",
    "/tools/format": "22",
    "/tools/math": "23",
    "/tools/chinese": "24",
    "/tools/english": "25",
    "/resources": "3",
    "/games/casual-games": "41",
    "/games/xyzw": "42",
    "/qu/overview": "51",
    "/qu/origin": "52",
    "/qu/country-hall": "53",
  }
  activeIndex.value = routeMap[route.path] || "1";
});

// 处理菜单选择并跳转到对应路由
const handleSelect = (key: string) => {
  const routesMap: Record<string, string> = {
    "0": "/",
    "1": "/",
    "21": "/tools/json",
    "22": "/tools/format",
    "23": "/tools/math",
    "24": "/tools/chinese",
    "25": "/tools/english",
    "3": "/resources",
    "41": "/games/casual-games",
    "42": "/games/xyzw",
    "51": "/qu/overview",
    "52": "/qu/origin",
    "53": "/qu/country-hall",
  }

  if (routesMap[key]) {
    router.push(routesMap[key])
        .catch(err => {
          console.error("路由跳转错误:", err)
        });
    if (isMobile) {
      showDrawer.value = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>