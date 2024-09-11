<script setup>
import { ref } from 'vue'

// 当前时间
const currentTime = new Date();
const month = ref(currentTime.getMonth() + 1);

// 结算状态
const isSettled = ref(false);
// 结算
import { ElMessage, ElMessageBox } from 'element-plus'
import { settleService, checkSettledService } from '@/api/bill.js';
const applyForSettle = async () => {
    let params = {
        month: month.value,
    }

    // 提示用户确认框
    ElMessageBox.confirm(
        '每个月仅能申请结算一次，您确认要申请结算吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let result = await settleService(params);
            ElMessage.success('结算成功！');
            // 刷新列表
            check();
        })
        .catch(() => {
            // ElMessage({
            //     type: 'info',
            //     message: '取消了退出登录！',
            // })
        })
}
// 查看结算状态
const check = async () => {
    let params = {
        month: month.value,
    }
    // 调用接口
    let result = await checkSettledService(params);
    if (result.data === 1) {
        isSettled.value = true;
    }
    else {
        isSettled.value = false;
    }
}
check();

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>申请结算&nbsp;&nbsp;<el-text class="mx-1" type="danger"
                        size="small">*每月最后一天自动结算，每月仅能申请结算一次。</el-text></span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <!-- <el-form-item label="卡号" label-width="110px">
                        <el-input v-model="chargeInfo.card_id" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="充值金额" label-width="110px">
                        <el-input type="number" v-model="chargeInfo.amount" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="查询密码" label-width="110px">
                        <el-input type="password" v-model="chargeInfo.query_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="备注" label-width="110px">
                        <el-input v-model="chargeInfo.notes" clearable></el-input>
                    </el-form-item> -->
                    <!-- 设置单选框，选择银行卡支付还是支付宝支付 -->

                    <el-form-item>
                        <el-button v-if="isSettled === false" type="primary" @click="applyForSettle">申请结算</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="isSettled === true" type="primary" @click="applyForSettle"
                            disabled>申请结算</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>

<style>
.red-word {

    text-emphasis-color: red;
}
</style>