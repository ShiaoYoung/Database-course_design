<script setup>
import { ref } from 'vue'

//消费列表数据模型
const consumes = ref([])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    consumeList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    consumeList();
}

// 获取账单列表函数
import { consumeListService } from '@/api/consume.js';
const consumeList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        name: searchConsume.value
    }
    console.log(params.data);

    let result = await consumeListService(params);

    // 渲染视图
    total.value = result.data.total;
    consumes.value = result.data.items;

    console.log(result.data);
}
consumeList();

// 搜索
const searchConsume = ref('');

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>消费管理</span>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="搜索">
                <el-input v-model="searchConsume" placeholder="请输入商家名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :click="consumeList()">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 消费列表 -->
        <el-table :data="consumes" style="width: 100%">
            <el-table-column label="消费单号" prop="id" align="center"></el-table-column>
            <el-table-column label="卡号" prop="cardId" align="center"></el-table-column>
            <el-table-column label="商家编号" prop="storeId" align="center"></el-table-column>
            <el-table-column label="商家名称" prop="storeName" align="center"></el-table-column>
            <el-table-column label="金额(元)" prop="amount" align="right"></el-table-column>
            <!-- <el-table-column label="金额(元)" prop="amount" align="center">
                <template #default="{ row }">
                    <el-tag type="primary">{{ row.amount }}</el-tag>
                </template>
            </el-table-column> -->
            <el-table-column label="时间" prop="createTime" align="center" width="200px"></el-table-column>
            <el-table-column label="备注" prop="notes" align="center"></el-table-column>
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