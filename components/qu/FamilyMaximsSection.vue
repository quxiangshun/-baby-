<template>
  <section class="bg-purple-50 p-8 rounded-xl">
    <h2 class="text-3xl font-bold mb-8 text-purple-800 border-b-2 border-purple-200 pb-4">家族家训</h2>
    <div class="max-w-4xl mx-auto">
      <div 
        v-for="(maxim, index) in maxims" 
        :key="index"
        class="bg-white p-6 mb-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        <div class="flex items-start">
          <div class="bg-purple-100 text-purple-800 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
            <span class="font-bold">{{ index + 1 }}</span>
          </div>
          <div>
            <h3 class="text-xl font-bold text-purple-700">{{ maxim.title }}</h3>
            <p class="text-gray-600 mt-2 leading-relaxed">{{ maxim.content }}</p>
            
            <el-collapse v-model="maxim.activeNames" class="mt-4">
              <el-collapse-item title="历史典故" name="1">
                <p class="text-gray-500 text-sm pl-4">{{ maxim.story }}</p>
              </el-collapse-item>
              <el-collapse-item title="现代意义" name="2">
                <p class="text-gray-500 text-sm pl-4">{{ maxim.modernMeaning }}</p>
              </el-collapse-item>
            </el-collapse>
            
            <div class="mt-4 flex flex-wrap gap-2">
              <el-tag 
                v-for="(tag, tagIdx) in maxim.tags" 
                :key="tagIdx"
                :type="tag.type" 
                size="small" 
                effect="plain">
                {{ tag.text }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const maxims = ref([
  {
    title: '忠孝传家',
    content: '忠孝为立身之本，上事君国，下孝父母，中悌兄弟，外信朋友',
    story: '屈原以身殉国，体现了对国家的忠诚；屈氏家族历代都有孝子贤孙的记载...',
    modernMeaning: '在现代社会，忠可以理解为对事业和职责的忠诚，孝则是对长辈的尊重和关爱...',
    tags: [
      { text: '核心价值观', type: 'success' },
      { text: '传统美德', type: '' }
    ],
    activeNames: []
  },
  // 添加更多家训
])
</script>