<script lang="ts" setup>
import { ref } from "vue";
import { Menu as IconMenu } from "@element-plus/icons-vue";
import useMobile from "@/store/useMobile";
import { storeToRefs } from "pinia";

const mobileStore = useMobile();
const { showDrawer } = storeToRefs(mobileStore);

const showPopup = () => {
  showDrawer.value = true;
};

</script>
<template>
  <div>
    <div class="ly-header">
      <img src="/assets/image/logo.png" style="width: 70px; cursor: pointer" />
      <el-icon :size="25" @click="showPopup"><icon-menu /></el-icon>
    </div>
    <el-drawer v-model="showDrawer" :with-header="false" size="60%">
      <LyNavMenu />
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
@use "./mobile.scss";
</style>
