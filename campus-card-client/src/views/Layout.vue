<script setup>
// 下拉菜单被点击后调用
import { ref } from 'vue'
import useIdentityStore from '@/stores/identity.js'
const IdentityStore = useIdentityStore();
const identity = ref(IdentityStore.identity);

import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom,
    Notebook,
    Shop,
    Wallet,
    WalletFilled,
    CreditCard,
    Key,
    Coin,
    Lock,
    Unlock,
    Delete,
    TrendCharts,
    List,
    Checked,
    Histogram,
    Dish,
    Avatar,
    Postcard,
    House,
    Goods,
    Refresh
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { userStoreInfoService, userStudentInfoService, userAdminInfoService } from '@/api/user.js'
import useUserInfoStore from '@/stores/userInfo.js'
import { useTokenStore } from '@/stores/token.js'
import useCardInfoStore from '@/stores/cardInfo.js'
const CardInfoStore = useCardInfoStore();
const userInfoStore = useUserInfoStore();
const tokenStore = useTokenStore();
// 调用函数，获取用户详细信息
const getUserInfo = async () => {
    // 调用接口  
    // let result = await userAdminInfoService(); // 这里是管理员信息获取，记得在后端声明
    let result;
    if (IdentityStore.identity == '商家') {
        // 获取商家信息
        console.log('获取商家信息');
        result = await userStoreInfoService();
    }
    else if (IdentityStore.identity == '学生') {
        // 获取学生信息
        console.log('获取学生信息');
        result = await userStudentInfoService();
    }
    else if (IdentityStore.identity == '管理员') {
        // 获取管理员信息
        console.log('获取管理员信息');
        result = await userAdminInfoService();
    }
    // 数据存储到pinia中
    console.log(result);

    userInfoStore.setInfo(result.data);
}
getUserInfo();

