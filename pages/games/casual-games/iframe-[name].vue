<template>
  <div class="game-detail-container">
    <div class="back-button" @click="goBack">
      <i class="fa fa-arrow-left"></i> 返回游戏列表
    </div>
    <div class="game-frame-container">
      <iframe
          :src="game.href"
          class="game-frame"
          title="游戏页面"
          sandbox="allow-same-origin allow-scripts allow-popups"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {combinedList} from "~/components/games/games";

const route = useRoute()
const router = useRouter()

const game = ref({});

const goBack = () => {
  router.back()
}

const loading = ref(false);
const error = ref("");
onMounted(() => {
  try {
    // 获取路由参数
    const param = route.params.name;
    if (!param) {
      error.value = "未获取到有效参数";
      return;
    }
    loading.value = true;
    game.value = combinedList.find(item => item.enName === param);
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = "发生未知错误";
    }
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.game-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  cursor: pointer;
  margin-bottom: 20px;
  color: #333;
  display: inline-flex;
  align-items: center;
}

.back-button i {
  margin-right: 5px;
}

.game-title {
  margin-bottom: 20px;
  text-align: center;
}

.game-frame-container {
  margin-top: 20px;
}

.game-frame {
  width: 100%;
  height: 80vh; /* 使用视口高度 */
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
</style>