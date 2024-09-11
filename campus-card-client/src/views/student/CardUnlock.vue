<script setup>
import { ref } from 'vue'

const queryPwd = ref({
    query_pwd: ''
});


// 挂失
import { ElMessage } from 'element-plus'
import { cardUnlockService } from '@/api/card.js';
import useCardInfoStore from '@/stores/cardInfo.js'
const CardInfoStore = useCardInfoStore();
const cardUnlock = async () => {
    if (CardInfoStore.cardInfo.state === '0') {
        ElMessage.error('卡未挂失，无需解锁！');
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
    let result = await cardUnlockService(queryPwd.value);
    ElMessage.success(result.msg ? result.msg : '解锁成功！');

    // 更新卡状态
    CardInfoStore.cardInfo.state = '0';
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
                <span>校园卡解锁</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <el-form-item label="请输入查询密码" label-width="150px">
                        <el-input type="password" v-model="queryPwd.query_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="cardUnlock">申请解锁</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>