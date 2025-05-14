<template>
    <HomeBanner />
    <!-- <van-button type="primary" @click="showToast('toast')">button</van-button> -->
    <!-- <el-button type="primary">button</el-button> -->
    <!-- <Button @click="enableCustomLayout">button</Button> -->
</template>

<script lang="ts" setup>
    async function enableCustomLayout () {
        const a = await useFetch('/api/demo');
	    setPageLayout('custom')
        console.log(a);
	}
	// definePageMeta({
	//     layout: false,
	// });
</script>