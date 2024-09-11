<script setup>
import { ref } from 'vue'

// 身份
import useIdentityStore from '@/stores/identity.js'
const IdentityStore = useIdentityStore();
console.log(IdentityStore.identity);

// 校园卡
import useCardInfoStore from '@/stores/cardInfo.js'
const CardInfoStore = useCardInfoStore();

import { useRouter } from 'vue-router';
const router = useRouter();
const toPage = (page) => {
  router.push(page);
}
console.log(666);

console.log(IdentityStore.identity);
console.log(666);

</script>
<template>
  <el-card class="page-container" v-if="IdentityStore.identity == '管理员'">
    <div class="welcome-page">
      <div class="dec-text">
        <h2>功能面板</h2>
        <!-- 一站式解决校园卡的发行、充值及消费管理，保障校园内统一支付 -->
      </div>
      <!-- <div class="wel-img">
        <img src="@/assets/8624893.jpg" alt="" width="75%" />
      </div> -->

      <div class="fun-cards">
        <el-card class="card" shadow="hover" @click="toPage('/admin/studentManage')">
          <img src="@/assets/学生.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>学生管理</h4>
            <span class="detail-dec">查看所有<strong>学生</strong>用户的信息、添加或注销<strong>学生</strong>用户</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/admin/storeManage')">
          <img src="@/assets/商家.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>商家管理</h4>
            <span class="detail-dec">查看所有<strong>商家</strong>用户的信息、添加或注销<strong>商家</strong>用户</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/admin/cardManage')">
          <img src="@/assets/校园卡.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>校园卡管理</h4>
            <span class="detail-dec">校园卡充值、挂失等一系列对校园卡操作</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/user/avatar')">
          <img src="@/assets/更换头像.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>更换头像</h4>
            <span class="detail-dec">上传新头像</span>
          </div>
        </el-card>
      </div>
      <div class="fun-cards">
        <el-card class="card" shadow="hover" @click="toPage('/admin/chargeManage')">
          <img src="@/assets/充值n.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>充值管理</h4>
            <span class="detail-dec">查看所有充值信息</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/admin/consumeManage')">
          <img src="@/assets/消费n.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>消费管理</h4>
            <span class="detail-dec">查看所有消费信息</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/admin/billManage')">
          <img src="@/assets/结算单.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>结算单管理</h4>
            <span class="detail-dec">查看所有结算单信息</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/user/resetPassword')">
          <img src="@/assets/重置密码.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>修改密码</h4>
            <span class="detail-dec">修改管理员密码</span>
          </div>
        </el-card>
      </div>
    </div>
  </el-card>
  <el-card class="page-container" v-if="IdentityStore.identity == '商家'">
    <div class="welcome-page">
      <div class="dec-text">
        <h2>功能面板</h2>
        <!-- 一站式解决校园卡的发行、充值及消费管理，保障校园内统一支付 -->
      </div>
      <!-- <div class="wel-img">
        <img src="@/assets/8624893.jpg" alt="" width="75%" />
      </div> -->

      <div class="fun-cards">
        <el-card class="card" shadow="hover" @click="toPage('/consume/consume')">
          <img src="@/assets/消费n.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>消费功能</h4>
            <span class="detail-dec">输入校园卡号与金额，进行消费</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/consume/unsettledBill')">
          <img src="@/assets/结算单列表.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>未结算账单</h4>
            <span class="detail-dec">查看商家所有未结算的记账信息</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/consume/settledBill')">
          <img src="@/assets/结算单.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>已结算账单</h4>
            <span class="detail-dec">查看商家所有已结算的消费信息</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/user/avatar')">
          <img src="@/assets/更换头像.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>更换头像</h4>
            <span class="detail-dec">上传新头像</span>
          </div>
        </el-card>
      </div>
      <div class="fun-cards">
        <el-card class="card" shadow="hover" @click="toPage('/consume/settledBillCharts')">
          <img src="@/assets/报表.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>账单统计</h4>
            <span class="detail-dec">查看每月或每日的入账信息统计图</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/consume/applyForSettle')">
          <img src="@/assets/申请结算.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>申请结算</h4>
            <span class="detail-dec">申请结算当月已产生记账信息</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/user/info')">
          <img src="@/assets/基本资料.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>基本资料</h4>
            <span class="detail-dec">修改商家信息</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/user/resetPassword')">
          <img src="@/assets/重置密码.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>修改密码</h4>
            <span class="detail-dec">修改用户密码</span>
          </div>
        </el-card>
      </div>
    </div>
  </el-card>
  <el-card class="page-container" v-if="IdentityStore.identity == '学生'">
    <div class="welcome-page">
      <div class="dec-text">
        <h2>功能面板</h2>
        <!-- 一站式解决校园卡的发行、充值及消费管理，保障校园内统一支付 -->
      </div>
      <!-- <div class="wel-img">
        <img src="@/assets/8624893.jpg" alt="" width="75%" />
      </div> -->

      <div class="fun-cards">
        <!-- <el-card class="card" shadow="hover" @click="toPage('/user/info')">
          <img src="@/assets/银行卡.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>绑定银行卡</h4>
            <span class="detail-dec">查看所有<strong>学生</strong>用户的信息、添加或注销<strong>学生</strong>用户</span>
          </div>
        </el-card> -->
        <el-card class="card" shadow="hover" @click="toPage('/card/resetQueryPwd')">
          <img src="@/assets/重置查询密码.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>重置查询密码</h4>
            <span class="detail-dec">重置校园卡的查询密码</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/card/charge')">
          <img src="@/assets/充值n.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>校园卡充值</h4>
            <span class="detail-dec">使用支付宝充值校园卡</span>
          </div>
        </el-card>


        <el-card v-if="CardInfoStore.cardInfo.state === '0'" class="card" shadow="hover" @click="toPage('/card/cardLost')">
          <img src="@/assets/挂失.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>校园卡挂失</h4>
            <span class="detail-dec">校园卡丢失后进行挂失，以禁用其消费功能</span>
          </div>
        </el-card>

        <el-card v-if="CardInfoStore.cardInfo.state === '1'" class="card" shadow="hover" @click="toPage('/card/cardUnlock')">
          <img src="@/assets/解锁.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>校园卡解锁</h4>
            <span class="detail-dec">解锁校园卡，以恢复其消费功能</span>
          </div>
        </el-card>


        <el-card v-if="CardInfoStore.cardInfo.state !== '2'" class="card" shadow="hover" @click="toPage('/card/cardDelete')">
          <img src="@/assets/注销.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>离校注销</h4>
            <span class="detail-dec">离校前注销校园卡，以禁用其全部功能</span>
          </div>
        </el-card>
      </div>
      <div class="fun-cards">
        <el-card class="card" shadow="hover" @click="toPage('/stuBill/allBill')">
          <img src="@/assets/结算单列表.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>所有账单</h4>
            <span class="detail-dec">查看校园卡产生的所有充值或消费信息</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/stuBill/billCharts')">
          <img src="@/assets/报表.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>账单统计</h4>
            <span class="detail-dec">查看每月或每日的充值或消费信息统计图</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/user/info')">
          <img src="@/assets/基本资料.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>基本资料</h4>
            <span class="detail-dec">修改学生信息</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/user/resetPassword')">
          <img src="@/assets/重置密码.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>修改密码</h4>
            <span class="detail-dec">修改用户密码</span>
          </div>
        </el-card>
        <el-card class="card" shadow="hover" @click="toPage('/user/avatar')">
          <img src="@/assets/更换头像.png" alt="" width="50%" class="img-in-card" />
          <div class="fun-dec">
            <h4>更换头像</h4>
            <span class="detail-dec">上传新头像</span>
          </div>
        </el-card>
      </div>
    </div>
  </el-card>

</template>

<script setup></script>
<style scoped>
.welcome-page {
  margin: 0 auto;
  width: 80%;
  align-items: center;

  .dec-text {
    display: inline-block;
    text-align: center;
    width: 100%;
    margin: 0px auto;
  }

  .wel-img {
    text-align: center;
    margin-top: 20px;
  }

  .fun-cards {
    display: flex;
    justify-content: center;

    .card {
      width: 25%;
      height: 240px;
      border-radius: 20px;
      margin: 20px 10px;
      text-align: center;

      .img-in-card {
        border-radius: 10%;
        /* 使图片圆形 */
      }

      .detail-dec {
        color: #99a9bf;
      }
    }
  }
}
</style>
