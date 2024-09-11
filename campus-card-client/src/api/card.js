// 导入request.js
import request from '@/utils/request.js'

// 获取校园卡详细信息
export const cardInfoService = () => {
    return request.get('/card/cardInfo');
}

// 校园卡充值
export const adminChargeService = (chargeData) => {
    // 借助于UrlSearchParams完成传递
    const params = new URLSearchParams();
    for(let key in chargeData) {
        params.append(key, chargeData[key]);
    }
    return request.post('/charge/charge', params);
}
export const chargeService = (chargeData) => {
    // 借助于UrlSearchParams完成传递
    const params = new URLSearchParams();
    for(let key in chargeData) {
        params.append(key, chargeData[key]);
    }
    window.open('http://localhost:8080/charge/pay?card_id=' + chargeData.card_id + '&amount='+ chargeData.amount + '&notes'+ chargeData.notes);
    return;
}

// 重置查询密码
export const queryPwdUpdateService = (queryPwdInfo) => {
    const params = new URLSearchParams();
    for(let key in queryPwdInfo) {
        params.append(key, queryPwdInfo[key]);
    }
    return request.post('/card/updateQueryPwd', params);
}

// 挂失校园卡
export const cardLockService = (queryPwd) => {
    const params = new URLSearchParams();
    for(let key in queryPwd) {
        params.append(key, queryPwd[key]);
    }
    return request.post('/card/lock', params);
}

// 解锁校园卡
export const cardUnlockService = (queryPwd) => {
    const params = new URLSearchParams();
    for(let key in queryPwd) {
        params.append(key, queryPwd[key]);
    }
    return request.post('/card/unlock', params);
}

// 管理员解锁校园卡
export const adminCardUnlockService = (cardId) => {
    const params = new URLSearchParams();
    for(let key in cardId) {
        params.append(key, cardId[key]);
    }
    return request.post('/card/adminUnlock', params);
}

// 管理员锁定校园卡
export const adminCardLockService = (cardId) => {
    const params = new URLSearchParams();
    for(let key in cardId) {
        params.append(key, cardId[key]);
    }
    return request.post('/card/adminLock', params);
}

// 管理员注销校园卡
export const adminCardDeleteService = (cardId) => {
    const params = new URLSearchParams();
    for(let key in cardId) {
        params.append(key, cardId[key]);
    }
    return request.post('/card/adminDelete', params);
}

// 注销校园卡
export const cardDeleteService = (queryPwd) => {
    const params = new URLSearchParams();
    for(let key in queryPwd) {
        params.append(key, queryPwd[key]);
    }
    return request.post('/card/delete', params);
}

// 获取个人账单
export const billListService = (params) => {
    return request.get('/card/allBill', {params:params});
}

// 获取所有校园卡信息
export const cardListService = (params) => {
    return request.get('/card/manageCard', {params:params});
}
