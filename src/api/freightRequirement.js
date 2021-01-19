import { postRequest, getRequest } from './common'
import { freight as baseUrl, mould } from './api'

// 查询货运要求列表
export const apiQueryFreightList = (data) => {
    return postRequest(`${baseUrl}/freight/list`, data)
}
// 查询货运要求详情
export const apiQueryFreightDetail = (data) => {
    return getRequest(`${baseUrl}/freight/detail`, data)
}

// 发送货运要求
export const apiSendFreight = (data) => {
    return postRequest(`${baseUrl}/freight/send`, data)
}

// 转发货运要求
export const apiRelayFreight = (data) => {
    return postRequest(`${baseUrl}/freight/relay`, data)
}

// 删除货运要求
export const apiDelFreight = (data) => {
    return postRequest(`${baseUrl}/freight/del`, data)
}

// 生成路线
export const apiGenerateRoute = (data) => {
    return postRequest(`${baseUrl}/generate/route`, data)
}

// 录入货运要求
export const apiEnterOperationFreight = (data) => {
    return postRequest(`${baseUrl}/operation-freight/enter`, data)
}

// 修改货运要求
export const apiModifyOperationFreight = (data) => {
    return postRequest(`${baseUrl}/operation-freight/modify`, data)
}

// 完善货运要求
export const apiPerfectOperationFreight = (data) => {
    return postRequest(`${baseUrl}/operation-freight/perfect`, data)
}

// 获取附加任务
export const apiGetSceneAffix = (data) => {
    return postRequest(`${mould}/scene-affix/get`, data)
}
