import { createRouter, createWebHistory } from 'vue-router'

// 导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import StoreInfoVue from '@/views/store/StoreInfo.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue';
import UserInfoVue from '@/views/user/UserInfo.vue';
import UserResetPassword from '@/views/user/UserResetPassword.vue';
import CardChargingVue from '@/views/student/CardCharging.vue';
import ResetQueryPwdVue from '@/views/student/ResetQueryPwd.vue';
import CardLostVue from '@/views/student/CardLost.vue';
import CardUnlockVue from '@/views/student/CardUnlock.vue';
import CardDeleteVue from '@/views/student/CardDelete.vue';
import AllBillVue from '@/views/student/bill/AllBill.vue';
import BillChartsVue from '@/views/student/bill/BillCharts.vue';
import ConsumeVue from '@/views/store/Consume.vue';
import UnsettledBillVue from '@/views/store/bill/UnsettledBill.vue';
import SettledBillVue from '@/views/store/bill/SettledBill.vue';
import SettledBillChartsVue from '@/views/store/bill/SettledBillCharts.vue';
import ApplyForSettleVue from '@/views/store/bill/ApplyForSettle.vue';
import StudentManageVue from '@/views/admin/StudentManage.vue';
import StoreManageVue from '@/views/admin/StoreManage.vue';
import CardManageVue from '@/views/admin/CardManage.vue';
import ConsumeManageVue from '@/views/admin/ConsumeManage.vue';
import ChargeManageVue from '@/views/admin/ChargeManage.vue';
import BillManageVue from '@/views/admin/BillManage.vue';

import AboutViewVue from '@/views/AboutView.vue';

import TmpVue from '@/views/tmpVue.vue';

// 定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    { path: '/', component: LayoutVue, redirect:'/aboutView', children: [
        { path: '/store/StoreInfo', component: StoreInfoVue },

        { path: '/aboutView', component: AboutViewVue },
        { path: '/tmp', component: TmpVue },

        { path: '/user/avatar', component: UserAvatarVue },
        { path: '/user/info', component: UserInfoVue },
        { path: '/user/resetPassword', component: UserResetPassword },
        { path: '/card/charge', component: CardChargingVue },
        { path: '/card/resetQueryPwd', component: ResetQueryPwdVue },
        { path: '/card/cardLost', component: CardLostVue },
        { path: '/card/cardUnlock', component: CardUnlockVue },
        { path: '/card/cardDelete', component: CardDeleteVue },
        { path: '/stuBill/allBill', component: AllBillVue },
        { path: '/stuBill/billCharts', component: BillChartsVue },
        { path: '/consume/consume', component: ConsumeVue },
        { path: '/consume/unsettledBill', component: UnsettledBillVue },
        { path: '/consume/settledBill', component: SettledBillVue },
        { path: '/consume/settledBillCharts', component: SettledBillChartsVue },
        { path: '/consume/applyForSettle', component: ApplyForSettleVue },
        { path: '/admin/studentManage', component: StudentManageVue },
        { path: '/admin/storeManage', component: StoreManageVue },
        { path: '/admin/cardManage', component: CardManageVue },
        { path: '/admin/consumeManage', component: ConsumeManageVue },
        { path: '/admin/chargeManage', component: ChargeManageVue },
        { path: '/admin/billManage', component: BillManageVue },

    ]},
]

// 创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// 导出路由
export default router