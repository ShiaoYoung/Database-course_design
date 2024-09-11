import { defineStore } from 'pinia'
import { ref } from 'vue'

const useIdentityStore = defineStore('identity', () => {
    //定义状态相关的内容
    const identity = ref({});

    const setIdentity = (newIdentity) => {
        identity.value = newIdentity;
    }

    const removeIdentity = () => {
        identity.value = {}
    }

    return {identity, setIdentity, removeIdentity};

}, {persist:true})

export default useIdentityStore;