// 下拉菜单被点击后调用
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
const router = useRouter();
const handleCommand = (command) => {
    // 判断指令
    if (command === 'logout') {
        // 退出登录
        // 提示用户确认框
        ElMessageBox.confirm(
            '您确认要退出登录吗？',
            '温馨提示',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
            .then(async () => {
                // 1. 清除pinia中存储的token、个人信息、身份、校园卡信息
                tokenStore.removeToken();
                userInfoStore.removeInfo();
                IdentityStore.removeIdentity();
                if (IdentityStore.identity == '学生') {
                    CardInfoStore.removeCardInfo();
                }

                // 2. 跳转到登录页面
                router.push('/login');
                ElMessage({
                    type: 'success',
                    message: '已退出登录！',
                })
            })
            .catch(() => {
                // ElMessage({
                //     type: 'info',
                //     message: '取消了退出登录！',
                // })
            })
    }
    else {
        // 路由
        router.push('/user/' + command);
    }
}

// 用于展示余额
import { cardInfoService } from '@/api/card.js';
const refresh = async () => {
    let result = await cardInfoService();
    console.log(result.data);

    CardInfoStore.cardInfo.state = result.data.state;
    state.value = result.data.state;

    CardInfoStore.cardInfo.balance = result.data.balance;
    balance.value = result.data.balance;
}
const balance = ref(CardInfoStore.cardInfo.balance);
const state = ref(CardInfoStore.cardInfo.state);

</script>

<template>
    <el-container class="layout-container">
        <!-- 左侧菜单 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu v-if="identity == '管理员'" active-text-color="#ffd04b" background-color="#232323" text-color="#fff"
                router unique-opened>
                <el-menu-item index="/aboutView">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-sub-menu index="userManage">
                    <template #title>
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="/admin/studentManage">
                        <el-icon>
                            <Avatar />
                        </el-icon>
                        <span>学生管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/storeManage">
                        <el-icon>
                            <Goods />
                        </el-icon>
                        <span>商家管理</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/admin/cardManage">
                    <el-icon>
                        <Postcard />
                    </el-icon>
                    <span>校园卡管理</span>
                </el-menu-item>
                <!-- <el-sub-menu index="cardManage">
                    <template #title>
                        <el-icon>
                            <Notebook />
                        </el-icon>
                        <span>校园卡管理</span>
                    </template>
                    
                    <el-menu-item index="/consume/settledBill">
                        <el-icon>
                            <Checked />
                        </el-icon>
                        <span>校园卡注销</span>
                    </el-menu-item>
                </el-sub-menu> -->
                <el-sub-menu index="billManage">
                    <template #title>
                        <el-icon>
                            <Notebook />
                        </el-icon>
                        <span>账单管理</span>
                    </template>
                    <el-menu-item index="/admin/consumeManage">
                        <el-icon>
                            <List />
                        </el-icon>
                        <span>消费账单</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/chargeManage">
                        <el-icon>
                            <List />
                        </el-icon>
                        <span>充值账单</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/billManage">
                        <el-icon>
                            <Checked />
                        </el-icon>
                        <span>商家结算单</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="user">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <!-- <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item> -->
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
            <el-menu v-if="identity == '商家'" active-text-color="#ffd04b" background-color="#232323" text-color="#fff"
                router unique-opened>
                <el-menu-item index="/aboutView">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/consume/consume">
                    <el-icon>
                        <Shop />
                    </el-icon>
                    <span>消费功能</span>
                </el-menu-item>
                <el-sub-menu index="bill">
                    <template #title>
                        <el-icon>
                            <Notebook />
                        </el-icon>
                        <span>账单管理</span>
                    </template>
                    <el-menu-item index="/consume/unsettledBill">
                        <el-icon>
                            <List />
                        </el-icon>
                        <span>未结算账单</span>
                    </el-menu-item>
                    <el-menu-item index="/consume/settledBill">
                        <el-icon>
                            <Checked />
                        </el-icon>
                        <span>已结算账单</span>
                    </el-menu-item>
                    <el-menu-item index="/consume/settledBillCharts">
                        <el-icon>
                            <Histogram />
                        </el-icon>
                        <span>账单报表</span>
                    </el-menu-item>
                    <el-menu-item index="/consume/applyForSettle">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>申请结算</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="user">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
            <el-menu v-if="identity == '学生'" active-text-color="#ffd04b" background-color="#232323" text-color="#fff"
                router unique-opened>
                <el-menu-item index="/aboutView">
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <!-- <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>个人账单</span>
                </el-menu-item> -->
                <el-sub-menu index="stuBill">
                    <template #title>
                        <el-icon>
                            <WalletFilled />
                        </el-icon>
                        <span>个人账单</span>
                    </template>
                    <el-menu-item index="/stuBill/allBill">
                        <el-icon>
                            <Wallet />
                        </el-icon>
                        <span>所有账单</span>
                    </el-menu-item>
                    <el-menu-item index="/stuBill/billCharts">
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <span>账单报表</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>存入</span>
                    </el-menu-item> -->
                </el-sub-menu>
                <el-sub-menu index="card">
                    <template #title>
                        <el-icon>
                            <CreditCard />
                        </el-icon>
                        <span>校园卡管理</span>
                    </template>
                    <!-- <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>绑定银行卡</span>
                    </el-menu-item> -->
                    <el-menu-item index="/card/resetQueryPwd">
                        <el-icon>
                            <Key />
                        </el-icon>
                        <span>重置查询密码</span>
                    </el-menu-item>
                    <el-menu-item index="/card/charge">
                        <el-icon>
                            <Coin />
                        </el-icon>
                        <span>校园卡充值</span>
                    </el-menu-item>
                    <el-menu-item index="/card/cardLost">
                        <el-icon>
                            <Lock />
                        </el-icon>
                        <span>校园卡挂失</span>
                    </el-menu-item>
                    <el-menu-item index="/card/cardUnlock">
                        <el-icon>
                            <Unlock />
                        </el-icon>
                        <span>校园卡解锁</span>
                    </el-menu-item>
                    <el-menu-item index="/card/cardDelete">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        <span>离校注销</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="student">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>个人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更换头像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重置密码</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <div v-if="identity == '管理员'"><strong>管理员</strong>，您好！</div>


                <div v-if="identity == '商家'">商家 <strong>{{ userInfoStore.info.store_name }}</strong>，您好！</div>


                <div v-if="identity == '学生' && state == '0'">学生 <strong>{{ userInfoStore.info.name
                        }}</strong>，您好！您的校园卡余额为：<strong>{{ balance }}元</strong>！
                    <el-button :icon="Refresh" circle plain type="primary" @click="refresh()"></el-button>
                </div>

                <div v-if="identity == '学生' && state == '1'">学生 <strong>{{ userInfoStore.info.name
                        }}</strong>，您好！您的校园卡为<strong>挂失</strong>状态！
                    <el-button :icon="Refresh" circle plain type="primary" @click="refresh()"></el-button>
                </div>
                <div v-if="identity == '学生' && state == '2'">学生 <strong>{{ userInfoStore.info.name
                        }}</strong>，您好！您的校园卡<strong>已注销</strong>！
                        <el-button :icon="Refresh" circle plain type="primary" @click="refresh()"></el-button>
                </div>

                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.pic ? userInfoStore.info.pic : avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-if="identity != '管理员'" command="info"
                                :icon="User">基本资料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                            <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中间区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- 底部区域 -->
            <el-footer>校园卡消费系统 ©2024 Created by ShiaoYoung</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;

    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/管理系统3.png') no-repeat center / 350px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>
