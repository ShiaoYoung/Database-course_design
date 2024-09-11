<script setup>
import { ref } from 'vue'

const queryPwd = ref({
    query_pwd: ''
});


// 挂失
import { ElMessage } from 'element-plus'
import { cardLockService } from '@/api/card.js';
import useCardInfoStore from '@/stores/cardInfo.js'
const CardInfoStore = useCardInfoStore();
const cardLost = async () => {
    if (CardInfoStore.cardInfo.state === '1') {
        ElMessage.error('已是挂失状态，无法操作！');
        return;
    }
    if (CardInfoStore.cardInfo.state === '2') {
        ElMessage.error('卡已注销，无法操作！');
        return;
    }
    if (queryPwd.value === '') {
        ElMessage.error('请输入查询密码！');
        return;
    }
    // 调用接口    
    let result = await cardLockService(queryPwd.value);
    ElMessage.success(result.msg ? result.msg : '挂失成功！');

    // 更新卡状态
    CardInfoStore.cardInfo.state = '1';
    clearQueryPwd();

    // 刷新
    location.reload(true);
}
const clearQueryPwd = () => {
    queryPwd.value = {
        query_pwd: ''
    }
}
</script>

<template>
<el-card class="page-container">
        <template #header>
            <div class="header">
                <span>校园卡挂失</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <el-form-item label="请输入查询密码" label-width="150px">
                        <el-input type="password" v-model="queryPwd.query_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="cardLost">申请挂失</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>