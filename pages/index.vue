<template>
  <el-card class="card-bg-custom glass-scrollbar" style="height: calc(100vh - 60px);">
    <MusicalText />
  </el-card>
</template>

<script lang="ts" setup>
async function enableCustomLayout () {
        const a = await useFetch('/api/demo');
	    setPageLayout('custom')
        console.log(a);
	};
</script>