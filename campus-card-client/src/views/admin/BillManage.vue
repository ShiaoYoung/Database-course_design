<script setup>
import { ref } from 'vue'

//结算单列表数据模型
const bills = ref([{
    "id": 3,
    "storeId": 5,
    "sum": 10.0,
    "createTime": "2024-09-01 10:29:18"
}])

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
import { billListService, settleAllService } from '@/api/bill.js';
const billList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        name: searchBill.value
    }
    console.log(params.data);

    let result = await billListService(params);

    // 渲染视图
    total.value = result.data.total;
    bills.value = result.data.items;

    console.log(result.data);
}
billList();

// 搜索
const searchBill = ref('');

// 手动全部结算
import { ElMessage, ElMessageBox } from 'element-plus'
const settleAll = async () => {
    
    // 提示用户确认框
    ElMessageBox.confirm(
        '您确认要为所有商家结算吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let result = await settleAllService();
            ElMessage.success('结算成功！');
            // 刷新列表
            billList();
        })
        .catch(() => {
            // ElMessage({
            //     type: 'info',
            //     message: '取消了退出登录！',
            // })
        })

}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>结算单管理</span>
                <div class="extra">
                    <el-button type="primary" @click="settleAll">手动全部结算</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="搜索">
                <el-input v-model="searchBill" placeholder="请输入商家名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :click="billList()">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 结算单列表 -->
        <el-table :data="bills" style="width: 100%">
            <el-table-column label="结算单号" prop="id" align="center"></el-table-column>
            <el-table-column label="商家编号" prop="storeId" align="center"></el-table-column>
            <el-table-column label="金额(元)" prop="sum" align="right"></el-table-column>
            <!-- <el-table-column label="金额(元)" prop="sum" align="center">
                <template #default="{ row }">
                    <el-tag type="primary">{{ row.sum }}</el-tag>
                </template>
            </el-table-column> -->
            <el-table-column label="时间" prop="createTime" align="center"></el-table-column>
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