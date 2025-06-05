<script setup lang="ts">
// 所有导入语句必须放在顶部
import { useRouter, useRoute } from 'vue-router';
import { combinedList } from "~/components/games/games";

const route = useRoute(); // 获取当前路由对象
const router = useRouter();
// 计算属性：判断是否为主页（路径为 '/'）
const isGamesRootPage = computed(() => {
  return route.path === '/games/casual-games'
})
const navigateToGame = (game) => {
  router.push(`/games/casual-games/iframe-${game.enName}`)
}
</script>

<template>
  <div v-if="isGamesRootPage" class="game-list-container">
    <div class="game-list">
      <div
          v-for="game in combinedList"
          :key="game.href"
          class="game-item"
          @click="navigateToGame(game)"
      >
        {{ game.name }}
      </div>
    </div>
  </div>
  <NuxtPage/>
</template>

<style scoped>
.game-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.game-item {
  padding: 2px 5px;
  background-color: RGB(255, 255, 255, 0.3) !important;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.game-item:hover {
  background-color: RGB(255, 255, 255, 0.9) !important;
}
</style>