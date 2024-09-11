<script setup>
import { User, Lock, House, LocationFilled, UserFilled, Key } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
const router = useRouter();
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

//身份：商家|学生
const identify = ref('')

//数据模型--->用户数据
const registerData = ref({
    username: '',
    password: '',
    rePassword: '',
})
//数据模型--->商家数据
const storeData = ref({
    store_name: '',
    address: '',
})
//数据模型--->学生数据
const studentData = ref({
    num: '',
    name: '',
    gender: '',
    department: '',
})

// 校验密码的函数
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码！'))
    }
    else if (value !== registerData.value.password) {
        callback(new Error('两次密码输入不一致！'))
    }
    else {
        callback()
    }
}

// 定义表单校验规则
const rules = {
    username: [
        { required: true, message: '请输入用户名！', trigger: 'blur' },
        { min: 5, max: 16, message: '请输入5~16位用户名！', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码！', trigger: 'blur' },
        { min: 5, max: 16, message: '请输入5~16位密码！', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}


// 用于清空数据模型的数据
const clearRegisterData = () => {
    registerData.value = {
        username: '',
        password: '',
        rePassword: ''
    };
    identify.value = ''
}

// 注册
import { userRegisterService, userLoginService } from '@/api/user.js'
const register = async () => {
    // 判断是否输入用户名、密码
    if (registerData.value.username === '' || registerData.value.password === '') {
        ElMessage.error('用户名或密码不能为空！');
        return;
    }
    if (registerData.value.rePassword === '') {
        ElMessage.error('请再次输入密码！');
        return;
    }
    if (registerData.value.rePassword !== registerData.value.password) {
        ElMessage.error('两次密码输入不一致！');
        return;
    }

    // 判断是否选择用户类型
    if (identify === '') {
        ElMessage.error('请选择用户类型！');
        return;
    }

    // 调用接口
    let result;
    if (identify.value === '商家') {
        result = await userRegisterService(registerData.value, identify.value, storeData.value);
        ElMessage.success(result.msg ? result.msg : '注册成功！请返回登录！');
        // 返回登录页面
        clearRegisterData();
        isRegister = !isRegister;
    } else if (identify.value === '学生') {
        result = await userRegisterService(registerData.value, identify.value, studentData.value);
        ElMessage.success(result.msg ? result.msg : '注册成功！请返回登录！');
        // 返回登录页面
        clearRegisterData();
        isRegister = !isRegister;
    } else {
        ElMessage.error('用户类型选择错误！');
        return;
    }
}

// 登录
import { cardInfoService } from '@/api/card.js';
import { useTokenStore } from '@/stores/token.js'
import useIdentityStore from '@/stores/identity.js'
import useCardInfoStore from '@/stores/cardInfo.js'
const TokenStore = useTokenStore();
const IdentityStore = useIdentityStore();
const CardInfoStore = useCardInfoStore();
const login = async () => {
    // 判断是否输入用户名和密码
    if (registerData.value.username === '' || registerData.value.password === '') {
        ElMessage.error('用户名或密码不能为空！');
        return;
    }
    // 判断是否选择角色
    if (identify.value === '') {
        ElMessage.error('请选择身份！');
        return;
    }
    // 调用接口，完成登录
    let result = await userLoginService(registerData.value, identify.value);
    ElMessage.success('登录成功！');
    // 把得到的 token 存储到 pinia 中
    TokenStore.setToken(result.data);
    // 把 identity 存储到 pinia 中
    IdentityStore.setIdentity(identify.value);
    console.log(IdentityStore.identity);
    if (identify.value === '学生') {
        // 把得到的 cardInfo 存储到 pinia 中
        let result = await cardInfoService();
        CardInfoStore.setCardInfo(result.data);
    }
    // 跳转到首页
    router.push('/');
    console.log('router...');
}

// 忘记密码
const dialogVisible = ref(false);


</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item>
                    请选择用户类型：
                    <el-radio-group v-model="identify">
                        <el-radio-button label="学生" value="学生" />
                        <el-radio-button label="商家" value="商家" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registerData.rePassword" clearable></el-input>
                </el-form-item>
                <!-- 以下是用户其他信息，商家 | 学生 -->
                <!-- 商家 -->
                <el-form-item v-if="identify === '商家'">
                    <el-input :prefix-icon="House" placeholder="请输入商家名称" v-model="storeData.store_name" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="identify === '商家'">
                    <el-input :prefix-icon="LocationFilled" placeholder="请输入商家地址"
                        v-model="storeData.address" clearable></el-input>
                </el-form-item>
                <!-- 学生 -->
                <el-form-item v-if="identify === '学生'">
                    <el-input :prefix-icon="Key" placeholder="请输入学号" v-model="studentData.num" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="identify === '学生'">
                    <el-input :prefix-icon="UserFilled" placeholder="请输入姓名" v-model="studentData.name" clearable></el-input>
                </el-form-item>
                <el-form-item v-if="identify === '学生'">
                    请选择性别：
                    <el-radio-group v-model="studentData.gender">
                        <el-radio-button label="男" value="男" />
                        <el-radio-button label="女" value="女" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="identify === '学生'">
                    <el-input :prefix-icon="House" placeholder="请输入学院" v-model="studentData.department" clearable></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register();">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData();">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username" clearable></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    请选择用户类型：
                    <el-radio-group v-model="identify">
                        <el-radio-button label="学生" value="学生" />
                        <el-radio-button label="商家" value="商家" />
                        <el-radio-button label="管理员" value="管理员" />
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false" @click="dialogVisible = true;">忘记密码？</el-link>
                    </div>
                </el-form-item> -->
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true; clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>

    <!-- 忘记密码部分，通过弹窗实现 -->
    <!-- <el-dialog v-model="dialogVisible" :title='忘记密码' width="30%">
        <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
            <el-form-item label="分类名称" prop="categoryName">
                <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="分类别名" prop="categoryAlias">
                <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="title == '添加分类' ? addCategory() : updateCategory()"> 确认 </el-button>
            </span>
        </template>
    </el-dialog> -->
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/管理系统5.png') no-repeat 50% -25% / 750px auto,
            url('@/assets/bk.jpg') no-repeat left / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
        // background: url('@/assets/管理系统5.png') no-repeat 50% -16% / 500px auto;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>