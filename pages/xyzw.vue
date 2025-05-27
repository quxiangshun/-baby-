<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';

// 资源数据
const vipLevel = ref(0);
const recruitTickets = ref(0);
const treasureBoxPoints = ref(0);
const goldBricks = ref(0);
const fishingRods = ref(0);

// 评估结果
const currentStatus = reactive({
  maxGrade: "未达到任何档位",
  probability: "0%"
});

const nextGradeResourcesNeeded = reactive({});
const recommendations = ref([]);
const optimalStrategy = reactive({
  bestEvent: "宝箱周",
  optimalGrade: "不建议参与",
  probability: "0%",
  executionTime: "活动最后一天23点后",
  openingStrategy: "不建议参与"
});

// 定义不同VIP等级的资源需求调整系数
const vipResourceAdjustments = {
  0: { recruitTickets: 1.0, treasureBoxPoints: 1.0, goldBricks: 1.0, fishingRods: 1.0 },
  4: { recruitTickets: 1.0, treasureBoxPoints: 1.0, goldBricks: 1.0, fishingRods: 1.0 },
  7: { recruitTickets: 0.9, treasureBoxPoints: 0.9, goldBricks: 0.9, fishingRods: 0.8 },
  10: { recruitTickets: 0.8, treasureBoxPoints: 0.8, goldBricks: 0.8, fishingRods: 0.7 }
};

// 定义不同档位的金鱼获取概率和资源需求
const goldfishGrades = [
  { id: 1002, probability: 0.3, recruitTickets: 1000, treasureBoxPoints: 10000, goldBricks: 80000, fishingRods: 300 },
  { id: 1026, probability: 0.6, recruitTickets: 1500, treasureBoxPoints: 18000, goldBricks: 150000, fishingRods: 400 },
  { id: 1038, probability: 0.85, recruitTickets: 2000, treasureBoxPoints: 25000, goldBricks: 200000, fishingRods: 500 },
  { id: 1050, probability: 1.0, recruitTickets: 3000, treasureBoxPoints: 30000, goldBricks: 260000, fishingRods: 600 }
];

// 根据VIP等级调整资源需求
const adjustResourcesForVIP = () => {
  let adjustments = vipResourceAdjustments[0];

  // 找到最接近的VIP等级调整系数
  for (const level in vipResourceAdjustments) {
    if (vipLevel.value >= parseInt(level)) {
      adjustments = vipResourceAdjustments[level];
    }
  }

  // 应用调整系数
  const adjustedGrades = goldfishGrades.map(grade => ({
    ...grade,
    recruitTickets: Math.round(grade.recruitTickets * adjustments.recruitTickets),
    treasureBoxPoints: Math.round(grade.treasureBoxPoints * adjustments.treasureBoxPoints),
    goldBricks: Math.round(grade.goldBricks * adjustments.goldBricks),
    fishingRods: Math.round(grade.fishingRods * adjustments.fishingRods)
  }));

  return adjustedGrades;
};

// 计算当前资源可以达到的最高档位
const calculateMaxGrade = () => {
  const adjustedGrades = adjustResourcesForVIP();

  let maxGrade = null;
  for (const grade of adjustedGrades) {
    if (
        recruitTickets.value >= grade.recruitTickets &&
        treasureBoxPoints.value >= grade.treasureBoxPoints &&
        goldBricks.value >= grade.goldBricks &&
        fishingRods.value >= grade.fishingRods
    ) {
      maxGrade = grade;
    }
  }

  return maxGrade;
};

// 计算距离下一个档位还需要的资源
const calculateResourcesNeededForNextGrade = () => {
  const maxGrade = calculateMaxGrade();
  const adjustedGrades = adjustResourcesForVIP();
  const nextGradeIndex = adjustedGrades.findIndex(g => g.id === (maxGrade ? maxGrade.id : 0)) + 1;

  if (nextGradeIndex >= adjustedGrades.length) {
    return null; // 已经是最高档位
  }

  const nextGrade = adjustedGrades[nextGradeIndex];
  return {
    recruitTickets: Math.max(0, nextGrade.recruitTickets - recruitTickets.value),
    treasureBoxPoints: Math.max(0, nextGrade.treasureBoxPoints - treasureBoxPoints.value),
    goldBricks: Math.max(0, nextGrade.goldBricks - goldBricks.value),
    fishingRods: Math.max(0, nextGrade.fishingRods - fishingRods.value)
  };
};

