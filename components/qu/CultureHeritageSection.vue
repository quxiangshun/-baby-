<template>
  <section class="mb-12 bg-green-50 p-8 rounded-xl">
    <h2 class="text-3xl font-bold mb-8 text-green-800 border-b-2 border-green-200 pb-4">文化传承</h2>
    <el-tabs type="card" class="custom-tabs" v-model="activeTab">
      <el-tab-pane label="文学艺术" name="literature">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <el-card 
            v-for="item in literatureArts" 
            :key="item.title"
            shadow="hover"
            class="hover:shadow-lg transition-all duration-300">
            <template #header>
              <div class="flex items-center">
                <el-icon><Notebook /></el-icon>
                <span class="ml-2">{{ item.title }}</span>
              </div>
            </template>
            <p class="text-gray-600 mb-2">{{ item.description }}</p>
            <el-tag 
              v-for="(work, idx) in item.works" 
              :key="idx"
              type="success" 
              size="small" 
              class="mr-2 mb-2">
              {{ work }}
            </el-tag>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="教育传统" name="education">
        <!-- 教育内容 -->
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script setup>
const activeTab = ref('literature')
const literatureArts = ref([
  {
    title: '诗词创作',
    description: '屈氏家族在诗词创作方面有着悠久传统，从屈原开始就奠定了家族文学基础...',
    works: ['楚辞体', '五言诗', '七言律诗']
  },
  // 添加更多文学艺术分类
])
</script>

<style scoped>
.custom-tabs {
  @apply shadow-none;
}
:deep(.el-tabs__item.is-active) {
  @apply text-green-700;
}
:deep(.el-tabs__item:hover) {
  @apply text-green-600;
}
</style>