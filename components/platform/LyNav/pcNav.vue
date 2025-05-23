<template>
  <div class="ly-header">
    <LyNavMenu />
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeIndex = ref('1')

// 根据当前路由更新活动菜单项
watchEffect(() => {
  const routeMap: Record<string, string> = {
    '/': '1',
    '/json': '21',
    '/format': '22',
    '/resources': '3'
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
    '3': '/resources'
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
@use "./pc.scss";
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>  