<template>
  <div class="ly-container">
    <el-card class="card-bg-custom glass-scrollbar no-padding"
             style="height: calc(100vh - 60px);box-shadow: none !important;transform: none !important;">
      <slot />
    </el-card>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
@use "./pc.scss";
</style>
<style>
.no-padding .el-card__body {
    padding: 0 !important;
}
</style>