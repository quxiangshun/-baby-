<template>
    <ClientOnly>
        <PcContainer v-if="!mobileStore.isMobile">
            <slot/>
        </PcContainer>
        <MobileContainer v-else>
            <slot/>
        </MobileContainer>
    </ClientOnly>
</template>

<script lang="ts" setup>
import useMobile from "@store/useMobile";
const mobileStore = useMobile();
</script>