<script setup>
import { ref } from 'vue'
import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();

// 导入身份
import useIdentityStore from '@/stores/identity.js'
const IdentityStore = useIdentityStore();
const identity = ref(IdentityStore.identity);

console.log(userInfoStore.info);

const userInfo = ref({ ...userInfoStore.info })

console.log(userInfo.value);


// 修改个人信息
import { ElMessage } from 'element-plus'
import { userInfoUpdateService } from '@/api/user.js';
const updateUserInfo = async () => {
    if (identity.value === '商家') {
        if (userInfo.value.username === '') {
            ElMessage.error('商家名称不能为空！');
            return;
        }
        if (userInfo.value.username === '') {
            ElMessage.error('商家名称不能为空！');
            return;
        }
    }
    
    if (identity.value === '学生') {
        if (userInfo.value.num === '') {
            ElMessage.error('学号不能为空！');
            return;
        }
        if (userInfo.value.name === '') {
            ElMessage.error('姓名不能为空！');
            return;
        }
        if (userInfo.value.department === '') {
            ElMessage.error('学院不能为空！');
            return;
        }
    }
    // 调用接口    
    let result = await userInfoUpdateService(userInfo.value, identity.value);
    ElMessage.success(result.msg ? result.msg : '修改成功！');


    // 更新pinia中的信息
    userInfoStore.setInfo(userInfo.value);
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12" v-if="identity == '商家'">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <el-form-item label="用户名">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="商家名称">
                        <el-input v-model="userInfo.store_name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="userInfo.phone" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="userInfo.address" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12" v-if="identity == '学生'">
                <el-form :model="userInfo" label-width="100px" size="large">
                    <el-form-item label="用户名">
                        <el-input v-model="userInfo.username" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                        <el-input v-model="userInfo.num" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="userInfo.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="学院">
                        <el-input v-model="userInfo.department" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="userInfo.gender" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input v-model="userInfo.phone" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateUserInfo">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>