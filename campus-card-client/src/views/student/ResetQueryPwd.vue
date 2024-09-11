<script setup>
import { ref } from 'vue'

const queryPwdInfo = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})


// 修改查询密码
import { ElMessage } from 'element-plus'
import { queryPwdUpdateService } from '@/api/card.js';
import useCardInfoStore from '@/stores/cardInfo.js'
const CardInfoStore = useCardInfoStore();
const updateQueryPwd = async () => {
    if (CardInfoStore.cardInfo.state === '1') {
        ElMessage.error('挂失状态，无法操作！');
        return;
    }
    if (CardInfoStore.cardInfo.state === '2') {
        ElMessage.error('卡已注销，无法操作！');
        return;
    }

    if (queryPwdInfo.old_pwd === '') {
        ElMessage.error('请输入原查询密码！');
        return;
    }
    if (queryPwdInfo.new_pwd === '') {
        ElMessage.error('请输入新查询密码！');
        return;
    }
    if (queryPwdInfo.new_pwd !== queryPwdInfo.re_pwd) {
        ElMessage.error('新查询密码两次输入不一致！');
        return;
    }
    // 调用接口    
    let result = await queryPwdUpdateService(queryPwdInfo.value);
    ElMessage.success(result.msg ? result.msg : '查询密码修改成功！');
    clearQueryPwdInfo();
}
const clearQueryPwdInfo = () => {
    queryPwd.value = {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
    }
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置查询密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <el-form-item label="原查询密码" label-width="150px">
                        <el-input type="password" v-model="queryPwdInfo.old_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="新查询密码" label-width="150px">
                        <el-input type="password" v-model="queryPwdInfo.new_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入新查询密码" label-width="150px">
                        <el-input type="password" v-model="queryPwdInfo.re_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateQueryPwd">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>