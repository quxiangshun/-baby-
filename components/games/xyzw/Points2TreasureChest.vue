<template>
  <el-card class="card-bg-custom">
    <div class="box-data-container">
      <!-- 标题行 -->
      <div class="box-data-header">
        <div>次数</div>
        <div>扣除宝箱积分</div>
        <div>赠送宝箱/积分</div>
      </div>
      <!-- 数据行 -->
      <div class="box-data-row">
        <div>1</div>
        <div>10</div>
        <div>青铜 / 10</div>
      </div>
      <div class="box-data-row">
        <div>2</div>
        <div>20</div>
        <div>青铜 / 10</div>
      </div>
      <div class="box-data-row">
        <div>3</div>
        <div>30</div>
        <div>黄金 / 20</div>
      </div>
      <div class="box-data-row">
        <div>4</div>
        <div>40</div>
        <div>铂金 / 50</div>
      </div>
      <div class="box-data-row">
        <div>5</div>
        <div>80</div>
        <div>铂金 / 50</div>
      </div>
      <div class="box-data-row">
        <div>6</div>
        <div>100</div>
        <div>铂金 / 50</div>
      </div>
      <div class="box-data-row">
        <div>7</div>
        <div>70</div>
        <div>黄金 / 20</div>
      </div>
      <div class="box-data-row">
        <div>8</div>
        <div>50</div>
        <div>铂金 / 50</div>
      </div>
      <div class="box-data-row">
        <div>9</div>
        <div>100</div>
        <div>钻石 / 0</div>
      </div>
      <div class="box-data-row">
        <div>合计</div>
        <div>500</div>
        <div>260</div>
      </div>
      <div class="box-data-row">
        <div>一轮活动</div>
        <div>8000</div>
        <div></div>
        <div>4160</div>
      </div>
      <div class="box-data-row">
        <div>一轮活动实际所需积分是<el-text type="primary" tag="b">3840</el-text></div>
      </div>
    </div>
  </el-card>
</template>
<style scoped>

/* 整体容器样式 */
.box-data-container {
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
  line-height: 1.5;
}

/* 标题行样式 */
.box-data-header {
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

/* 数据行样式 */
.box-data-row {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
</style>
<script setup lang="ts">
</script>