import { postRequest, getRequest } from './common'
import { mould as baseUrl } from './api'

// 分页查询 标准集装箱维护
export const apiContainerMaintianList = (data) => {
    return postRequest(`${baseUrl}/containerMaintian/page`, data)
}
// 新增 标准集装箱维护
export const apiSave = (data) => {
    return postRequest(`${baseUrl}/containerMaintian/save`, data)
}
// 修改 标准集装箱维护
export const apiUpdata = (data) => {
    return postRequest(`${baseUrl}/containerMaintian/update`, data)
}
// 查询详情 标准集装箱维护
export const apiGet = (data) => {
    return getRequest(`${baseUrl}/containerMaintian/get`, data)
}
// 批量删除 标准集装箱维护
export const apiRemove = (data) => {
    return postRequest(`${baseUrl}/containerMaintian/remove`, data)
}
