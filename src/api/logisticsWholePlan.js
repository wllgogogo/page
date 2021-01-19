import { postRequest, getRequest } from './common'
import { logisticsPlan as baseUrl, product } from './api'

// 查询全程计划列表
export const apiQueryList = (data) => {
    return postRequest(`${baseUrl}/plan/query-list`, data)
}
//  查询全程计划详情
export const apiGetPlanDetail = (data) => {
    return getRequest(`${baseUrl}/plan/detail`, data)
}
//  查询全程计划场景
export const apiGetDetailScene = (data) => {
    return postRequest(`${baseUrl}/plan/detail-scene`, data)
}
// 同意拒绝计划
export const apiConfirmPlan = (data) => {
    return postRequest(`${baseUrl}/plan/confirm-plan`, data)
}
//  上报全程计划
export const apiReportPlan = (data) => {
    return postRequest(`${baseUrl}/plan/report-plan`, data)
}
//  下发全程计划
export const apiIssuedPlan = (data) => {
    return getRequest(`${baseUrl}/plan/issuedPlan`, data)
}
//  全程计划-查看执行反馈
export const apiGetExecuteFeedback = (data) => {
    return postRequest(`${product}/record/get-execute-feedback`, data)
}
//  异常上报
export const apiAddException = (data) => {
    return postRequest(`${product}/exception/add-exception`, data)
}
//  异常查看
export const apiGetDisposeException = (data) => {
    return postRequest(`${product}/exception/get-dispose-exception`, data)
}
// 异常处理
export const apiHandleException = (data) => {
    return postRequest(`${product}/exception/dispose-exception`, data)
}

// 生成全程计划
export const apiSavePlan = (data) => {
    return postRequest(`${baseUrl}/plan/save`, data)
}

// 货好确认
export const apiGoodSure = (data) => {
    return postRequest(`${baseUrl}/plan/cargo-confirm`, data)
}
