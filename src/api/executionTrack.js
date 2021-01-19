/* eslint-disable */

import http from '@/libs/http'
import { Message } from 'view-design'
import {
    product as productUrl,
} from './api'
const replaceNull = (obj) => {
    for (let key in obj) {
        switch (Object.prototype.toString.call(obj[key]).slice(8, -1)) {
            case 'Object':
                replaceNull(obj[key])
                break
            case 'Array':
                for (let i = 0; i < obj[key].length; i++) {
                    replaceNull(obj[key][i])
                }
                break
            default:
                if (
                    obj[key] === null ||
                    obj[key] == 'null' ||
                    obj[key] == 'null,null,null'
                )
                    obj[key] = undefined
        }
    }
}
const getRequest = (url, path = {}, params = {}) => {
    let api = url
    if (path && Object.keys(path)) {
        Object.keys(path).forEach((item) => {
            api = api + `/${path[item]}`
        })
    }
    return http.get(api, params).then((res) => {
        if (res.code === '200') {
            replaceNull(res)
            return res
        } else if (res.code === '30002') {
            replaceNull(res)
            throw res
        } else {
            Message.info({ content: res.msg })
            replaceNull(res)
            throw res
        }
    })
}
const postRequest = (url, { path = {}, data = {} } = {}) => {
    let api = url
    if (path && Object.keys(path)) {
        Object.keys(path).forEach((item) => {
            api = api + `/${path[item]}`
        })
    }
    return http.post(api, { data: data }).then((res) => {
        if (res.code === '200') {
            replaceNull(res)
            return res
        } else {
            Message.info({ content: res.msg })
            replaceNull(res)
            throw res
        }
    })
}

//  查询订单列表/order/get-order-list（供应商）
export const apiGetOrderList = (data) => {
    return postRequest(`${productUrl}/order/get-order-list`, data)
}
//  订单的状态改变order/modify-order-status
export const apiModifyOrderStatus = (data) => {
    return postRequest(`${productUrl}/order/modify-order-status`, data)
}
//  订单批量删除/order/get-order-list
export const apiDeleteOrderList = (data) => {
    return postRequest(`${productUrl}/order/delete-order-list`, data)
}
//  订单接收/order/reception-order
export const apiReceptionOrder = (data) => {
    return postRequest(`${productUrl}/order/reception-order`, data)
}
//  订单拒绝/order/refuse-order
export const apiRefuseOrder = (data) => {
    return postRequest(`${productUrl}/order/refuse-order`, data)
}
// 查询订单下的场景信息
export const apiSingleSenceInfo = (data) => {
    return getRequest(`${productUrl}/record/get-plan-scene`,data)
}
// 保存场景信息及执行反馈数据
export const apiSaveSenceInfo = (data) => {
    return postRequest(`${productUrl}/record/add-execute-scene-feedback`,data)
}