<script setup>
import { ref } from 'vue'

const queryPwd = ref({
    query_pwd: ''
});


// 注销
import { ElMessage, ElMessageBox } from 'element-plus'
import { cardDeleteService } from '@/api/card.js';
import useCardInfoStore from '@/stores/cardInfo.js'
const CardInfoStore = useCardInfoStore();
const cardLost = async () => {
    if (CardInfoStore.cardInfo.state === '1') {
        ElMessage.error('挂失状态，无法操作！');
        return;
    }
    if (CardInfoStore.cardInfo.state === '2') {
        ElMessage.error('卡已注销，无法操作！');
        return;
    }
    confirmAndDelete();
}

const confirmAndDelete = () => {
    // 提示用户确认框
    ElMessageBox.confirm(
        '您的校园卡还有余额' + CardInfoStore.cardInfo.balance + '元，您确认要注销吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            // 调用接口
            let result = await cardDeleteService(queryPwd.value);
            ElMessage.success(result.msg ? result.msg : '注销成功！');
            // 更新卡状态
            CardInfoStore.cardInfo.state = '2';
            clearQueryPwd();
            // 刷新
            location.reload(true);
        })
        .catch(() => {
                // ElMessage({
                //     type: 'info',
                //     message: '取消了退出登录！',
                // })
            })
}
// 提示输入查询密码
const notifyPwd = () => {
    ElMessage.error('请输入查询密码！');
    return;
}

const clearQueryPwd = () => {
    queryPwd.value = {
        query_pwd: ''
    }
}
clearQueryPwd();
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>校园卡注销</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <el-form-item label="请输入查询密码" label-width="150px">
                        <el-input type="password" v-model="queryPwd.query_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                            @click="queryPwd.query_pwd ? cardLost() : notifyPwd()">申请注销</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>