// 分析当前资源状况并给出建议
const analyzeResources = () => {
  const maxGrade = calculateMaxGrade();
  const resourcesNeeded = calculateResourcesNeededForNextGrade();

  // 更新当前状态
  currentStatus.maxGrade = maxGrade ? maxGrade.id : "未达到任何档位";
  currentStatus.probability = maxGrade ? (maxGrade.probability * 100) + "%" : "0%";

  // 更新下一档位所需资源
  Object.assign(nextGradeResourcesNeeded, resourcesNeeded || {});

  // 重置建议
  recommendations.value = [];

  // 给出建议
  if (!maxGrade) {
    // 如果未达到任何档位，建议优先收集最缺的资源
    const scarcestResource = findScarcestResource();
    recommendations.value.push(
        `当前未达到任何金鱼获取档位，建议优先收集${scarcestResource.name}。`
    );
  } else if (maxGrade.id === 1050) {
    // 如果已经达到最高档位，建议等待最佳活动时机
    recommendations.value.push(
        `恭喜！您的资源已足够冲击1050档（100%概率获取金鱼）。`,
        `建议在"宝箱周"活动的最后一天23点后，按4的倍数开启道具，如1050个招募令/宝箱/鱼竿等。`
    );
  } else {
    // 如果达到了某个档位但不是最高，建议是否冲刺下一档位
    recommendations.value.push(
        `您当前可以冲击${maxGrade.id}档（${(maxGrade.probability * 100)}%概率获取金鱼）。`,
        `距离下一档位${goldfishGrades[goldfishGrades.indexOf(maxGrade) + 1].id}还需要：`,
        `- 招募令: ${resourcesNeeded.recruitTickets}`,
        `- 宝箱积分: ${resourcesNeeded.treasureBoxPoints}`,
        `- 金砖: ${resourcesNeeded.goldBricks}`,
        `- 金鱼竿: ${resourcesNeeded.fishingRods}`
    );

    // 计算各资源的完成百分比，给出优先级建议
    const scarcestResource = findScarcestResource(resourcesNeeded);
    recommendations.value.push(
        `建议优先收集${scarcestResource.name}，当前完成度最低（${Math.round(scarcestResource.percentage)}%）。`
    );
  }

  // 针对不同资源的具体收集建议
  if (recruitTickets.value < 3000) {
    recommendations.value.push(
        `招募令不足3000个，建议通过爬塔获取更多招募令，每过十层可获得额外招募令奖励。`
    );
  }

  if (treasureBoxPoints.value < 30000) {
    recommendations.value.push(
        `宝箱积分不足30000，建议每天购买黑市前两轮宝箱，并参与竞技场和黑市周活动。`
    );
  }

  if (goldBricks.value < 260000) {
    recommendations.value.push(
        `金砖不足26万，建议创建罐子号或使用云手机收菜来获取更多金砖。`
    );
  }

  if (fishingRods.value < 600) {
    recommendations.value.push(
        `金鱼竿不足600杆，建议在黑市购买打折金鱼竿，或购买江湖黑市中的鱼竿礼包。`
    );
  }
};

// 找出最稀缺的资源（完成度最低的）
const findScarcestResource = (resources = {
  recruitTickets: recruitTickets.value,
  treasureBoxPoints: treasureBoxPoints.value,
  goldBricks: goldBricks.value,
  fishingRods: fishingRods.value
}) => {
  const resourceNames = {
    recruitTickets: "招募令",
    treasureBoxPoints: "宝箱积分",
    goldBricks: "金砖",
    fishingRods: "金鱼竿"
  };

  let scarcest = null;
  let minPercentage = Infinity;

  for (const resource in resources) {
    if (resourceNames[resource]) {
      const maxGrade = calculateMaxGrade() || { id: 0 };
      const nextGradeIndex = goldfishGrades.findIndex(g => g.id === (maxGrade ? maxGrade.id : 0)) + 1;
      const nextGrade = nextGradeIndex < goldfishGrades.length ? goldfishGrades[nextGradeIndex] : null;

      if (nextGrade) {
        const needed = nextGrade[resource] - resources[resource];
        const totalNeeded = nextGrade[resource];
        const percentage = (resources[resource] / totalNeeded) * 100;

        if (percentage < minPercentage) {
          minPercentage = percentage;
          scarcest = { name: resourceNames[resource], resource, percentage };
        }
      }
    }
  }

  return scarcest;
};

