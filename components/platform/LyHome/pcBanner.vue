<template>
  <el-row class="ly-sub-menu">
    <el-col :span="3">
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
    <el-col :span="2">
      <el-dropdown split-button type="primary" @click="handleClick">
        格式化
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
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
