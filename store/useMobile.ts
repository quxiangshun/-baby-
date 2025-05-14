import { defineStore } from "pinia";

interface IsMobileInterface {
    isMobile: boolean;
}

const useMobile = defineStore("mobile", {
    state: ():IsMobileInterface => {
        return {
            isMobile: false,
        };
    }
});

export default useMobile;