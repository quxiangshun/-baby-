<template>
  <div v-if="isGamesRootPage" class="game-list-container">
    <h1 class="title">小游戏中心</h1>

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

<script setup>
import { useRouter } from 'vue-router'
import {combinedList} from "~/components/games/games";
const route = useRoute() // 获取当前路由对象
const router = useRouter()
// 计算属性：判断是否为主页（路径为 '/'）
const isGamesRootPage = computed(() => {
  return route.path === '/games'
})
const navigateToGame = (game) => {
  router.push(`/games/iframe-${game.enName}`)
}
</script>

<style scoped>
.game-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  color: #333;
}

.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.game-item {
  padding: 10px 15px;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.game-item:hover {
  background-color: #e0e0e0;
}
</style>