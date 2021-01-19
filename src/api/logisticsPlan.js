import { postRequest, getRequest } from './common'
import { logistics as baseUrl, freight, product, mould } from './api'

//  获取可指定方案的货运要求信息
export const apiGetFreight = (data) => {
    return getRequest(`${freight}/freight/get-freight`, data)
}
//  获取货运要求下路线信息
export const apiGetRoute = (data) => {
    return getRequest(`${freight}/freight/get-route`, data)
}
// 根据货运需求编号获取方案路线
export const apiGetFreightAbout = (data) => {
    return getRequest(`${freight}/freight/get-freight-match`, data)
}
//  查询物流方案列表(带查询条件)
export const apiGetSchemeList = (data) => {
    return postRequest(`${baseUrl}/search/get-scheme`, data)
}
//  查询物流方案基础信息
export const apiGetGenerateScheme = (data) => {
    return getRequest(`${baseUrl}/generate/get-scheme`, data)
}
//  查询物流方案详情
export const apiGetSchemeDetail = (data) => {
    return getRequest(`${baseUrl}/detail/get-scheme-detail`, data)
}
//  查询产品下面的班期
export const apiGetServerSchedule = (data) => {
    return getRequest(`${product}/server/schedule`, data)
}
//  查询场所下面的作业时间范围
export const apiGetStationOperationTime = (data) => {
    return getRequest(`${mould}/stations/station-operation-time`, data)
}
// 查询产品下面的场景
export const apiGetSceneList = (data) => {
    return postRequest(`${product}/server/query-sceneList`, data)
}
// 查询产品场景下面的基础任务附加任务
export const apiGetSceneTask = (data) => {
    return postRequest(`${product}/server/query-scene-task`, data)
}
// 反馈方案
export const apiFeedbackScheme = (data) => {
    return postRequest(`${baseUrl}/operate/feedback-scheme`, data)
}
// 删除方案
export const apiDeleteScheme = (data) => {
    return postRequest(`${baseUrl}/operate/delete-scheme`, data)
}
// 确认方案基本详情
export const apiSchemeDetailModify = (data) => {
    return getRequest(`${baseUrl}/detail/scheme-detail-modify`, data)
}
// 确认方案
export const apiModifyScheme = (data) => {
    return postRequest(`${baseUrl}/confirm/modify-scheme`, data)
}
// 客户推荐方案列表
export const apiMatchingGetSchemeEnt = (data) => {
    return postRequest(`${baseUrl}/matching/get-scheme-ent`, data)
}
// 销售调度推荐方案列表
export const apiMatchingGetScheme = (data) => {
    return postRequest(`${baseUrl}/matching/get-scheme`, data)
}
// 推荐方案
export const apiRecommendScheme = (data) => {
    return postRequest(`${baseUrl}/operate/recommend-scheme`, data)
}
// 方案不适用/隐藏
export const apiHideInapplicable = (data) => {
    return postRequest(`${baseUrl}/operate/hide-inapplicable`, data)
}
// 取消方案隐藏
export const apiRemoveHide = (data) => {
    return postRequest(`${baseUrl}/operate/remove-hide`, data)
}
// 同意/拒绝推荐方案
export const apiAgreeRefuse = (data) => {
    return postRequest(`${baseUrl}/operate/agree-refuse`, data)
}
// 生成方案
export const apiGenerateScheme = (data) => {
    return getRequest(`${baseUrl}/generate/generate-scheme`, data)
}
// 生成方案查询列表
export const apiGetSchemeDataList = (data) => {
    return postRequest(`${baseUrl}/generate/get-scheme-list`, data)
}
