<template>
    <ClientOnly>
        <PcBanner v-if="!mobileStore.isMobile">
            <slot/>
        </PcBanner>
        <MobileBanner v-else>
            <slot/>
        </MobileBanner>
    </ClientOnly>
</template>

<script lang="ts" setup>
import useMobile from "@store/useMobile";
const mobileStore = useMobile();
</script>