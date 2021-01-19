import { postRequest } from './common'
import { assign as baseUrl } from './api'

// 调度列表查询
export const apiQueryDisList = (data) => {
    return postRequest(`${baseUrl}/dispatch/dis-list`, data)
}
// 编辑角色派单条件
export const apiEdit = (data) => {
    return postRequest(`${baseUrl}/dispatch/edit`, data)
}
// 关联客户列表查询
export const apiQueryEntList = (data) => {
    return postRequest(`${baseUrl}/dispatch/ent-list`, data)
}
// 销售列表查询
export const apiQuerySales = (data) => {
    return postRequest(`${baseUrl}/dispatch/sale-list`, data)
}
// 查询待派单到调度列表
export const apiQueryDisPending = (data) => {
    return postRequest(`${baseUrl}/manual/dis-pending`, data)
}
// 查询待派单到销售列表
export const apiQuerySalePending = (data) => {
    return postRequest(`${baseUrl}/manual/sale-pending`, data)
}
