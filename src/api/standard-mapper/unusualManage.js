import { postRequest, getRequest } from '../common'
import { mould as baseUrl, sourceData } from '../api'

// 分页查询异常管理基础信息
export const apiQueryUnusual = data => {
    return postRequest(`${baseUrl}/excp/query-page`, data)
}
// 新增异常管理
export const apiAddUnusual = data => {
    return postRequest(`${baseUrl}/excp/add`, data)
}
// 异常管理启用申请
export const apiEnableUnusual = data => {
    return postRequest(`${baseUrl}/excp/enable`, data)
}
// 异常管理停用申请
export const apiDisableUnusual = data => {
    return postRequest(`${baseUrl}/excp/disable`, data)
}
// 异常管理启用审核通过
export const apiEnableExamPassUnusual = data => {
    return postRequest(`${baseUrl}/excp/enable-exam-pass`, data)
}
// 异常管理启用审核不通过
export const apiEnableExamFailUnusual = data => {
    return postRequest(`${baseUrl}/excp/enable-exam-fail`, data)
}
// 异常管理停用审核通过
export const apiDisableExamPassUnusual = data => {
    return postRequest(`${baseUrl}/excp/disable-exam-pass`, data)
}
// 异常管理停用审核不通过
export const apiDisableExamFailUnusual = data => {
    return postRequest(`${baseUrl}/excp/disable-exam-fail`, data)
}
// 异常管理编辑
export const apiModifyUnusual = data => {
    return postRequest(`${baseUrl}/excp/modify`, data)
}
// 异常管理删除
export const apiDelUnusual = data => {
    return postRequest(`${baseUrl}/excp/del`, data)
}
// 异常管理编辑详情
export const getQueryUnusual = (data) => {
    return getRequest(`${baseUrl}/excp/modify-detail`, data)
}
// 异常管理关联场景
export const getScenes = (data) => {
    return postRequest(`${baseUrl}/scene/excp-syn`, data)
}
// 异常管理详情
export const getDetail = (data) => {
    return getRequest(`${baseUrl}/excp/detail`, data)
}
// 异常管理-数据项
export const getSourceData = (data) => {
    return postRequest(`${sourceData}/dictionary/dictionary-parameter`, data)
}
