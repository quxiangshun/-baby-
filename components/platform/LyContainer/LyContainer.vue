<template>
    <ClientOnly>
        <PcContainer v-if="!mobileStore.isMobile">
            <slot/>
        </PcContainer>
        <MobileContainer v-else>
            <slot/>
        </MobileContainer>
        <el-backtop :right="100" :bottom="100" />
    </ClientOnly>
</template>

<script lang="ts" setup>
import useMobile from "@store/useMobile";
const mobileStore = useMobile();
</script>