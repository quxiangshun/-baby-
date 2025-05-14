<template>
    <ClientOnly>
        <PcNav v-if="!mobileStore.isMobile">
            <slot/>
        </PcNav>
        <MobileNav v-else>
            <slot/>
        </MobileNav>
    </ClientOnly>
</template>

<script lang="ts" setup>
import useMobile from "@store/useMobile";
const mobileStore = useMobile();
</script>