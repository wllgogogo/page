import { postRequest, getRequest } from './common.js'
import { enterpriseCenter as baseUrl, product } from './api'

//  物流文件夹列表
export const apiFolderList = (data) => {
    return postRequest(`${baseUrl}/logistics-folder/list`, data)
}
//  物流文件夹 详情
export const apiFolderDetail = (data) => {
    return getRequest(`${baseUrl}/logistics-folder/details/${data}`)
}

//  查看协同协作
export const apiGetcooperation = (orderCode, sceneCode) => {
    return getRequest(`${product}/get-cooperation/${orderCode}/${sceneCode}`)
}
