import { postRequest, getRequest } from '../common'
import { mould as baseUrl } from '../api'

// 分页查询附加任务基础信息
export const apiAffixTaskQuery = (data) => {
    return postRequest(`${baseUrl}/task-affix/query-page`, data)
}
// 新增附加任务
export const apiAffixTaskAdd = (data) => {
    return postRequest(`${baseUrl}/task-affix/add`, data)
}
// 编辑附加任务
export const apiUpdateAffixTask = (data) => {
    return postRequest(`${baseUrl}/task-affix/modify`, data)
}
// 附加任务启用、附加任务启用申请
export const apiAffixTaskEnable = (data) => {
    return postRequest(`${baseUrl}/task-affix/enable`, data)
}
// 附加任务停用、附加任务停用申请
export const apiAffixTaskDisable = (data) => {
    return postRequest(`${baseUrl}/task-affix/disable`, data)
}
// 附加任务启用审核通过
export const apiAffixTaskEnableExamPass = (data) => {
    return postRequest(`${baseUrl}/task-affix/enable-exam-pass`, data)
}
// 附加任务启用审核不通过
export const apiAffixTaskEnableExamFail = (data) => {
    return postRequest(`${baseUrl}/task-affix/enable-exam-fail`, data)
}
// 附加任务停用审核通过
export const apiAffixTaskDisableExamPass = (data) => {
    return postRequest(`${baseUrl}/task-affix/disable-exam-pass`, data)
}
// 附加任务停用审核不通过
export const apiAffixTaskDisableExamFail = (data) => {
    return postRequest(`${baseUrl}/task-affix/disable-exam-fail`, data)
}
// 附加任务详情
export const apiAffixTaskQueryDetail = (data) => {
    return getRequest(`${baseUrl}/task-affix/query-detail`, data)
}
// 获取启用状态数据项信息
export const apiQueryEnableData = (data) => {
    return getRequest(`${baseUrl}/task-affix/query-enable-data`, data)
}
// 删除附加任务
export const apiDelAffixTask = (data) => {
    return postRequest(`${baseUrl}/task-affix/del`, data)
}
