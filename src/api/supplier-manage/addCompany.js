import { postRequest } from '../common'
import { enterpriseCenterGate as baseUrl } from '../api'

// 企业录入
export const apiAddCompany = (data) => {
    return postRequest(`${baseUrl}/enterprise-company/personal-enter`, data)
}
