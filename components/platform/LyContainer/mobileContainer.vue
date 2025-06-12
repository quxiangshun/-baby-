<template>
  <div class="ly-container">
    <el-card class="card-bg-custom glass-scrollbar" style="height: calc(100vh - 60px);">
      <slot />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
@use "./mobile.scss";
</style>
