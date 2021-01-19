import { postRequest } from '../common'
import { enterpriseCenterGate as baseUrl } from '../api'

// 分页查询企业列表信息
export const apiQueryPage = (data) => {
    return postRequest(`${baseUrl}/enterprise-company/company-list`, data)
}

// 获取企业详情
export const apiQueryDetails = (data) => {
    return postRequest(`${baseUrl}/enterprise-company/details`, data)
}

// 企业审核
export const apiReview = (data) => {
    return postRequest(`${baseUrl}/enterprise-company/review`, data)
}
