// 导入request.js
import request from '@/utils/request.js'

// 获取个人账单
export const chargeChartDataService = (params) => {
    return request.get('/charge/chart', {params:params});
}

// 所有充值
export const chargeListService = (params) => {
    return request.get('/charge/manageCharge', {params:params});
}