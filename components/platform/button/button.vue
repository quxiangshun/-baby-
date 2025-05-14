<template>
    <ClientOnly>
        <PcButton v-if="!mobileStore.isMobile">
            <slot/>
        </PcButton>
        <MobileButton v-else>
            <slot/>
        </MobileButton>
    </ClientOnly>
</template>

<script lang="ts" setup>
import useMobile from "@store/useMobile";
const mobileStore = useMobile();
</script>