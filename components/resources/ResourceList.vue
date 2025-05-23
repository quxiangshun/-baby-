<template>
  <div class="table-container">
    <div
        v-for="(row, rowIndex) in processedData"
        :key="rowIndex"
        class="table-row"
    >
      <div v-for="(item, colIndex) in row" :key="colIndex" class="table-cell">
        <el-link :href="item.href" target="_blank">{{ item.name }}</el-link>
      </div>
      <!-- 补充不足一行的数据 -->
      <div
          v-for="i in 4 - row.length"
          v-if="rowIndex === processedData.length - 1 && row.length < 4"
          :key="'empty-' + i"
          class="table-cell"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface RecordProps {
  data: any[];
}

const props = defineProps<RecordProps>();
const processedData = computed(() => {
  const result = [];
  if (props.data) {
    for (let i = 0; i < props.data.length; i += 4) {
      result.push(props.data.slice(i, i + 4));
    }
  }
  return result;
});
</script>

<style scoped>
.table-container {
  border: double;
}

.table-row {
  display: flex;
  border-bottom: solid 1px;
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  border-right: solid 1px;
  padding: 2px;
  flex-basis: 25%;
  flex-grow: 0;
}

.table-cell:last-child {
  border-right: none;
}
</style>
