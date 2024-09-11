<script setup>
import { ref } from 'vue'

const pwdInfo = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})


// 修改个人信息
import { ElMessage } from 'element-plus'
import { userPwdUpdateService } from '@/api/user.js';
import { useRouter } from 'vue-router';
const router = useRouter();
const updatePwd = async () => {
    if (pwdInfo.value.old_pwd === '') {
        ElMessage.error('请输入原密码！');
        return;
    }
    if (pwdInfo.value.new_pwd === '') {
        ElMessage.error('请输入新密码！');
        return;
    }
    if (pwdInfo.value.new_pwd !== pwdInfo.value.re_pwd) {
        ElMessage.error('新密码两次输入不一致！');
        return;
    }
    // 调用接口    
    let result = await userPwdUpdateService(pwdInfo.value);
    ElMessage.success(result.msg ? result.msg : '修改成功！请重新登录！');
    
    // 跳回登录页面
    router.push('/login');

}
</script>

<template>
<el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置密码</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <el-form-item label="原密码" label-width="110px">
                        <el-input type="password" v-model="pwdInfo.old_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" label-width="110px">
                        <el-input type="password" v-model="pwdInfo.new_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="再次输入新密码" label-width="110px">
                        <el-input type="password" v-model="pwdInfo.re_pwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePwd">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>