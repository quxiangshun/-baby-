<template>
  <div class="phrase-practice">
    <h1>英语短语学习</h1>
    
    <div class="daily-section">
      <h2>每日学习短语</h2>
      <div class="date-picker">
        <label>选择月份:</label>
        <el-date-picker
          v-model="selectedMonth"
          type="month"
          placeholder="选择月份"
          format="YYYY年MM月"
          value-format="YYYY-MM"
        />
      </div>
      
      <div class="daily-phrases" v-if="Object.keys(groupedPhrases).length > 0">
        <h3>{{ formattedDate }} 的短语</h3>
        <div v-for="(phrases, date) in groupedPhrases" :key="date" class="daily-group">
          <h4>{{ new Date(date).toLocaleDateString('zh-CN') }}</h4>
          <div class="phrase-grid">
            <div v-for="(phrase, index) in phrases" :key="index" class="phrase-item">
              {{ phrase.phrase }} - {{ phrase.meaning }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { dailyPhrasesData } from '@/components/tools/english/phrase';

const selectedMonth = ref(new Date().toISOString().slice(0, 7));
const formattedDate = computed(() => {
  return `${selectedMonth.value}月`;
});

const groupedPhrases = computed(() => {
  const result = {};
  for (const date in dailyPhrasesData) {
    if (date.startsWith(selectedMonth.value)) {
      result[date] = dailyPhrasesData[date];
    }
  }
  return result;
});
</script>

<style scoped>
.phrase-practice {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.daily-section {
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
}

.date-picker {
  margin-bottom: 15px;
}

.date-picker label {
  margin-right: 10px;
}

.daily-phrases .daily-group {
  margin-bottom: 20px;
}

.daily-phrases .daily-group h4 {
  color: #666;
  margin: 10px 0 5px;
}

.phrase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.phrase-item {
  padding: 2px;
  background: #f5f5f5;
  border-radius: 1px;
}
</style>