// 导入request.js
import request from '@/utils/request.js'

// 提供调用注册接口的函数
export const userRegisterService = (registerData,identify,userData) => {
    // 借助于UrlSearchParams完成传递
    const params = new URLSearchParams();
    for(let key in registerData) {
        params.append(key, registerData[key]);
    }
    for (let key in userData) {
        params.append(key, userData[key]);
    }
    if (identify === '商家') {
        return request.post('/user/registerStore', params);
    }
    else if (identify === '学生') {
        return request.post('/user/registerStudent', params);
    }
    
}

// 提供调用登录接口的函数
export const userLoginService = (loginData,identify) => {
    // 借助于UrlSearchParams完成传递
    const params = new URLSearchParams();
    for(let key in loginData) {
        params.append(key, loginData[key]);
    }
    if (identify === '商家') {
        return request.post('/user/loginStore', params);
    }
    else if (identify === '学生') {
        return request.post('/user/loginStudent', params);
    }
    else if (identify === '管理员') {
        return request.post('/user/loginAdmin', params);
    }
}

// 获取商家用户详细信息
export const userStoreInfoService = () => {
    return request.get('/user/userInfoStore');
}

// 获取学生用户详细信息
export const userStudentInfoService = () => {
    return request.get('/user/userInfoStudent');
}

// 获取管理员详细信息
export const userAdminInfoService = () => {
    return request.get('/user/userInfoAdmin');
}

// 修改用户信息
export const userInfoUpdateService = (userInfoData, identity) => {
    // 借助于UrlSearchParams完成传递
    const params = new URLSearchParams();
    for(let key in userInfoData) {
       params.append(key, userInfoData[key]);
    }

    if (identity == '商家') {
        return request.post('/user/updateStore', params);
    }
    if (identity == '学生') {
        return request.post('/user/updateStudent', params);
    }
    
}

// 修改用户头像
export const userAvatarUpdateService = (picUrl) => {
    const params = new URLSearchParams();
    params.append('picUrl', picUrl);
    return request.patch('/user/updatePic', params);
}

// 修改密码
export const userPwdUpdateService = (pwdInfo) => {
    const params = new URLSearchParams();
    for(let key in pwdInfo) {
        params.append(key, pwdInfo[key]);
    }
    return request.post('/user/updatePwd', params);
}

// 获取所有学生信息
export const studentListService = (params) => {
    return request.get('/user/manageStudent', {params:params});
}

// 获取所有商家信息
export const storeListService = (params) => {
    return request.get('/user/manageStore', {params:params});
}

// 删除学生
export const deleteStudentService = (params) => {
    return request.get('/user/deleteStudent', {params:params});
}

// 删除学生
export const deleteStoreService = (params) => {
    return request.get('/user/deleteStore', {params:params});
}


// 修改学生信息
export const adminUpdateStudent = (userInfoData) => {
    // 借助于UrlSearchParams完成传递
    const params = new URLSearchParams();
    for(let key in userInfoData) {
       params.append(key, userInfoData[key]);
    }
    return request.post('/user/adminUpdateStudent', params);
    
}
// 修改商家信息
export const adminUpdateStore = (userInfoData) => {
    // 借助于UrlSearchParams完成传递
    const params = new URLSearchParams();
    for(let key in userInfoData) {
       params.append(key, userInfoData[key]);
    }
    return request.post('/user/adminUpdateStore', params);
    
}