import { defineStore } from "pinia";

interface IsMobileInterface {
    isMobile: boolean;
}

const useMobile = defineStore("mobile", {
    state: ():{ isMobile: boolean; showDrawer: boolean } => {
        return {
            isMobile: false,
            showDrawer: false
        };
    }
});

export default useMobile;