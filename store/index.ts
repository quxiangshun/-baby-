import { defineStore } from "pinia";

interface StoreInterface {
    stroe: boolean;
}

const useStroe = defineStore("mobile", {
    state: ():StoreInterface => {
        return {
            stroe: true,
        };
    },
    actions: {
        updateMobile:()=>{
            return {
                stroe: false
            };
        },
        fetchHomeData:async ()=> {

        },
    },
    getters: {
       stroes: state => state.stroe,
    }
});

export default useStroe;