import { postRequest, getRequest } from './common'
import { mould as baseUrl } from './api'

// 获取hs编码详情信息列表
export const apiShcodeDetailList = (data) => {
    return postRequest(`${baseUrl}/hs-public/get-bypar`, data)
}
// 分页查询hs编码列表
export const apiShcodeList = (data) => {
    return postRequest(`${baseUrl}/hs/page-hs`, data)
}
// 新增hs编码
export const apiAddShcode = (data) => {
    return postRequest(`${baseUrl}/hs/save-hs`, data)
}
// 修改hs编码
export const apiUpdataShcode = (data) => {
    return postRequest(`${baseUrl}/hs/updata-hs`, data)
}
// 获取hs编码详情信息
export const apiGetShcode = (data) => {
    return getRequest(`${baseUrl}/hs/get-hs`, data)
}
// 批量删除hs编码
export const apiRemoveShcodes = (data) => {
    return postRequest(`${baseUrl}/hs/remove-hs`, data)
}
