<script setup>
import { ref } from 'vue'
import { Coin, Lock, Unlock, Delete } from '@element-plus/icons-vue'
//校园卡列表数据模型
const cards = ref([]);

const cardId = ref({
    cardId: ''
});

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    cardList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    cardList();
}

// 获取账单列表函数
import { ElMessage, ElMessageBox } from 'element-plus'
import { cardListService, adminCardUnlockService, adminCardLockService, adminCardDeleteService, adminChargeService } from '@/api/card.js';
const cardList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        name: searchCard.value
    }
    console.log(params.date);

    let result = await cardListService(params);

    // 渲染视图
    total.value = result.data.total;
    cards.value = result.data.items;

    console.log(result.data);
}
cardList();

// 搜索
const searchCard = ref('');

// 状态state格式化
const stateFormatter = (row) => {
    if (row.state == 0) {
        return '正常状态';
    }
    if (row.state == 1) {
        return '挂失状态';
    }
    if (row.state == 2) {
        return '注销状态';
    }
    else {
        return row.billId;
    }
}

// 改变state的操作
const unlock = async (card_id) => {
    cardId.value.cardId = card_id;

    let result = await adminCardUnlockService(cardId.value);
    cardList();

    ElMessage.success('解锁成功！')

}
const lock = async (card_id) => {
    cardId.value.cardId = card_id;

    let result = await adminCardLockService(cardId.value);
    cardList();

    ElMessage.success('锁定成功！')

}
const deleteCard = async (card_id) => {
    cardId.value.cardId = card_id;

    // 提示用户确认框
    ElMessageBox.confirm(
        '您确认要注销该校园卡吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let result = await adminCardDeleteService(cardId.value);
            cardList();

            ElMessage.success('注销成功！')
        })
        .catch(() => {
            // ElMessage({
            //     type: 'info',
            //     message: '取消了退出登录！',
            // })
        })
}

// 充值
const dialogVisible = ref(false)
const chargeInfo = ref({
    card_id: '',
    amount: '',
    notes: '线下充值',
})
const clearChargeData = () => {
    chargeInfo.value = {
        card_id: '',
        amount: '',
        notes: '线下充值'
    }
}
const charge = async () => {
    let result = await adminChargeService(chargeInfo.value);

    ElMessage.success(result.msg ? result.msg : '充值成功');
    
    dialogVisible.value = false;
    cardList();
    clearChargeData();
    
    
}


</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>校园卡管理</span>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="搜索">
                <el-input v-model="searchCard" placeholder="请输入姓名/学号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :click="cardList()">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 校园卡列表 -->
        <el-table :data="cards" style="width: 100%" >
            <el-table-column label="卡号" prop="id" align="center"></el-table-column>
            <el-table-column label="姓名" prop="name" align="center"></el-table-column>
            <el-table-column label="学号" prop="num" align="center"></el-table-column>
            <el-table-column label="余额(元)" prop="balance" align="right"></el-table-column>
            <!-- <el-table-column label="金额(元)" prop="balance" align="center">
                <template #default="{ row }">
                    <el-tag type="primary">{{ row.balance }}</el-tag>
                </template>
            </el-table-column> -->
            <el-table-column label="状态" prop="state" align="center" :formatter="stateFormatter">
                <template #default="{ row }">
                    <el-tag v-if="row.state == 0" type="success">正常</el-tag>
                    <el-tag v-if="row.state == 1" type="warning">锁定</el-tag>
                    <el-tag v-if="row.state == 2" type="danger">注销</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template #default="{ row }">
                    <el-button v-if="row.state == 0" :icon="Coin" circle plain type="primary"
                        @click="chargeInfo.card_id = row.id;dialogVisible = true;"></el-button>
                        <el-button v-if="row.state == 0" :icon="Lock" circle plain type="primary"
                        @click="lock(row.id)"></el-button>
                    <el-button v-if="row.state == 1" :icon="Unlock" circle plain type="success"
                        @click="unlock(row.id)"></el-button>
                    <el-button v-if="row.state == 0" :icon="Delete" circle plain type="danger"
                        @click="deleteCard(row.id)"></el-button>
                    <el-button v-if="row.state == 2" :icon="Delete" circle plain type="danger" disabled></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
    </el-card>
    <!-- 充值弹窗 -->
    <el-dialog v-model="dialogVisible" :title='title' width="30%">
            <el-form :model="chargeInfo" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="卡号" prop="card_id">
                    <el-input v-model="chargeInfo.card_id" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="金额" prop="amount">
                    <el-input v-model="chargeInfo.amount" minlength="1" maxlength="15"></el-input>
                </el-form-item>
                <!-- <el-form-item label="备注" prop="notes">
                    <el-input v-model="chargeInfo.notes" minlength="1" maxlength="15"></el-input>
                </el-form-item> -->
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="charge()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
</template>
<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>