/**
 * 获取最佳活动参与策略
 */
const getOptimalEventStrategy = () => {
  const maxGrade = calculateMaxGrade();

  let strategy = {
    bestEvent: "宝箱周",
    optimalGrade: maxGrade ? maxGrade.id : "不建议参与",
    probability: maxGrade ? (maxGrade.probability * 100) + "%" : "0%",
    executionTime: "活动最后一天23点后",
    openingStrategy: maxGrade ? `按4的倍数开启道具（如${maxGrade.id}个）` : "不建议参与",
    recommendations: []
  };

  if (!maxGrade) {
    strategy.recommendations = [
      "当前资源不足，建议先积累资源再参与活动。",
      "优先收集招募令、宝箱积分、金砖和金鱼竿。"
    ];
  } else {
    strategy.recommendations = [
      `建议选择"宝箱周"活动，可提高30%的宝箱积分产出效率。`,
      `活动最后一天23点后，按4的倍数开启道具（如${maxGrade.id}个），触发保底机制。`,
      `避开"招募周"，其招募令消耗效率较低。`
    ];
  }

  // 更新最优策略
  Object.assign(optimalStrategy, strategy);
};

// 计算并更新所有策略和建议
const calculateStrategy = () => {
  analyzeResources();
  getOptimalEventStrategy();
};

// 初始化
onMounted(() => {
  // 默认计算一次
  calculateStrategy();
});
</script>

