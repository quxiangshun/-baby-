<script setup lang="ts">
import { ref, onMounted } from "vue";
import { combinedList } from "@/components/resources/resource";
const route = useRoute() // 获取当前路由对象

const resources = ref([]);
const loading = ref(false);
const error = ref("");
const resource = ref({});
onMounted(() => {
  resources.value = combinedList;
  try {
    // 获取路由参数
    const param = route.params.software;
    if (!param) {
      error.value = "未获取到有效参数";
      return;
    }
    loading.value = true;
    resource.value = resources.value.find(item => item.type === param);
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = "发生未知错误";
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <!-- 显示加载状态或接口返回的数据 -->
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <el-link :href="resource.link1" target="_blank"><span class="text-6xl">下载链接</span></el-link>
      <br />
      <el-link :href="resource.link2" target="_blank"><span class="text-6xl">备用链接</span></el-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
