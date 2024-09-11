// 导入request.js
import request from '@/utils/request.js'

// 结算
export const settleService = (params) => {
    return request.get('/bill/settle', {params:params});
}

// 查看结算状态
export const checkSettledService = (params) => {
    return request.get('/bill/isSettled', {params:params});
}

// 所有结算单
export const billListService = (params) => {
    return request.get('/bill/manageBill', {params:params});
}

// 手动全部结算
export const settleAllService = () => {
    return request.get('/bill/manageSettle');
}