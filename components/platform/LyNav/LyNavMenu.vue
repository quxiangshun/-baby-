<template>
    <el-menu
        :mode="mobileStore.isMobile ? 'vertical' : 'horizontal'"
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <el-menu-item index="0">
        <img src="/assets/image/logo.png" style="width: 70px" alt="Logo" />
      </el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-sub-menu index="2">
        <template #title>工具</template>
        <el-menu-item index="21">JSON</el-menu-item>
        <el-menu-item index="22">格式化</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3">资源</el-menu-item>
      <el-menu-item v-if="mobileStore.isMobile" index="4">休闲游戏</el-menu-item>
      <el-menu-item index="5">咸鱼之王</el-menu-item>
    </el-menu>
</template>

<script lang="ts" setup>
import {ref, watchEffect} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import useMobile from "@store/useMobile";
const mobileStore = useMobile();

const route = useRoute()
const router = useRouter()

const activeIndex = ref('1')

// 根据当前路由更新活动菜单项
watchEffect(() => {
  const routeMap: Record<string, string> = {
    '/': '1',
    '/json': '21',
    '/format': '22',
    '/resources': '3',
    '/games': '4',
    '/xyzw': '4'
  }
  activeIndex.value = routeMap[route.path] || '1'
})

// 处理菜单选择并跳转到对应路由
const handleSelect = (key: string) => {
  const routesMap: Record<string, string> = {
    '0': '/',
    '1': '/',
    '21': '/json',
    '22': '/tools/encryption',
    '23': '/tools/three',
    '3': '/resources',
    '4': '/games',
    '5': '/xyzw',
  }

  if (routesMap[key]) {
    router.push(routesMap[key])
        .catch(err => {
          console.error('路由跳转错误:', err)
        })
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