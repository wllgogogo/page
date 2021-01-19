import { postRequest } from '../common'
import { inquiry as baseUrl } from '../api'

// 分页查询询期询价列表，回执成功列表
export const getList = data => {
    return postRequest(`${baseUrl}/query/list`, data)
}
// 场所回执详情
export const getStationDetail = data => {
    return postRequest(`${baseUrl}/receipt/query-station`, data)
}
// 关务回执详情
export const getCustomsDetail = data => {
    return postRequest(`${baseUrl}/receipt/query-customs`, data)
}
// 运输回执详情
export const getTransportDetail = data => {
    return postRequest(`${baseUrl}/receipt/query-transport`, data)
}
