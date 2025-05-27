<template>
    <ClientOnly>
        <PcFooter v-if="!mobileStore.isMobile">
            <slot/>
        </PcFooter>
        <MobileFooter v-else>
            <slot/>
        </MobileFooter>
    </ClientOnly>
</template>

<script lang="ts" setup>
import useMobile from "@store/useMobile";
const mobileStore = useMobile();
</script>