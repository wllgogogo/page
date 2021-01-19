import { postRequest, getRequest } from './common'
import { upload as baseUrl, enterpriseCenter } from './api'

// 删除文件
export const deleteUpload = data => {
    return getRequest(`${baseUrl}/file-record/delete-file/${data}`)
}

// 删除db文件记录
export const deleteDb = data => {
    return getRequest(`${baseUrl}/file-record/delete-db/${data}`)
}
// 查询文件记录
export const getFileInfo = data => {
    return getRequest(`${baseUrl}/file-record/detail/${data}`)
}
// 下载文件
export const getFileDown = data => {
    return getRequest(`${baseUrl}/file-record/download/${data}`)
}

// 提交注册
export const registerSubmit = data => {
    return postRequest(`${enterpriseCenter}/enterprise-company/registered`, data)
}
