<script setup>
import { ref } from 'vue'

// 当前时间+收入
const currentTime = new Date();
const year = ref(currentTime.getFullYear());
const month = ref(currentTime.getMonth() + 1);
const day = ref(currentTime.getDate());
const income = ref(0);

const consumeInfo = ref({
    card_id: '',
    amount: '',
    notes: ''
})
const clearChargeData = () => {
    consumeInfo.value = {
        card_id: '',
        amount: '',
        notes: ''
    }
}
clearChargeData();

// 充值
import { ElMessage } from 'element-plus'
import { consumeService, todayConsumeService } from '@/api/consume.js';
const updateConsume = async () => {

    if (consumeInfo.value.card_id === '') {
        ElMessage.error('请输入卡号！');
        return;
    }
    if (consumeInfo.value.amount === '') {
        ElMessage.error('请输入金额！');
        return;
    }
    // 调用接口
    let result = await consumeService(consumeInfo.value);
    console.log(result.data);

    ElMessage.success('消费成功，校园卡（卡号' + consumeInfo.value.card_id + '）余额为' + result.data + '元。');

    clearChargeData();
    showIncome();
}

// 显示当日收入
const showIncome = async () => {
    let params = {
        year: year.value,
        month: month.value,
        day: day.value
    }
    let result = await todayConsumeService(params);
    income.value = result.data;
}
showIncome();
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>{{ year }}年{{ month }}月{{ day }}日，今日已收入<strong>{{ income }}</strong>元。</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <el-form-item label="卡号" label-width="110px">
                        <el-input v-model="consumeInfo.card_id"></el-input>
                    </el-form-item>
                    <el-form-item label="消费金额" label-width="110px">
                        <el-input v-model="consumeInfo.amount" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="110px">
                        <el-input v-model="consumeInfo.notes" clearable></el-input>
                    </el-form-item>
                    <!-- 设置单选框，选择银行卡支付还是支付宝支付 -->

                    <el-form-item>
                        <el-button type="primary" @click="updateConsume">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>