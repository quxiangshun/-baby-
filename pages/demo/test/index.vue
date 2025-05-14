//demo>test>index.vue
<template>
   <NuxtLayout name="custom">
      <template #header>重写布局</template>
      demo测试页
    </NuxtLayout>
</template>
<script lang="ts" setup>
   const route = useRoute()
   console.log(route.meta.title)
</script>