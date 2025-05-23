<script setup>
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