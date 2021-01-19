import { postRequest } from './common'
import { receipt as baseUrl } from './api'

/* 订舱计划 */
// 订舱计划列表查询
export const apiBookingList = (data) => {
    return postRequest(`${baseUrl}/booking/list`, data)
}

// 订舱计划生成
export const apiBookingGenerate = (data) => {
    return postRequest(`${baseUrl}/booking/generate`, data)
}

// 订舱计划详情查询
export const apiBookingDetail = (data) => {
    return postRequest(`${baseUrl}/booking/detail`, data)
}

// 订舱计划确认供应商
export const apiReceiptConfirm = (data) => {
    return postRequest(`${baseUrl}/receipt/confirm`, data)
}

// 查询订舱班期信息
export const apiSearchSchedule = (data) => {
    return postRequest(`${baseUrl}/search/schedule`, data)
}

/* 订舱计划回执 */
// 订舱计划回执录入
export const apiReceiptAnalytic = (data) => {
    return postRequest(`${baseUrl}/receipt/analytic`, data)
}

// 订舱计划回执详情
export const apiReceiptDetail = (data) => {
    return postRequest(`${baseUrl}/receipt/detail`, data)
}

/* 订舱邮件 */

// 订舱计划预览
export const apiEmailPreview = (data) => {
    return postRequest(`${baseUrl}/email/preview`, data)
}

// 订舱计划发送
export const apiEmailSend = (data) => {
    return postRequest(`${baseUrl}/email/send`, data)
}

// 获取班期信息
export const apiSearchBookingInfo = (data) => {
    return postRequest(`${baseUrl}/search/booking-info`, data)
}

// 确定报关时间
export const apiReceiptDeclCustoms = (data) => {
    return postRequest(`${baseUrl}/receipt/decl-customs`, data)
}
