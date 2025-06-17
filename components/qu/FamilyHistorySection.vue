<template>
  <section class="mb-12 bg-white p-4 md:p-8 rounded-xl shadow-lg">
    <h2 class="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-indigo-800">家族起源</h2>
    <div class="flex flex-col gap-4 md:gap-8">
      <!-- 家族起源卡片 -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6 rounded-lg">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="font-medium text-indigo-700">起源一：夏代屈骜</h4>
            <p class="text-gray-600 mt-2">夏代时有屈骜，曾经被夏王启讨伐，是最早的屈氏祖先。据《屈氏源流考》记载，此支后裔主要分布在陕西、甘肃一带。</p>
          </div>
          
          <div class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="font-medium text-indigo-700">起源二：商代屈氏</h4>
            <p class="text-gray-600 mt-2">商代甲骨文中有"屈"字记载，河南安阳殷墟出土的甲骨卜辞中多次出现"屈"作为地名和氏族名。</p>
          </div>
          
          <div class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="font-medium text-indigo-700">起源三：楚国屈瑕</h4>
            <p class="text-gray-600 mt-2">春秋时楚武王子瑕，封于屈地(今湖北秭归)，后代以封地为姓。此支为屈原直系祖先，后裔遍布湖南、湖北等地。</p>
          </div>
          
          <div class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="font-medium text-indigo-700">起源四：北魏改姓</h4>
            <p class="text-gray-600 mt-2">北魏孝文帝时，代北复姓屈男氏、屈突氏改为屈姓。此支后裔主要分布在山西、河北等北方地区。</p>
          </div>
          
          <div class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="font-medium text-indigo-700">起源五：唐代西域屈氏</h4>
            <p class="text-gray-600 mt-2">唐代西域地区有屈氏家族，据《新唐书》记载，西域疏勒国有屈姓官员，后随唐军内迁至长安。</p>
          </div>
          
          <div class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="font-medium text-indigo-700">起源六：宋代福建屈氏</h4>
            <p class="text-gray-600 mt-2">宋代福建地区出现屈氏家族，据《八闽通志》记载，南宋时由中原迁入，主要分布在福州、泉州等地。</p>
          </div>
          
          <div class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="font-medium text-indigo-700">起源七：明代军籍屈氏</h4>
            <p class="text-gray-600 mt-2">明代军籍制度下，部分屈氏家族被编入卫所，随军队驻防迁徙，形成新的支系分布。</p>
          </div>
          
          <div class="bg-white p-4 rounded-md shadow-sm">
            <h4 class="font-medium text-indigo-700">起源八：清代移民屈氏</h4>
            <p class="text-gray-600 mt-2">清代"湖广填四川"等移民运动中，湖南、湖北屈氏家族大量迁入四川、云南、贵州等地。</p>
          </div>
        </div>
        
        <el-link type="primary" class="mt-6" href="/qu/origin">
          查看详细家族起源
        </el-link>
      </div>
    </div>
    
    <!-- 郡望堂号 -->
    <div class="mt-6 md:mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 md:p-6 rounded-lg">
      <h3 class="text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center">
        <el-icon class="mr-2"><Trophy /></el-icon>
        郡望堂号
      </h3>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <div class="bg-white p-4 rounded-md shadow-sm">
          <h4 class="font-medium text-indigo-700">临潼堂</h4>
          <p class="text-gray-600 mt-2">陕西临潼屈氏家族堂号，以祖居地命名，主要分布在渭南地区。</p>
        </div>
        
        <div class="bg-white p-4 rounded-md shadow-sm">
          <h4 class="font-medium text-indigo-700">忠孝堂</h4>
          <p class="text-gray-600 mt-2">渭南屈氏分支堂号，源自明代屈氏家族忠孝传家的家风。</p>
        </div>
        
        <div class="bg-white p-4 rounded-md shadow-sm">
          <h4 class="font-medium text-indigo-700">三闾堂</h4>
          <p class="text-gray-600 mt-2">纪念屈原曾任楚国三闾大夫，主管昭、屈、景三姓事务。</p>
        </div>
        
        <div class="bg-white p-4 rounded-md shadow-sm">
          <h4 class="font-medium text-indigo-700">渭阳堂</h4>
          <p class="text-gray-600 mt-2">陕西渭南屈氏分支堂号，取自《诗经》"我送舅氏，曰至渭阳"。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import quyuan from "~/assets/image/qu/quyuan.png";
import qututong from "~/assets/image/qu/qututong.png";
import qudajun from "~/assets/image/qu/qudajun.png";

const timelineItems = ref([
  {
    time: '公元前340年',
    period: '战国时期',
    content: '屈原诞生，创作《离骚》、《天问》等不朽诗篇，后投汨罗江而死，端午节即源于此。',
    image: quyuan,
    link: '/persons/quyuan',
    tagType: 'success'
  },
  {
    time: '公元557年',
    period: '隋朝',
    content: '屈突通任左骑卫大将军，归唐后为李世民部将，消灭薛仁杲、平定王世充功第一。',
    image: qututong,
    tagType: 'warning'
  },
  {
    time: '公元1630年',
    period: '明末清初',
    content: '屈大均诞生，明末清初文学家，以继承屈原精神为己任，与陈恭尹、梁佩兰合称岭南三大家。',
    image: qudajun,
    tagType: ''
  }
])
</script>