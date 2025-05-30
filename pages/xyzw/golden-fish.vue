<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import {useHead} from "#app";

// 使用useHead配置头部
useHead({
  // 基础元信息
  title: "咸鱼之王 | 栾媛",
  htmlAttrs: {
    lang: "zh-CN", // 设置语言属性（必填）
    dir: "ltr", // 文字方向（默认左到右）
  },
  meta: [
    // 视口设置（保留原始配置）
    {
      hid: "viewport",
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0",
    },
    // 关键词优化（合并重复项，使用英文逗号分隔）
    {
      hid: "keywords",
      name: "keywords",
      content: "咸鱼之王,咸鱼之王宝箱计算器,咸鱼之王金鱼计算器,咸鱼宝箱计算,咸鱼金鱼计算,咸鱼资讯",
    },
    // 描述优化（突出服务价值，控制在160字符内）
    {
      hid: "description",
      name: "description",
      content: "老baby·二爷-咸鱼之王提供提供宝箱、金鱼等计算，以及咸鱼之王相关资讯",
    },
    // 其他SEO标签（可选）
    { name: "author", content: "屈想顺" },
    { name: "robots", content: "index, follow" }, // 搜索引擎抓取策略
    { httpEquiv: "Cache-Control", content: "no-cache, no-store, must-revalidate" }, // 缓存控制
  ],
  link: [
    // Favicon（建议使用静态资源路径，假设/favicon.ico位于public目录）
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico", // 保持原路径结构或调整至public
    }
  ],
  script: [
    // 百度统计（异步加载，避免阻塞渲染）
    {
      src: "https://hm.baidu.com/hm.js?1d6c34c1bc067f5746a5fca18d1c24ab",
      async: true,
      type: "text/javascript",
    },
    // Google Analytics（使用gtag.js，建议通过Nuxt插件配置）
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-TP0T64WC2D",
      async: true,
      body: true, // 插入到body底部
      onload: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "G-TP0T64WC2D");`,
    },
    // 广告脚本（异步加载）
    {
      src: "https://cdn.wwads.cn/js/makemoney.js",
      async: true,
      type: "text/javascript",
    },
  ],
});

// 资源数据与宝箱积分配置
const vipLevel = ref(0);
const recruitTickets = ref(0);
const goldBricks = ref(0);
const fishingRods = ref(0);

// 宝箱相关响应式数据
const boxes = reactive({
  wooden: 0,
  copper: 0,
  gold: 0,
  platinum: 0
});

// 优化后的宝箱积分配置（木1/铜10/金20/铂50）
const BOX_POINTS = {
  wooden: 1,
  copper: 10,
  gold: 20,
  platinum: 50
};

// 计算属性：总宝箱积分
const totalBoxPoints = computed(() =>
    Object.entries(boxes).reduce((acc, [key, count]) =>
        acc + (count * BOX_POINTS[key as keyof typeof BOX_POINTS]), 0)
);

// 评估状态
const assessment = reactive({
  currentGrade: "未达标",
  successRate: 0,
  nextGradeNeeds: {} as Record<string, number>,
  optimalStrategy: {
    event: "宝箱周",
    timing: "活动最后一天23点后",
    tip: ""
  }
});

// VIP资源调整系数（新增VIP11-15支持）
const vipAdjustments = {
  0: { rt: 1, tbp: 1, gb: 1, fr: 1 },
  7: { rt: 0.9, tbp: 0.9, gb: 0.9, fr: 0.8 },
  10: { rt: 0.8, tbp: 0.8, gb: 0.8, fr: 0.7 },
  15: { rt: 0.5, tbp: 0.55, gb: 0.5, fr: 0.4 }
};

// 金鱼档位配置（动态概率计算）
const goldfishTiers = [
  { id: 1002, baseRate: 0.3, needs: { rt: 1000, tbp: 10000, gb: 80000, fr: 300 } },
  { id: 1026, baseRate: 0.6, needs: { rt: 1500, tbp: 18000, gb: 150000, fr: 400 } },
  { id: 1038, baseRate: 0.85, needs: { rt: 2000, tbp: 25000, gb: 200000, fr: 500 } },
  { id: 1050, baseRate: 1, needs: { rt: 3000, tbp: 30000, gb: 260000, fr: 600 } }
];

// 核心计算逻辑
const calculateStrategy = () => {
  // 获取VIP调整系数
  const getAdjustment = () => {
    const levels = Object.keys(vipAdjustments).map(Number).sort((a, b) => b - a);
    return vipAdjustments[levels.find(l => vipLevel.value >= l) || 0];
  };

  // 计算调整后需求
  const adjustedTiers = goldfishTiers.map(tier => ({
    ...tier,
    needs: Object.entries(tier.needs).reduce((acc, [k, v]) => {
      const adjustment = getAdjustment();
      acc[k] = Math.round(v * adjustment[k as keyof typeof adjustment]);
      return acc;
    }, {} as Record<string, number>)
  }));

  // 确定当前档位
  const currentTier = adjustedTiers.find(tier =>
      [recruitTickets.value, totalBoxPoints.value, goldBricks.value, fishingRods.value].every(
          (res, i) => res >= Object.values(tier.needs)[i]
      )
  );

  // 计算下一档位需求
  const nextTierIndex = adjustedTiers.findIndex(t => t === currentTier) + 1;
  const nextTier = adjustedTiers[nextTierIndex];

  // 更新评估状态
  assessment.currentGrade = currentTier ? `档位${currentTier.id}` : "未达标";
  assessment.successRate = currentTier ? currentTier.baseRate * 100 : 0;
  assessment.nextGradeNeeds = nextTier ? {
    rt: Math.max(0, nextTier.needs.rt - recruitTickets.value),
    tbp: Math.max(0, nextTier.needs.tbp - totalBoxPoints.value),
    gb: Math.max(0, nextTier.needs.gb - goldBricks.value),
    fr: Math.max(0, nextTier.needs.fr - fishingRods.value)
  } : {};

  // 生成策略建议
  assessment.optimalStrategy.tip = currentTier ?
      `建议按${currentTier.id % 100}倍数开启道具` :
      "优先积累基础资源，推荐参与宝箱周活动";
};

// 生命周期钩子
onMounted(() => {
  calculateStrategy();
});

// 暴露给模板的计算属性
const boxPointsDetail = computed(() => ({
  wooden: boxes.wooden * BOX_POINTS.wooden,
  copper: boxes.copper * BOX_POINTS.copper,
  gold: boxes.gold * BOX_POINTS.gold,
  platinum: boxes.platinum * BOX_POINTS.platinum
}));
</script>

<template>
  <div class="container mx-auto p-4">
    <GoldfishActivityProps />
    <!-- 资源输入区 -->
    <!-- 资源输入区 -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-medium mb-2">资源配置</h3>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label>VIP等级</label>
            <select v-model.number="vipLevel" class="w-full border p-1">
              <option v-for="n in 15" :key="n" :value="n-1">VIP {{ n-1 }}</option>
            </select>
          </div>
          <div>
            <label>招募令</label>
            <input v-model.number="recruitTickets" type="number" class="w-full border p-1">
          </div>
          <div>
            <label>金砖</label>
            <input v-model.number="goldBricks" type="number" class="w-full border p-1">
          </div>
          <div>
            <label>金鱼竿</label>
            <input v-model.number="fishingRods" type="number" class="w-full border p-1">
          </div>
        </div>
      </div>

      <!-- 宝箱输入 -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-medium mb-2">宝箱库存</h3>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="(value, key) in boxes" :key="key">
            <label>{{ key }}箱子</label>
            <input
                v-model.number="boxes[key]"
                type="number"
                class="w-full border p-1"
                :placeholder="`${BOX_POINTS[key]}积分/个`"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- 评估结果 -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- 当前状态 -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-medium mb-4">当前状态</h3>
        <div class="flex justify-between mb-2">
          <span>当前档位</span>
          <strong>{{ assessment.currentGrade }}</strong>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
              class="h-2 rounded-full bg-blue-500"
              :style="{ width: assessment.successRate + '%' }"
          ></div>
        </div>
        <p>成功率：{{ assessment.successRate.toFixed(0) }}%</p>
      </div>

      <!-- 宝箱积分明细 -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-medium mb-4">积分明细</h3>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="(value, key) in boxPointsDetail" :key="key">
            <p class="text-sm">{{ key }}积分</p>
            <p class="font-medium">{{ value }}</p>
          </div>
        </div>
        <p class="mt-2">总积分：{{ totalBoxPoints }}</p>
      </div>

      <!-- 策略建议 -->
      <div class="bg-white rounded-lg shadow p-4">
        <h3 class="text-lg font-medium mb-4">策略建议</h3>
        <p>推荐活动：{{ assessment.optimalStrategy.event }}</p>
        <p>最佳时机：{{ assessment.optimalStrategy.timing }}</p>
        <p class="mt-2">{{ assessment.optimalStrategy.tip }}</p>
      </div>
    </section>

    <!-- 下一档位需求 -->
    <section v-if="assessment.nextGradeNeeds" class="mt-8">
      <h3 class="text-lg font-medium mb-4">下一档位需求</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="(value, key) in assessment.nextGradeNeeds" :key="key" class="bg-white rounded-lg shadow p-2">
          <p class="text-sm">{{ key }}</p>
          <p class="font-medium">{{ value }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
input, select {
  @apply border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300;
}
</style>