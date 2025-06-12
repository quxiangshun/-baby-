import { defineStore } from "pinia";

interface IsMobileInterface {
    isMobile: boolean;
    showDrawer: boolean;
    activeIndex: string;
}

const useMobile = defineStore("mobile", {
    state: (): IsMobileInterface => {
        return {
            isMobile: false,
            showDrawer: false,
            activeIndex: "1"
        };
    }
});

export default useMobile;