<script setup>
import { onMounted } from 'vue';
import useMobile from "@/store/useMobile";
import { storeToRefs } from "pinia";

const mobileStore = useMobile();
const { activeIndex } = storeToRefs(mobileStore);

onMounted(() => {
  activeIndex.value = "21"
});
import JsonEditorVue from 'json-editor-vue'

const attrs = useAttrs()
const value = ref({})
</script>

<template>
  <JsonEditorVue
      v-model="value"
      v-bind="attrs"
      :options="{
        language: 'zh', // 设置语言为中文
      }"
  />
</template>