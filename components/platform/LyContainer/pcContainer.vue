<template>
  <div class="ly-container">
    <el-card class="card-bg-custom glass-scrollbar"
             style="height: calc(100vh - 60px);box-shadow: none !important;transform: none !important;">
      <slot />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
@use "./pc.scss";
</style>
<script setup lang="ts">
</script>