<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu } from "@element-plus/icons-vue";
const show = ref(false);

const showPopup = () => {
  show.value = true;
};
</script>
<template>
  <div>
    <div class="ly-header">
      <img src="/assets/image/logo.png" style="width: 70px; cursor: pointer" />
      <el-icon class="text-2xl" @click="showPopup"><icon-menu /></el-icon>
    </div>
    <el-drawer v-model="show" :with-header="false" size="60%">
      <LyNavMenu />
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
@use "./mobile.scss";
</style>
