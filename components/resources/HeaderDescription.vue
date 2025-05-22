<template>
  <div class="task-section">
    <el-row :gutter="10">
      <el-col>
        <el-card class="line-card">
          <el-text type="primary"><h1>老baby·二爷</h1></el-text>
          <h2>点击软件名称下载，亲测可用</h2>
          <div class="font-medium">
            请使用 Ctrl+F 组合键来搜索您需要的软件。
          </div>
          <div class="font-medium">
            本站软件没有任何广告插件，捆绑软件，病毒木马，干净省心！
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.task-section {
  margin-bottom: 10px;
}

.line-card {
  background: linear-gradient(
      45deg,
      var(--el-color-primary-light-5) 0%,
      transparent 100%
  );
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.el-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

/* 针对三个卡片设置不同的起始颜色深度，增加层次感 */
.el-card:nth-child(1) {
  background: linear-gradient(
      45deg,
      var(--el-color-primary-light-5) 0%,
      transparent 100%
  );
}
</style>
<style>
.el-card__body {
  padding: 10px;
}
</style>
