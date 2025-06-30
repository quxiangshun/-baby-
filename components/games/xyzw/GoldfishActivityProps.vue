<template>
  <div class="font-sans text-gray-800 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <header class="mb-8 text-center">
        <h1 class="text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-gray-800 mb-2">游戏道具数据</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">各种获取途径对应的道具数量和等级</p>
      </header>

      <!-- 响应式卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <!-- 动态生成类别卡片 -->
        <div v-for="category in categories" :key="category.id"
             class="rounded-xl shadow-md overflow-hidden card-hover">
          <!-- 卡片头部 -->
          <div :class="`p-4 bg-gradient-to-r from-${category.color} to-${category.color}/80 text-white`">
            <h2 class="text-xl font-bold flex items-center">
              {{ category.name }}
            </h2>
          </div>

          <!-- 表格头部（使用div） -->
          <div class="flex text-b font-semibold text-gray-700 border-b">
            <div class="w-1/2 p-3 border-r">数量</div>
            <div class="w-1/2 p-3">道具</div>
          </div>

          <!-- 表格内容（使用div） -->
          <div class="max-h-[600px] overflow-y-auto custom-scrollbar">
            <div v-for="(item, index) in allData" :key="index"
                 class="flex items-center border-b hover:bg-gray-50 transition-colors">
              <div class="w-1/2 p-3 border-r text-center font-medium">{{ item[category.id].count }}</div>
              <div class="w-1/2 p-3 text-center">
                <span
                    :class="getItemRarityClass(item[category.id].item)"
                    :style="{
                    backgroundColor: `rgba(var(--el-text-color-primary-rgb, 0, 0, 0), 0.3)`
                  }"
                >
                  {{ item[category.id].item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

// 定义分类数据
const categories = [
  { id: 'recruit', name: '招募', color: 'purple-500', icon: 'fa-users' },
  { id: 'treasure', name: '宝箱', color: 'purple-500', icon: 'fa-chest' },
  { id: 'fishing', name: '钓鱼', color: 'purple-500', icon: 'fa-fish' },
  { id: 'gold', name: '金砖', color: 'purple-500', icon: 'fa-gold' },
  { id: 'jar', name: '罐子', color: 'purple-500', icon: 'fa-trophy' }
];

// 定义所有数据
const allData = [
  { recruit: { count: 80, item: 8 }, treasure: { count: 2000, item: 4 }, fishing: { count: 25, item: 4 }, gold: { count: 10000, item: 3 }, jar: { count: 3, item: 1 } },
  { recruit: { count: 160, item: 16 }, treasure: { count: 4000, item: 8 }, fishing: { count: 50, item: 8 }, gold: { count: 20000, item: 6 }, jar: { count: 6, item: 2 } },
  { recruit: { count: 240, item: 24 }, treasure: { count: 6000, item: 12 }, fishing: { count: 75, item: 12 }, gold: { count: 30000, item: 9 }, jar: { count: 9, item: 3 } },
  { recruit: { count: 320, item: 32 }, treasure: { count: 8000, item: 16 }, fishing: { count: 125, item: 20 }, gold: { count: 40000, item: 12 }, jar: { count: 12, item: 4 } },
  { recruit: { count: 400, item: 40 }, treasure: { count: 10000, item: 20 }, fishing: { count: 175, item: 28 }, gold: { count: 50000, item: 15 }, jar: { count: 15, item: 5 } },
  { recruit: { count: 560, item: 56 }, treasure: { count: 14000, item: 28 }, fishing: { count: 225, item: 36 }, gold: { count: 70000, item: 21 }, jar: { count: 18, item: 6 } },
  { recruit: { count: 720, item: 72 }, treasure: { count: 18000, item: 36 }, fishing: { count: 300, item: 48 }, gold: { count: 90000, item: 27 }, jar: { count: 21, item: 7 } },
  { recruit: { count: 880, item: 88 }, treasure: { count: 22000, item: 44 }, fishing: { count: 375, item: 60 }, gold: { count: 110000, item: 33 }, jar: { count: 24, item: 8 } },
  { recruit: { count: 1040, item: 104 }, treasure: { count: 26000, item: 52 }, fishing: { count: 450, item: 72 }, gold: { count: 130000, item: 39 }, jar: { count: 27, item: 9 } },
  { recruit: { count: 1200, item: 120 }, treasure: { count: 30000, item: 60 }, fishing: { count: 525, item: 84 }, gold: { count: 150000, item: 45 }, jar: { count: 30, item: 10 } },
  { recruit: { count: 1440, item: 144 }, treasure: { count: 36000, item: 72 }, fishing: { count: 625, item: 100 }, gold: { count: 180000, item: 54 }, jar: { count: 33, item: 11 } },
  { recruit: { count: 1680, item: 168 }, treasure: { count: 42000, item: 84 }, fishing: { count: 725, item: 116 }, gold: { count: 210000, item: 63 }, jar: { count: 36, item: 12 } },
  { recruit: { count: 1920, item: 192 }, treasure: { count: 48000, item: 96 }, fishing: { count: 825, item: 132 }, gold: { count: 240000, item: 72 }, jar: { count: 39, item: 13 } },
  { recruit: { count: 2160, item: 216 }, treasure: { count: 54000, item: 108 }, fishing: { count: 925, item: 148 }, gold: { count: 270000, item: 81 }, jar: { count: 42, item: 14 } },
  { recruit: { count: 2400, item: 240 }, treasure: { count: 60000, item: 120 }, fishing: { count: 1050, item: 168 }, gold: { count: 300000, item: 90 }, jar: { count: 45, item: 15 } },
  { recruit: { count: 2720, item: 272 }, treasure: { count: 68000, item: 136 }, fishing: { count: 1175, item: 188 }, gold: { count: 340000, item: 102 }, jar: { count: 48, item: 16 } },
  { recruit: { count: 3040, item: 304 }, treasure: { count: 76000, item: 152 }, fishing: { count: 1300, item: 208 }, gold: { count: 380000, item: 114 }, jar: { count: 51, item: 17 } },
  { recruit: { count: 3360, item: 336 }, treasure: { count: 84000, item: 168 }, fishing: { count: 1450, item: 232 }, gold: { count: 420000, item: 126 }, jar: { count: 54, item: 18 } },
  { recruit: { count: 3680, item: 368 }, treasure: { count: 92000, item: 184 }, fishing: { count: 1600, item: 256 }, gold: { count: 460000, item: 138 }, jar: { count: 57, item: 19 } },
  { recruit: { count: 4000, item: 400 }, treasure: { count: 100000, item: 200 }, fishing: { count: 1750, item: 280 }, gold: { count: 500000, item: 150 }, jar: { count: 60, item: 20 } }
];

// 根据道具等级确定稀有度样式
const getItemRarityClass = (itemLevel: number) => {
  if (itemLevel >= 160) return 'px-3 py-1 rounded-full bg-red-500 text-white inline-block';
  if (itemLevel >= 80) return 'px-3 py-1 rounded-full bg-purple-500 text-white inline-block';
  if (itemLevel >= 40) return 'px-3 py-1 rounded-full bg-blue-500 text-white inline-block';
  if (itemLevel >= 20) return 'px-3 py-1 rounded-full bg-green-500 text-white inline-block';
  return 'px-3 py-1 rounded-full bg-gray-500 text-white inline-block';
};
</script>

<style scoped>
/* 自定义滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* 卡片悬停效果 */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>