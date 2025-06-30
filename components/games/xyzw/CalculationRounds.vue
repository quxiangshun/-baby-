<template>
  <el-card class="card-bg-custom">

    <!-- 计算器主体 -->
    <main class="rounded-xl p-6 calculator-shadow mb-8">
      <!-- 宝箱输入区域 -->
      <div class="space-y-4">
        <h2 class="text-lg font-bold text-dark mb-4 flex items-center">
          输入宝箱数量
        </h2>
        <el-row>
          <el-col
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              :xl="4"
          >
            <div class="mt-5">
              <el-text type="info" size="small">木质宝箱（1积分/个）：</el-text>
            </div>
            <el-input-number class="w-full" v-model="woodenBox">
              <template #prefix>
                <img :src="woodenBoxIcon" alt="木箱" class="box-icon">
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
            <div class="mt-5">
              <el-text type="info" size="small">青铜宝箱（10积分/个）：</el-text>
            </div>
            <el-input-number class="w-full" v-model="bronzeBox">
              <template #prefix>
                <img :src="bronzeBoxIcon" alt="铜箱" class="box-icon">
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
            <div class="mt-5">
              <el-text type="info" size="small">黄金宝箱（20积分/个）：</el-text>
            </div>
            <el-input-number class="w-full" v-model="goldBox">
              <template #prefix>
                <img :src="goldBoxIcon" alt="金箱" class="box-icon">
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
            <div class="mt-5">
              <el-text type="info" size="small">铂金宝箱（50积分/个）：</el-text>
            </div>
            <el-input-number class="w-full" v-model="platinumBox">
              <template #prefix>
                <img :src="platinumBoxIcon" alt="铂箱" class="box-icon">
              </template>
            </el-input-number>
          </el-col>
        </el-row>
      </div>

      <!-- 设置选项 -->
      <div class="mt-6 space-y-4">
        <h2 class="text-lg font-bold text-dark mb-4 flex items-center">
          <i class="fa fa-sliders text-primary mr-2"></i>
          计算设置
        </h2>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">积分/轮</label>
          <select v-model.number="pointsPerRound" class="w-full px-3 py-2 border border-gray-300 rounded-lg">
            <option value="3300">3300积分/轮</option>
            <option value="3340" selected>3340积分/轮（宝箱周）</option>
            <option value="3400">3400积分/轮</option>
            <option value="3420">3420积分/轮</option>
            <option value="3500">3500积分/轮</option>
          </select>
        </div>
      </div>

      <!-- 计算按钮 -->
      <div class="mt-6">
        <el-button type="primary" @click="calculateAndDisplayResults" :disabled="isCalculating" style="width: 100%">
          计算轮次
        </el-button>
      </div>
    </main>

    <!-- 总积分和轮次 -->
    <div class="rounded-xl p-6 calculator-shadow">
      <h2 class="text-lg font-bold text-dark mb-4 flex items-center">
        <i class="fa fa-trophy text-secondary mr-2"></i>
        计算结果
      </h2>

      <div class="grid grid-cols-2 gap-4">
        <div class="bg-light rounded-lg p-4 text-center">
          <div class="text-3xl font-bold text-primary mb-1">{{ totalPoints }}</div>
          <p class="text-gray-600 text-sm">总积分</p>
        </div>

        <div class="bg-light rounded-lg p-4 text-center">
          <div class="text-3xl font-bold text-secondary mb-1">{{ totalRounds }}</div>
          <p class="text-gray-600 text-sm">可完成轮次</p>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="mt-4">
        <div class="flex justify-between text-sm mb-1">
          <span class="text-gray-600">下一轮进度</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <el-progress
              :percentage="progressPercentage"
              striped
              striped-flow
              :duration="10"
          />
        </div>
        <div class="flex justify-between text-xs mt-1 text-gray-500">
          <span>{{ currentPointsText }}</span>
          <span>{{ nextRoundPointsText }}</span>
        </div>
      </div>
    </div>

    <!-- 轮次详情 -->
    <div class="rounded-xl p-6 calculator-shadow">
      <h2 class="text-lg font-bold text-dark mb-4 flex items-center">
        <i class="fa fa-list-ol text-primary mr-2"></i>
        轮次详情
      </h2>

      <div v-if="roundDetails.length === 0" class="space-y-3">
        <div class="bg-light rounded-lg p-3 text-center text-gray-500">
          <i class="fa fa-info-circle mr-1"></i>
          积分不足，无法完成任何轮次
        </div>
      </div>

      <div v-else class="space-y-3">
        <div v-for="(round, index) in roundDetails" :key="round.round"
             :class="index === roundDetails.length - 1 ? 'bg-secondary/10 rounded-lg p-3' : 'rounded-lg p-3'">
          <div class="flex justify-between">
            <span class="font-medium">第{{ round.round }}轮</span>
            <span class="text-xs text-gray-500">
              {{ index === roundDetails.length - 1 ? '当前轮次' : '已完成' }}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-1 mt-1 text-sm">
            <div>消耗积分: <span class="font-medium">{{ round.pointsUsed.toLocaleString() }}</span></div>
            <div>剩余积分: <span class="font-medium">{{ round.remainingPoints.toLocaleString() }}</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 资源详情 -->
    <div class="rounded-xl p-6 calculator-shadow">
      <h2 class="text-lg font-bold text-dark mb-4 flex items-center">
        <i class="fa fa-cube text-primary mr-2"></i>
        资源详情
      </h2>

      <div v-if="woodenPoints + bronzePoints + goldPoints + platinumPoints === 0" class="space-y-3">
        <div class="bg-light rounded-lg p-3 text-center text-gray-500">
          <i class="fa fa-info-circle mr-1"></i>
          请点击"计算轮次"按钮查看详情
        </div>
      </div>

      <div v-else class="space-y-3">
        <div class="grid grid-cols-2 gap-2">
          <div class="rounded-lg p-3">
            <div class="text-sm text-gray-600">木箱子</div>
            <div class="text-lg font-bold text-primary">{{ woodenPoints.toLocaleString() }} 积分</div>
          </div>
          <div class="rounded-lg p-3">
            <div class="text-sm text-gray-600">青铜箱</div>
            <div class="text-lg font-bold text-primary">{{ bronzePoints.toLocaleString() }} 积分</div>
          </div>
          <div class="rounded-lg p-3">
            <div class="text-sm text-gray-600">黄金箱</div>
            <div class="text-lg font-bold text-primary">{{ goldPoints.toLocaleString() }} 积分</div>
          </div>
          <div class="rounded-lg p-3">
            <div class="text-sm text-gray-600">铂金箱</div>
            <div class="text-lg font-bold text-primary">{{ platinumPoints.toLocaleString() }} 积分</div>
          </div>
        </div>
        <div class="mt-3 bg-light rounded-lg p-3 text-sm">
          <div class="flex justify-between">
            <span>总积分组成:</span>
            <span class="font-medium">{{ totalPoints.toLocaleString() }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div class="bg-gradient-to-r from-green-400 via-yellow-400 to-blue-500 h-2 rounded-full" style="width: 100%"></div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import woodenBoxIcon from "assets/image/xyzw/wooden-box.png";
import bronzeBoxIcon from "assets/image/xyzw/bronze-box.png";
import goldBoxIcon from "assets/image/xyzw/gold-box.png";
import platinumBoxIcon from "assets/image/xyzw/platinum-box.png";
// 状态管理
const woodenBox = ref(0);
const bronzeBox = ref(0);
const goldBox = ref(0);
const platinumBox = ref(0);
const pointsPerRound = ref(3400);
const isCalculating = ref(false);

// 计算各类宝箱积分
const woodenPoints = computed(() => woodenBox.value * 1);
const bronzePoints = computed(() => bronzeBox.value * 10);
const goldPoints = computed(() => goldBox.value * 20);
const platinumPoints = computed(() => platinumBox.value * 50);

// 计算总积分
const totalPoints = computed(() => {
  return woodenPoints.value + bronzePoints.value + goldPoints.value + platinumPoints.value;
});

// 计算可完成轮次
const totalRounds = computed(() => {
  return Math.floor(totalPoints.value / pointsPerRound.value);
});

// 计算剩余积分
const remainingPoints = computed(() => {
  return totalPoints.value % pointsPerRound.value;
});

// 生成轮次详情
const roundDetails = computed(() => {
  const details = [];
  let cumulativePoints = 0;

  for (let i = 1; i <= totalRounds.value; i++) {
    const pointsUsed = pointsPerRound.value;
    cumulativePoints += pointsUsed;
    details.push({
      round: i,
      pointsUsed: pointsUsed,
      remainingPoints: (i === totalRounds.value) ? remainingPoints.value : (totalPoints.value - cumulativePoints)
    });
  }

  return details;
});

// 计算进度条相关数据
const nextRoundPoints = computed(() => {
  return (totalRounds.value + 1) * pointsPerRound.value;
});

const progressPercentage = computed(() => {
  return Math.floor(Math.min(100, (totalPoints.value / nextRoundPoints.value) * 100));
});

const currentPointsText = computed(() => {
  return `当前: ${totalPoints.value.toLocaleString()}`;
});

const nextRoundPointsText = computed(() => {
  return `下一轮: ${nextRoundPoints.value.toLocaleString()}`;
});


// 计算并显示结果
const calculateAndDisplayResults = async () => {
  isCalculating.value = true;

  // 模拟计算延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  isCalculating.value = false;
};


// 初始计算
onMounted(() => {
  calculateAndDisplayResults();
});

// 监听输入变化，自动计算
watch([woodenBox, bronzeBox, goldBox, platinumBox, pointsPerRound, pointsPerRound], () => {
  calculateAndDisplayResults();
});
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
}
input, select {
  @apply border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300;
}
.calculator-shadow {
  box-shadow: 0 10px 25px -5px rgba(255, 107, 53, 0.1), 0 8px 10px -6px rgba(255, 107, 53, 0.1);
}

.box-icon {
  width: 2em !important;
  height: 2em !important;
}
.w-full {
  width: 100% !important;
}
</style>
