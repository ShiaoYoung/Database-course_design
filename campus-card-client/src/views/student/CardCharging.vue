<script setup>
import { ref } from 'vue'
import useCardInfoStore from '@/stores/cardInfo.js'
const CardInfoStore = useCardInfoStore();
const chargeInfo = ref({
    card_id: '',
    amount: '',
    notes: '',
    query_pwd: ''
})
const clearChargeData = () => {
    chargeInfo.value = {
        card_id: '',
        amount: '',
        notes: '',
        query_pwd: ''
    }
    chargeInfo.value.card_id = CardInfoStore.cardInfo.card_id
}
clearChargeData();

// 充值
import { ElMessage } from 'element-plus'
import { chargeService, cardInfoService } from '@/api/card.js';
const updateCharge = async () => {    
    if (CardInfoStore.cardInfo.state === '1') {
        ElMessage.error('挂失状态，无法充值！');
        return;
    }
    if (CardInfoStore.cardInfo.state === '2') {
        ElMessage.error('卡已注销，无法充值！');
        return;
    }
    
    if (chargeInfo.amount === '') {
        ElMessage.error('请输入金额！');
        return;
    }
    if (chargeInfo.query_pwd === '') {
        ElMessage.error('请输入查询密码！');
        return;
    }
    // 调用接口
    let result = await chargeService(chargeInfo.value);
    // ElMessage.success(result.msg ? result.msg : '充值成功');

    clearChargeData();

    // 刷新
    // location.reload(true);
    result = await cardInfoService();
    console.log(result.data);
    
    CardInfoStore.cardInfo.balance = result.data.balance;
}



</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>充值&nbsp;&nbsp;<el-text class="mx-1" type="danger" size="small">*目前仅支持支付宝支付。</el-text></span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <el-form-item label="卡号" label-width="110px">
                        <el-input v-model="chargeInfo.card_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="充值金额" label-width="110px">
                        <el-input type="number" v-model="chargeInfo.amount" clearable></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="查询密码" label-width="110px">
                        <el-input type="password" v-model="chargeInfo.query_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="110px">
                        <el-input v-model="chargeInfo.notes" clearable></el-input>
                    </el-form-item> -->
                    <!-- 设置单选框，选择银行卡支付还是支付宝支付 -->

                    <el-form-item>
                        <el-button type="primary" @click="updateCharge">充值</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>