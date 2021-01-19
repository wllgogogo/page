import { postRequest, getRequest } from '../common'
import { mould as baseUrl, sourceData } from '../api'

// 分页查询协同协作管理基础信息
export const apiQueryCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/get-synergistic-list`, data)
}
// 新增协同协作管理
export const apiAddCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/add-synergistic`, data)
}
// 协同协作管理启用申请
export const apiEnableCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/apply-for-enable-synergistic-batch`, data)
}
// 协同协作管理停用申请
export const apiDisableCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/apply-for-disable-synergistic-batch`, data)
}
// 协同协作管理启用审核通过
export const apiEnableExamPassCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/apply-for-audit-synergistic-batch`, data)
}
// 协同协作管理启用审核不通过
export const apiEnableExamFailCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/apply-for-audit-synergistic-batch`, data)
}
// 协同协作管理停用审核通过
export const apiDisableExamPassCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/apply-for-audit-synergistic-batch`, data)
}
// 协同协作管理停用审核不通过
export const apiDisableExamFailCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/apply-for-audit-synergistic-batch`, data)
}
// 协同协作管理编辑
export const apiModifyCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/modify-synergistic`, data)
}
// 协同协作管理删除
export const apiDelCollaboration = data => {
    return postRequest(`${baseUrl}/synergistic/delete-synergistic`, data)
}
// 协同协作管理编辑详情
export const getQueryCollaboration = (data) => {
    return getRequest(`${baseUrl}/synergistic/get-synergistic-detail`, data)
}
// 协同协作管理关联场景
export const getScenes = (data) => {
    return postRequest(`${baseUrl}/scene/excp-syn`, data)
}
// 协同协作管理详情
export const getDetail = (data) => {
    return getRequest(`${baseUrl}/synergistic/get-synergistic-detail`, data)
}
// 协同协作管理-数据项
export const getSourceData = (data) => {
    return postRequest(`${sourceData}/dictionary/dictionary-parameter`, data)
}
