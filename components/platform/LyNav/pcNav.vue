<template>
  <div class="ly-header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img src="/assets/image/logo.png" style="width: 70px" />
      </el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-sub-menu index="2">
        <template #title>工具</template>
        <el-menu-item index="21">JSON</el-menu-item>
        <el-menu-item index="22">加密</el-menu-item>
        <el-menu-item index="23">item three</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3">资源</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss" scoped>
@use "./pc.scss";
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
