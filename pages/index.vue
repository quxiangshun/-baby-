<template>
    <MusicalText />
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