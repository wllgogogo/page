import { postRequest, getRequest } from './common'
import { mould as baseUrl } from './api'

// 分页 汇率维护
export const apiContainerMaintianList = (data) => {
    return postRequest(`${baseUrl}/rateDefined/page`, data)
}
// 新增 汇率维护
export const apiSave = (data) => {
    return postRequest(`${baseUrl}/rateDefined/save`, data)
}
// 修改 汇率维护
export const apiUpdata = (data) => {
    return postRequest(`${baseUrl}/rateDefined/update`, data)
}
// 查询详情 汇率维护
export const apiGet = (data) => {
    return getRequest(`${baseUrl}/rateDefined/get`, data)
}
