// 导入request.js
import request from '@/utils/request.js'

// 获取个人账单-报表
export const consumeChartDataService = (params) => {
    return request.get('/consume/chart', {params:params});
}

// 消费
export const consumeService = (consumeData) => {
    // 借助于UrlSearchParams完成传递
    const params = new URLSearchParams();
    for(let key in consumeData) {
        params.append(key, consumeData[key]);
    }
    return request.post('/consume/consume', params);
}

// 商家当日收入
export const todayConsumeService = (params) => {
    return request.get('/consume/todayConsumeStore', {params:params});
}

// 商家未结算账单
export const unsettledBillListService = (params) => {
    return request.get('/consume/unsettledBill', {params:params});
}

// 未结算金额
export const unsettledAmountService = () => {
    return request.post('/consume/unsettledAmount');
}

// 商家已结算账单
export const settledBillListService = (params) => {
    return request.get('/consume/settledBill', {params:params});
}

// 已结算金额
export const settledAmountService = () => {
    return request.post('/consume/settledAmount');
}

// 已结算账单报表
export const settledChartDataService = (params) => {
    return request.get('/consume/settledChart', {params:params});
}

// 所有消费
export const consumeListService = (params) => {
    return request.get('/consume/manageConsume', {params:params});
}
