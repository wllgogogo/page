import { postRequest, getRequest } from '../common.js'
import { system as baseUrl } from '../api'

//  /account/add 新增用户
export const apiAccountAdd = (data) => {
    return postRequest(`${baseUrl}/account/add`, data)
}
//  /account/edit 修改用户
export const apiAccountEdit = (data) => {
    return postRequest(`${baseUrl}/account/edit`, data)
}
//  /account/status 修改用户状态
export const apiAccountStatus = (data) => {
    return postRequest(`${baseUrl}/account/status`, data)
}
//  /account/list 用户分页
export const apiAccountList = (data) => {
    return postRequest(`${baseUrl}/account/list`, data)
}
//  /account/resetPwd 重置密码
export const apiAccountResetPwd = (data) => {
    return postRequest(`${baseUrl}/account/resetPwd`, data)
}
//  /account/delete/1325247818830299138 删除用户
export const apiAccountDelete = (data) => {
    return getRequest(`${baseUrl}/account/delete/`, data)
}
