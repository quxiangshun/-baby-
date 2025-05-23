<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router'; // 引入路由钩子
import { winAdobe23ResourceList, pmResourceList } from "@/components/resources/resource";

const route = useRoute() // 获取当前路由对象
const router = useRouter() // 获取路由实例

// 计算属性：判断是否为主页（路径为 '/'）
const isResourceRootPage = computed(() => {
  return route.path === '/resources'
})

</script>

<template>
  <div v-if="isResourceRootPage" class="select-none">
    <el-card class="card-custom glass-scrollbar" style="height: calc(100vh - 60px);">
      <HeaderDescription />
      <h2 class="area-title mt-5 mb-5">Windows Adobe系列</h2>
      <ResourceList :data="winAdobe23ResourceList" />
      <h2 class="area-title mt-5 mb-5">Mac Adobe系列</h2>
      <ResourceList :data="winAdobe23ResourceList" />
      <h2 class="area-title mt-5 mb-5">Windows 产品</h2>
      <ResourceList :data="pmResourceList" />
    </el-card>
  </div>
  <NuxtPage/>
</template>

<style lang="scss" scoped>
.card-custom {
  overflow-y: auto;
  background-color: RGB(255, 255, 255, 0.3);
}
.area-title {
  background: linear-gradient(
          to right,
          var(--el-color-primary-light-2),
          var(--el-color-primary-light-6)
  );
  padding: 3px 10px;
  border-radius: 10px;
}
</style>