<template>
  <el-card class="card-bg-custom glass-scrollbar" style="height: calc(100vh - 60px);overflow-y: auto">
    <!-- 主要内容 -->
      <!-- 介绍部分 -->
      <section class="mb-12 text-center">
        <h2 class="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-dark mb-4">优化你的金鱼获取策略</h2>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          通过我们的算法评估，根据你的招募令、宝箱积分、金砖和金鱼竿数量，
          提供最佳的金鱼获取方案，最大化你的资源利用效率。
        </p>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 资源输入表单 -->
        <section id="calculator" class="lg:col-span-1">
          <div class="bg-white rounded-xl p-6 shadow-lg card-shadow transition-all duration-300 hover:shadow-xl">
            <h3 class="text-xl font-bold text-dark mb-6 flex items-center">
              <i class="fa fa-calculator text-primary mr-2"></i>
              资源输入
            </h3>

            <form @submit.prevent="calculateStrategy" class="space-y-4">
              <div class="space-y-2">
                <label for="vipLevel" class="block text-sm font-medium text-gray-700">VIP等级</label>
                <select v-model.number="vipLevel" id="vipLevel" class="w-full rounded-lg border-gray-300 shadow-sm input-focus py-2 px-3 border">
                  <option value="0">VIP 0</option>
                  <option value="1">VIP 1</option>
                  <option value="2">VIP 2</option>
                  <option value="3">VIP 3</option>
                  <option value="4">VIP 4</option>
                  <option value="5">VIP 5</option>
                  <option value="6">VIP 6</option>
                  <option value="7">VIP 7</option>
                  <option value="8">VIP 8</option>
                  <option value="9">VIP 9</option>
                  <option value="10">VIP 10</option>
                </select>
              </div>

              <div class="space-y-2">
                <label for="recruitTickets" class="block text-sm font-medium text-gray-700">
                  <i class="fa fa-ticket text-primary mr-1"></i> 招募令数量
                </label>
                <input
                    type="number"
                    v-model.number="recruitTickets"
                    id="recruitTickets"
                    class="w-full rounded-lg border-gray-300 shadow-sm input-focus py-2 px-3 border"
                    placeholder="输入招募令数量"
                >
              </div>

              <div class="space-y-2">
                <label for="treasureBoxPoints" class="block text-sm font-medium text-gray-700">
                  <i class="fa fa-cube text-primary mr-1"></i> 宝箱积分
                </label>
                <input
                    type="number"
                    v-model.number="treasureBoxPoints"
                    id="treasureBoxPoints"
                    class="w-full rounded-lg border-gray-300 shadow-sm input-focus py-2 px-3 border"
                    placeholder="输入宝箱积分"
                >
              </div>

              <div class="space-y-2">
                <label for="goldBricks" class="block text-sm font-medium text-gray-700">
                  <i class="fa fa-gold text-primary mr-1"></i> 金砖数量
                </label>
                <input
                    type="number"
                    v-model.number="goldBricks"
                    id="goldBricks"
                    class="w-full rounded-lg border-gray-300 shadow-sm input-focus py-2 px-3 border"
                    placeholder="输入金砖数量"
                >
              </div>

              <div class="space-y-2">
                <label for="fishingRods" class="block text-sm font-medium text-gray-700">
                  <i class="fa fa-fishing-rod text-primary mr-1"></i> 金鱼竿数量
                </label>
                <input
                    type="number"
                    v-model.number="fishingRods"
                    id="fishingRods"
                    class="w-full rounded-lg border-gray-300 shadow-sm input-focus py-2 px-3 border"
                    placeholder="输入金鱼竿数量"
                >
              </div>

              <button type="submit" class="btn-primary w-full flex items-center justify-center">
                <i class="fa fa-magic mr-2"></i> 计算最佳策略
              </button>
            </form>
          </div>
        </section>

        <!-- 评估结果 -->
        <section class="lg:col-span-2 space-y-8">
          <!-- 当前资源状态 -->
          <div class="bg-white rounded-xl p-6 shadow-lg card-shadow transition-all duration-300 hover:shadow-xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-light rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-medium text-gray-700">当前可冲击档位</h4>
                  <span class="text-xl font-bold text-primary">{{ currentStatus.maxGrade }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div class="bg-primary h-2.5 rounded-full" :style="{ width: currentStatus.probability }"></div>
                </div>
                <p class="text-sm text-gray-500 mt-1">获取金鱼概率: {{ currentStatus.probability }}</p>
              </div>

              <div class="bg-light rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-medium text-gray-700">推荐活动</h4>
                  <span class="text-xl font-bold text-secondary">{{ optimalStrategy.bestEvent }}</span>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <div class="text-center">
                    <p class="text-sm text-gray-500">推荐档位</p>
                    <p class="font-bold text-dark">{{ optimalStrategy.optimalGrade }}</p>
                  </div>
                  <div class="text-center">
                    <p class="text-sm text-gray-500">成功概率</p>
                    <p class="font-bold text-dark">{{ optimalStrategy.probability }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 策略建议 -->
          <div class="bg-white rounded-xl p-6 shadow-lg card-shadow transition-all duration-300 hover:shadow-xl">
            <h3 class="text-xl font-bold text-dark mb-6 flex items-center">
              <i class="fa fa-lightbulb-o text-primary mr-2"></i>
              策略建议
            </h3>

            <div class="space-y-4">
              <div class="bg-light rounded-lg p-4 border-l-4 border-primary">
                <h4 class="font-bold text-dark mb-2">总体建议</h4>
                <ul class="space-y-2">
                  <li v-for="(rec, index) in recommendations" :key="index" class="flex items-start">
                    <i class="fa fa-check-circle text-primary mt-1 mr-2"></i>
                    <span>{{ rec }}</span>
                  </li>
                </ul>
              </div>

              <div class="bg-light rounded-lg p-4 border-l-4 border-secondary">
                <h4 class="font-bold text-dark mb-2">最佳活动策略</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-500">活动选择</p>
                    <p class="font-bold text-dark">{{ optimalStrategy.bestEvent }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">执行时间</p>
                    <p class="font-bold text-dark">{{ optimalStrategy.executionTime }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">推荐档位</p>
                    <p class="font-bold text-dark">{{ optimalStrategy.optimalGrade }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">开启策略</p>
                    <p class="font-bold text-dark">{{ optimalStrategy.openingStrategy }}</p>
                  </div>
                </div>
              </div>

              <div v-if="nextGradeResourcesNeeded" class="bg-light rounded-lg p-4 border-l-4 border-accent">
                <h4 class="font-bold text-dark mb-2">下一档位所需资源</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex justify-between">
                    <span>招募令</span>
                    <span class="font-medium">{{ nextGradeResourcesNeeded.recruitTickets || 0 }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>宝箱积分</span>
                    <span class="font-medium">{{ nextGradeResourcesNeeded.treasureBoxPoints || 0 }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>金砖</span>
                    <span class="font-medium">{{ nextGradeResourcesNeeded.goldBricks || 0 }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>金鱼竿</span>
                    <span class="font-medium">{{ nextGradeResourcesNeeded.fishingRods || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 策略指南 -->
      <section id="strategy" class="mt-12">
        <div class="bg-white rounded-xl p-6 shadow-lg card-shadow transition-all duration-300 hover:shadow-xl">
          <h3 class="text-xl font-bold text-dark mb-6 flex items-center">
            <i class="fa fa-book text-primary mr-2"></i>
            金鱼获取策略指南
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-4 bg-light rounded-lg">
              <h4 class="font-bold text-dark mb-3 flex items-center">
                <i class="fa fa-trophy text-primary mr-2"></i>
                档位说明
              </h4>
              <ul class="space-y-2">
                <li class="flex justify-between">
                  <span>1002档</span>
                  <span class="font-medium">30% 概率获得金鱼</span>
                </li>
                <li class="flex justify-between">
                  <span>1026档</span>
                  <span class="font-medium">60% 概率获得金鱼</span>
                </li>
                <li class="flex justify-between">
                  <span>1038档</span>
                  <span class="font-medium">85% 概率获得金鱼</span>
                </li>
                <li class="flex justify-between">
                  <span>1050档</span>
                  <span class="font-medium">100% 概率获得金鱼</span>
                </li>
              </ul>
            </div>

            <div class="p-4 bg-light rounded-lg">
              <h4 class="font-bold text-dark mb-3 flex items-center">
                <i class="fa fa-calendar-check-o text-primary mr-2"></i>
                活动选择
              </h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <i class="fa fa-check text-secondary mt-1 mr-2"></i>
                  <span>首选"宝箱周"，宝箱积分产出效率提高30%</span>
                </li>
                <li class="flex items-start">
                  <i class="fa fa-times text-red-500 mt-1 mr-2"></i>
                  <span>避开"招募周"，招募令消耗效率低</span>
                </li>
                <li class="flex items-start">
                  <i class="fa fa-clock-o text-primary mt-1 mr-2"></i>
                  <span>活动最后一天23点后集中开启道具</span>
                </li>
              </ul>
            </div>

            <div class="p-4 bg-light rounded-lg">
              <h4 class="font-bold text-dark mb-3 flex items-center">
                <i class="fa fa-tasks text-primary mr-2"></i>
                资源收集建议
              </h4>
              <ul class="space-y-2">
                <li class="flex items-start">
                  <i class="fa fa-ticket text-primary mt-1 mr-2"></i>
                  <span>招募令：主要通过爬塔获取</span>
                </li>
                <li class="flex items-start">
                  <i class="fa fa-cube text-primary mt-1 mr-2"></i>
                  <span>宝箱积分：购买黑市宝箱、参与竞技场</span>
                </li>
                <li class="flex items-start">
                  <i class="fa fa-gold text-primary mt-1 mr-2"></i>
                  <span>金砖：创建罐子号、云手机收菜</span>
                </li>
                <li class="flex items-start">
                  <i class="fa fa-fishing-rod text-primary mt-1 mr-2"></i>
                  <span>金鱼竿：黑市购买、江湖黑市礼包</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  </el-card>
</template>
<style type="text/tailwindcss">
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
  .card-shadow {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  }
}
</style>

<style>

/* 导入字体 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

/* 动画效果 */
.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* 直接使用CSS变量定义样式，而不是使用@apply */
.btn-primary {
  background-color: var(--el-color-primary);
  color: white;
  font-weight: medium;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
}

.btn-primary:hover {
  background-color: rgba(255, 149, 0, 0.9);
  transform: scale(1.05);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 149, 0, 0.5);
}

.input-focus:focus {
  box-shadow: 0 0 0 2px rgba(255, 149, 0, 0.5);
  border-color: var(--primary);
}
</style>
