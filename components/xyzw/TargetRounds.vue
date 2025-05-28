<template>
  <el-card class="card-bg-custom">
    <template #header>
      <h2 class="text-lg font-bold text-dark mb-4 flex items-center">
        <span>目标轮次规划</span>
      </h2>
    </template>
    <el-row>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
      >
        <div class="mt-2">
          积分/轮：
        </div>
        <el-select v-model.number="pointsPerRound" class="w-full">
          <el-option value="3300">3300积分/轮</el-option>
          <el-option value="3340">3340积分/轮（宝箱周）</el-option>
          <el-option value="3400">3400积分/轮</el-option>
          <el-option value="3420">3420积分/轮</el-option>
          <el-option value="3500">3500积分/轮</el-option>
        </el-select>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
      >
        <div class="mt-2">
          目标轮次：
        </div>
        <el-input-number class="w-full" v-model="targetRounds">
          <template #prefix>
            <el-icon><Refresh /></el-icon>
          </template>
        </el-input-number>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
      >
        <div class="mt-2">
          当前积分：
        </div>
        <el-input-number class="w-full" v-model="targetCurrentPoints">
          <template #prefix>
            <el-icon><GoldMedal /></el-icon>
          </template>
        </el-input-number>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="4"
      >
        <div class="mt-2">
          &nbsp;
        </div>
        <el-button
          class="w-full"
          :disabled="isTargetCalculating"
          type="primary"
          @click="calculateTargetRounds"
        >
          计算
        </el-button>
      </el-col>
    </el-row>
    <div v-if="targetResultVisible" class="bg-light rounded-lg p-4">
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-600">目标轮次:</span>
          <span class="font-medium">{{ targetRounds }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">当前积分:</span>
          <span class="font-medium">{{ targetCurrentPoints.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">总积分需求:</span>
          <span class="font-medium">{{ totalPointsNeeded.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between text-warning">
          <span>还需积分:</span>
          <span class="font-bold">{{ pointsStillNeeded.toLocaleString() }}</span>
        </div>

        <div class="mt-3 pt-3 border-t border-gray-200">
          <p class="font-medium text-gray-700 mb-2">所需宝箱数量:</p>
          <div class="text-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center"><img :src="woodenBoxIcon" alt="木质宝箱" class="box-icon">木质宝箱:</div>
              <span class="font-medium">{{ woodenBoxesNeeded.toLocaleString() }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center"><img :src="bronzeBoxIcon" alt="青铜宝箱" class="box-icon">青铜宝箱:</div>
              <span class="font-medium">{{ bronzeBoxesNeeded.toLocaleString() }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center"><img :src="goldBoxIcon" alt="黄金宝箱" class="box-icon">黄金宝箱:</div>
              <span class="font-medium">{{ goldBoxesNeeded.toLocaleString() }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center"><img :src="platinumBoxIcon" alt="铂金宝箱" class="box-icon">铂金宝箱:</div>
              <span class="font-medium">{{ platinumBoxesNeeded.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-light rounded-lg p-4 text-center text-gray-500">
      设置目标轮次并计算
    </div>
  </el-card>
</template>
<script setup lang="ts">
import woodenBoxIcon from "~/assets/image/xyzw/wooden-box.png";
import bronzeBoxIcon from "~/assets/image/xyzw/bronze-box.png";
import goldBoxIcon from "~/assets/image/xyzw/gold-box.png";
import platinumBoxIcon from "~/assets/image/xyzw/platinum-box.png";
import { Refresh, GoldMedal } from '@element-plus/icons-vue';
import {computed, ref} from "vue";
const targetRounds = ref(4);
const targetCurrentPoints = ref(0);
const isTargetCalculating = ref(false);
const targetResultVisible = ref(false);
const pointsPerRound = ref(3400);

// 目标轮次计算相关
const totalPointsNeeded = computed(() => {
  return pointsPerRound.value * targetRounds.value;
});

const pointsStillNeeded = computed(() => {
  return Math.max(0, totalPointsNeeded.value - targetCurrentPoints.value);
});

const woodenBoxesNeeded = computed(() => {
  return pointsStillNeeded.value;
});

const bronzeBoxesNeeded = computed(() => {
  return Math.ceil(pointsStillNeeded.value / 10);
});

const goldBoxesNeeded = computed(() => {
  return Math.ceil(pointsStillNeeded.value / 20);
});

const platinumBoxesNeeded = computed(() => {
  return Math.ceil(pointsStillNeeded.value / 50);
});

// 计算目标轮次
const calculateTargetRounds = async () => {
  isTargetCalculating.value = true;

  // 模拟计算延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  // 显示目标结果
  targetResultVisible.value = true;

  isTargetCalculating.value = false;
};
</script>
<style scoped>
.box-icon {
  width: 2em !important;
  height: 2em !important;
}
.w-full {
  width: 100% !important;
}
</style>