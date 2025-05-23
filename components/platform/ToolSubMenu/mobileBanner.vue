<template>
  <el-row class="ly-sub-menu">
    <el-col
      :xs="12"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="4"
    >
      <el-dropdown split-button type="primary" @click="handleClick('/json')">
        JSON工具
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleClick('/json/analyze')">JSON在线解析</el-dropdown-item>
            <el-dropdown-item>JSON压缩转义</el-dropdown-item>
            <el-dropdown-item>JSON编辑器</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :md="8"
      :lg="6"
      :xl="4"
    >
      <el-dropdown split-button type="primary" @click="handleClick('/format')">
        格式化
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>JS压缩、格式化</el-dropdown-item>
            <el-dropdown-item>JS混淆加密</el-dropdown-item>
            <el-dropdown-item>CSS压缩、格式化</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router' // 引入路由钩子
const router = useRouter() // 获取路由实例
// 导航函数
const handleClick = url => {
  if (url) {
    router.push(url) // 使用路由方法跳转
  }
}
</script>

<style lang="scss" scoped>
@use "./pc.scss";

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
