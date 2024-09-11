<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
//学生列表数据模型
const students = ref([])

//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size;
    studentList();
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num;
    studentList();
}

// 获取账单列表函数
import { studentListService } from '@/api/user.js';
const studentList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        name: searchStu.value
        // type: typeId.value ? typeId.value : null,
        // date: date.value ? date.value : null,
    }
    console.log(params.date);

    let result = await studentListService(params);

    // 渲染视图
    total.value = result.data.total;
    students.value = result.data.items;

    console.log(result.data);
}
studentList();

// 添加学生
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { userRegisterService, deleteStudentService, userInfoUpdateService, adminUpdateStudent } from '@/api/user.js';
//控制抽屉是否显示
const visibleDrawer = ref(false)
const visibleDrawer1 = ref(false)
//添加表单数据模型
const studentModel = ref({
    num: '',
    name: '',
    gender: '',
    phone: '',
    department: '',
    password: '',
    username: ''
})

// 添加学生
import { ElMessage, ElMessageBox } from 'element-plus'
const addStudent = async () => {
    // 检查参数
    if (studentModel.value.name === '') {
        ElMessage.error('请输入姓名！');
        return;
    }
    if (studentModel.value.num === '') {
        ElMessage.error('请输入学号！');
        return;
    }
    if (studentModel.value.department === '') {
        ElMessage.error('请输入学院！');
        return;
    }
    if (studentModel.value.gender === '') {
        ElMessage.error('请选择性别！');
        return;
    }
    // 补充参数
    studentModel.value.username = studentModel.value.num;
    studentModel.value.password = '123456';

    // 调用接口
    let result = await userRegisterService(studentModel.value, '学生');
    ElMessage.success(result.msg ? result.msg : '添加成功！');

    // 隐藏抽屉
    visibleDrawer.value = false;

    // 刷新列表
    studentList();
}

// 搜索
const searchStu = ref('');

// 编辑学生信息
const edit = (username, name, num, department, phone, gender) => {
    studentModel.value.username = username
    studentModel.value.name = name
    studentModel.value.num = num
    studentModel.value.department = department
    studentModel.value.phone = phone
    studentModel.value.gender = gender

    visibleDrawer1.value = true;
}
const updateStudent = async () => {
    if (studentModel.value.name === '') {
        ElMessage.error('请输入姓名！');
        return;
    }
    if (studentModel.value.num === '') {
        ElMessage.error('请输入学号！');
        return;
    }
    if (studentModel.value.department === '') {
        ElMessage.error('请输入学院！');
        return;
    }
    let result = await adminUpdateStudent(studentModel.value);
    ElMessage.success('修改成功');

    // 刷新列表
    studentList();

    visibleDrawer1.value = false;

    clearStudentData();

}
const deleteStu = async (id) => {
    let params = {
        user_id: id,
    }
    // 提示用户确认框
    ElMessageBox.confirm(
        '您确认要删除该学生吗？',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let result = await deleteStudentService(params);
            ElMessage.success('删除成功！');
            // 刷新列表
            studentList();
        })
        .catch(() => {
            // ElMessage({
            //     type: 'info',
            //     message: '取消了退出登录！',
            // })
        })
}
const clearStudentData = () => {
    studentModel.value = {
        num: '',
        name: '',
        gender: '',
        phone: '',
        department: '',
        password: '',
        username: ''
    }
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>学生管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true;">添加学生</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="搜索">
                <el-input v-model="searchStu" placeholder="请输入姓名/学号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :click="studentList()">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- 学生列表 -->
        <el-table :data="students" style="width: 100%">
            <el-table-column label="学生编号" prop="id" align="center"></el-table-column>
            <el-table-column label="用户名" prop="username" align="center"></el-table-column>
            <el-table-column label="学号" prop="num" align="center"></el-table-column>
            <el-table-column label="姓名" prop="name" align="center"></el-table-column>
            <el-table-column label="性别" prop="gender" align="center"></el-table-column>
            <el-table-column label="学院" prop="department" align="center"></el-table-column>
            <el-table-column label="联系方式" prop="phone" align="center"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"
                        @click="edit(row.username, row.name, row.num, row.department, row.phone, row.gender)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteStu(row.user_id)"></el-button>
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
        <el-drawer v-model="visibleDrawer" title="添加学生" direction="rtl" size="50%">
            <el-text class="mx-1" type="danger" size="small">*用户名为学号，初始密码为123456。</el-text>
            <!-- 添加学生表单 -->
            <el-form :model="studentModel" label-width="100px" style="margin-top: 20px;">
                <el-form-item label="姓名">
                    <el-input v-model="studentModel.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input v-model="studentModel.num" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input v-model="studentModel.department" placeholder="请输入学院"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="studentModel.phone" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="studentModel.gender">
                        <el-radio-button label="男" value="男" />
                        <el-radio-button label="女" value="女" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addStudent()">添加</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
        <!-- 修改 -->
        <el-drawer v-model="visibleDrawer1" title="修改学生信息" direction="rtl" size="50%">
            <!-- 修改学生表单 -->
            <el-form :model="studentModel" label-width="100px" style="margin-top: 20px;">
                <el-form-item label="姓名">
                    <el-input v-model="studentModel.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="学号">
                    <el-input v-model="studentModel.num" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="学院">
                    <el-input v-model="studentModel.department" placeholder="请输入学院"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="studentModel.phone" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateStudent()">提交修改</el-button>
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