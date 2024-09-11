<script setup>
import { ref } from 'vue'

// 已结算总金额
const amount = ref(0);

// 账单类型数据模型
const types = ref([
    {
        id: 1,
        type: '所有账单',
        name: '所有账单'
    },
    {
        id: 2,
        type: '入账',
        name: '入账'
    },
    {
        id: 3,
        type: '支出',
        name: '支出'
    },
])

//用户搜索时选中的类型id
const typeId = ref('所有账单')

//用户搜索时选中的发布时间
const date = ref('')

//文章列表数据模型
const bills = ref([])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    billList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    billList();
}

// 获取账单列表函数
import { settledBillListService, settledAmountService } from '@/api/consume.js';
const billList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
    }
    console.log(params.date);

    let result = await settledBillListService(params);

    // 渲染视图
    total.value = result.data.total;
    bills.value = result.data.items;

    settledAmount();

    console.log(result.data);
}
billList();

// 账单id格式化
const billFormatter = (row) => {
    if (row.billId == null) {
        return '未结算';
    }
    else {
        return row.billId;
    }
}

// 获取已结算金额
const settledAmount = async () => {
    let result = await settledAmountService();

    amount.value = result.data;
}
settledAmount();
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>已结算总金额：<strong>{{ amount }}</strong>元。</span>
                <!-- <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true;">添加文章</el-button>
                </div> -->
            </div>
        </template>
        <!-- 搜索表单 -->
        <!-- <el-form inline>
            <el-form-item label="类型：">
                <el-select placeholder="请选择" v-model="typeId" style="min-width: 150px">
                    <el-option v-for="c in types" :key="c.id" :label="c.name" :value="c.type">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="时间：">
                <el-select placeholder="请选择" v-model="date" style="min-width: 150px">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :click="billList()">搜索</el-button>
                <el-button @click="typeId = ''; date = '';">重置</el-button>
            </el-form-item>
        </el-form> -->
        <!-- 账单列表 -->
        <el-table :data="bills" style="width: 100%">
            <el-table-column label="卡号" prop="cardId" align="center"></el-table-column>
            <el-table-column label="金额(元)" prop="amount" align="right"></el-table-column>
            <!-- <el-table-column label="金额(元)" prop="amount" align="center">
                <template #default="{ row }">
                    <el-tag type="success">{{ row.amount }}</el-tag>
                </template>
            </el-table-column> -->
            <el-table-column label="内容" prop="notes" align="center"></el-table-column>
            <el-table-column label="时间" prop="createTime" align="center"></el-table-column>
            <el-table-column label="结算单号" prop="billId" align="center" :formatter="billFormatter"></el-table-column>

            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

    </el-card>
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