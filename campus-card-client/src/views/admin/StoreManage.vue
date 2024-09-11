<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
//商家列表数据模型
const stores = ref([])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    storeList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    storeList();
}

// 获取账单列表函数
import { storeListService } from '@/api/user.js';
const storeList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        name: searchSto.value
    }
    console.log(params.date);

    let result = await storeListService(params);

    // 渲染视图
    total.value = result.data.total;
    stores.value = result.data.items;

    console.log(result.data);
}
storeList();

// 添加商家
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { userRegisterService, deleteStoreService, adminUpdateStore } from '@/api/user.js';
//控制抽屉是否显示
const visibleDrawer = ref(false)
const visibleDrawer1 = ref(false)
//添加表单数据模型
const storeModel = ref({
    store_name: '',
    address: '',
    password: '',
    username: ''
})
const clearStoreData = () => {
    storeModel.value = {
        store_name: '',
        address: '',
        password: '',
        username: ''
    }
}

// 添加商家
import { ElMessage, ElMessageBox } from 'element-plus'
const addStore = async () => {
    // 检查参数
    if (storeModel.value.store_name === '') {
        ElMessage.error('请输入商家名称！');
        return;
    }
    if (storeModel.value.address === '') {
        ElMessage.error('请输入地址！');
        return;
    }
    if (storeModel.value.username === '') {
        ElMessage.error('请输入用户名！');
        return;
    }
    // 补充参数
    storeModel.value.password = '123456';

    // 调用接口
    let result = await userRegisterService(storeModel.value, '商家');
    ElMessage.success(result.msg ? result.msg : '添加成功！');

    // 隐藏抽屉
    visibleDrawer.value = false;

    // 刷新列表
    storeList();
}

// 搜索
const searchSto = ref('');

// 删除商家用户
const deleteSto = async (id) => {
    let params = {
        user_id: id,
    }
    // 提示用户确认框
    ElMessageBox.confirm(
        '您确认要删除该商家吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let result = await deleteStoreService(params);
            ElMessage.success('删除成功！');
            // 刷新列表
            storeList();
        })
        .catch(() => {
            // ElMessage({
            //     type: 'info',
            //     message: '取消了退出登录！',
            // })
        })
}
// 修改
const edit = (username, store_name, address, phone) => {

    storeModel.value.username = username
    storeModel.value.store_name = store_name
    storeModel.value.address = address;
    storeModel.value.phone = phone;
    visibleDrawer1.value = true;
}
const updateStore = async () => {
    if (storeModel.value.store_name === '') {
        ElMessage.error('请输入商家名称！');
        return;
    }
    
    let result = await adminUpdateStore(storeModel.value);
    ElMessage.success('修改成功');

    // 刷新列表
    storeList();

    visibleDrawer1.value = false;

    clearStoreData();

}

</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>商家管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true;">添加商家</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="搜索">
                <el-input v-model="searchSto" placeholder="请输入商家名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :click="storeList()">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 商家列表 -->
        <el-table :data="stores" style="width: 100%">
            <el-table-column label="商家编号" prop="id" align="center"></el-table-column>
            <el-table-column label="用户名" prop="username" align="center"></el-table-column>
            <el-table-column label="商家名称" prop="store_name" align="center"></el-table-column>
            <el-table-column label="地址" prop="address" align="center"></el-table-column>
            <el-table-column label="联系方式" prop="phone" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="edit(row.username, row.store_name, row.address, row.phone)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteSto(row.user_id)"></el-button>
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
        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" title="添加商家" direction="rtl" size="50%">
            <el-text class="mx-1" type="danger" size="small">*初始密码为123456。</el-text>
            <!-- 添加商家表单 -->
            <el-form :model="storeModel" label-width="100px" style="margin-top: 20px;">
                <el-form-item label="商家名称">
                    <el-input v-model="storeModel.store_name" placeholder="请输入商家名称"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="storeModel.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="storeModel.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addStore()">添加</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <!-- 修改 -->
        <el-drawer v-model="visibleDrawer1" title="添加商家" direction="rtl" size="50%">
            <!-- 修改商家表单 -->
            <el-form :model="storeModel" label-width="100px" style="margin-top: 20px;">
                <el-form-item label="商家名称">
                    <el-input v-model="storeModel.store_name" placeholder="请输入商家名称"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="storeModel.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="storeModel.phone" placeholder="请输入联系方式 "></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateStore()">提交修改</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
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