import { defineStore } from 'pinia'
import { ref } from 'vue'

const useCardInfoStore = defineStore('cardInfo', () => {
    //定义状态相关的内容
    const cardInfo = ref({});

    const setCardInfo = (newCardInfo) => {
        cardInfo.value = newCardInfo;
    }

    const removeCardInfo = () => {
        cardInfo.value = {}
    }

    return {cardInfo, setCardInfo, removeCardInfo};

}, {persist:true})

export default useCardInfoStore;