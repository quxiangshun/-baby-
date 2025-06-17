<template>
  <section class="mb-12 bg-amber-50 p-8 rounded-xl">
    <h2 class="text-3xl font-bold mb-8 text-amber-800 border-b-2 border-amber-200 pb-4">历史名人</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="person in persons" 
        :key="person.name"
        class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div class="relative">
            <el-image
                v-if="person.image"
                class="w-full h-64 object-cover"
                style="width: 100px; height: 100px"
                :src="person.image"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="[person.image]"
                show-progress
                :initial-index="4"
                fit="cover"
            />
            <span class="absolute top-2 right-2 px-2 py-1 bg-amber-500 text-white text-xs rounded-full">
              {{ person.dynasty }}
            </span>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-amber-700">{{ person.name }}</h3>
            <p class="text-gray-600 mt-2 line-clamp-3">{{ person.description }}</p>
            <div class="mt-4 flex justify-between items-center">
              <el-rate v-model="person.importance" disabled show-score />
              <el-button type="warning" size="small" @click="showPersonDetail(person)">详情</el-button>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script setup>
import quyuan from "~/assets/image/qu/quyuan.png";
import qututong from "~/assets/image/qu/qututong.png";
import qudajun from "~/assets/image/qu/qudajun.png";
const persons = ref([
  {
    name: '屈骜',
    dynasty: '夏商周',
    description: '夏代屈氏始祖，最早见于《左传》记载，被夏王启讨伐，是屈氏最早的祖先。',
    image: '',
    importance: 4,
    works: []
  },
  {
    name: '屈瑕',
    dynasty: '夏商周',
    description: '春秋时楚武王子，封于屈地(今湖北秭归)，后代以封地为姓，开创楚国屈氏家族。',
    image: '',
    importance: 4,
    works: []
  },
  {
    name: '屈原',
    dynasty: '战国时期',
    description: '伟大的爱国诗人，楚辞的代表作家，代表作《离骚》《九歌》《天问》等，被誉为"中国浪漫主义文学的奠基人"。',
    image: quyuan,
    importance: 5,
    works: ['离骚', '九歌', '天问']
  },
  {
    name: '屈突通',
    dynasty: '唐代',
    description: '北魏改姓屈氏后裔，唐代著名将领，参与平定安史之乱，功勋卓著。',
    image: qututong,
    importance: 4,
    works: []
  },
  {
    name: '屈大均',
    dynasty: '清代',
    description: '明末清初著名学者、诗人，广东岭南屈氏代表人物，著有《广东新语》等著作。',
    image: qudajun,
    importance: 4,
    works: ['广东新语']
  }
])
</script>