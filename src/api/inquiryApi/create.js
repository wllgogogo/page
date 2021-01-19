import { postRequest, getRequest } from '../common'
import { inquiry as baseUrl } from '../api'

// 创建询期询价关务
export const apiGreateCustoms = data => {
    return postRequest(`${baseUrl}/greate/customs`, data)
}
// 创建询期询价综保区关务
export const apiGreateCustomsBond = data => {
    return postRequest(`${baseUrl}/greate/customs-bond`, data)
}
// 创建询期询价综保区场所
export const apiGreateStationBond = data => {
    return postRequest(`${baseUrl}/greate/station-bond`, data)
}
// 创建询期询价场所
export const apiGreateStation = data => {
    return postRequest(`${baseUrl}/greate/station`, data)
}
// 创建询期询价运输服务
export const apiGreateTransport = data => {
    return postRequest(`${baseUrl}/greate/transport`, data)
}
// 生成询期询价初始化
export const apiInquiryInit = data => {
    return getRequest(`${baseUrl}/inquiry/init`, data)
}
// 场所回执模板录入
export const apiCreatePlaceReceipt = data => {
    return postRequest(`${baseUrl}/receipt/station`, data)
}
// 关务回执模板录入
export const apiCreateCustomsReceipt = data => {
    return postRequest(`${baseUrl}/receipt/customs`, data)
}
