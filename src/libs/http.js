import axios from 'axios'
import qs from 'qs'
import { Message } from 'view-design'
// import store from '@/store/index.js'

axios.defaults.withCredentials = true
axios.defaults.timeout = 30000
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
const baseURL = process.env.VUE_APP_API

const instance = axios.create({
    baseURL: baseURL,
    transformResponse: [
        function(r) {
            let res = r
            try {
                res = JSON.parse(r)
            } catch (e) {
                // throw e
            }
            if (res.error) {
                // 网络请求出错
                throw res
            } else {
                return res
            }
        }
    ]
})

// pendingRequest: 存放请求中的request
const pendingRequest = []
// 取消重复请求
function cancelCurrentRequest(config) {
    if (pendingRequest && pendingRequest.length > 0) {
        for (const i in pendingRequest) {
            // 当前request正在请求中
            if (config.url === pendingRequest[i].config.url) {
                pendingRequest[i].c()
                pendingRequest.splice(i, 1)
            }
        }
    }
}

// axios.CancelToken，取消请求
const CancelToken = axios.CancelToken

instance.interceptors.request.use(
    config => {
        // 在index.html文件里添加第三方文件，获取本地ip
        cancelCurrentRequest(config)
        config.cancelToken = new CancelToken(c => {
            // 有些接口在页面里就是要重复调用，所以这里处理一下，排除该接口
            // 根据应用code获取菜单的接口（menuInfoQueryByAppCode），在左侧菜单栏和菜单管理页面都有请求
            // 获取国家省市区级联的接口（get-country）
            if (!/menuInfoQueryByAppCode|get-country|get-execute-feedback|dictionary-parameter/.test(config.url)) {
                pendingRequest.push({ config, c })
            }
        })
        // store.dispatch('setRequestLoading', true)
        // 不需要传递token的请求
        if (!/authentication|sms|register|getAllDictionary/.test(config.url)) {
            // config.headers['Auth-Token'] = window.localStorage.getItem('accessToken')
            config.headers.Authorization = window.localStorage.getItem('accessToken')
        }
        // 登录接口要传一个默认token
        if (config.url === '/loginApi/authGate/oauth/token') {
            config.headers.Authorization = 'Basic ZnJhbWV3b3JrOjEyMzQ1Ng=='
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        } else {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        }
        // config.headers['Accept-Language'] = store.state.language
        return config
    },
    error => {
        // store.dispatch('setRequestLoading', 0)
        Promise.reject(error)
    }
)
// eslint-disable-next-line
let reRequestConfig = ''
instance.interceptors.response.use(
    // 成功
    res => {
        // 请求成功后，清除pendingRequest里的当前request
        cancelCurrentRequest(res.config)
        // store.dispatch('setRequestLoading', false)

        // code非200，提示信息
        const resData = res.data
        let content = ''
        if (!resData) {
            content = '出错了，但是没有错误信息！'
        } else {
            content = resData.addtionalMessage || resData.message
        }

        // 警告信息（例：表单验证未通过）
        // code是后端根据技术统一规则定义，是不固定的
        if (resData.code !== '200') {
            // 百度地图接口
            if (resData.status === 0 && resData.result) {
                resData.code = '200'
                return res
            }
            // 登录接口的格式跟规范不一样，没有code、message
            if (resData.access_token) {
                resData.code = '200'
                return res
            }
            Message.warning({
                content,
                duration: 1.2,
                closable: true
            })
            // refreshToken过期
            if (resData.code === '500' && resData.message === 'refresh token无效') {
                // code === '500'，代表refreshToken过期，需要重新登录
                localStorage.clear()
                const redirect = encodeURIComponent(`${location.search}`)
                location.href = `${location.origin}/login?redirect=${redirect}`
            }
            return Promise.reject(res.data)
        }
        return res
    },
    // 失败
    err => {
        // http status错误状态码
        // 500 很抱歉，系统内部异常，请联系网站管理员
        // 404 很抱歉，资源未找到
        // 403 很抱歉，您暂无该操作权限
        // 401 很抱歉，认证已失效，请重新登录

        const errorStatus = err.response && err.response.status
        // 无该操作权限
        if (errorStatus === 403) {
            Message.info({
                contentL: '很抱歉，您暂无该操作权限！',
                duration: 1.2,
                closable: true
            })
        }
        // token过期
        if (errorStatus === 401) {
            reRequestConfig = err.config
            getNewToken()
        }
    }
)

function errorCallback(e) {
    // 取消请求时，message信息为空
    if (e.massage === undefined) {
        return Promise.reject(e)
    }
    // token过期
    if (e.code !== '700') {
        try {
            const d = e && e.response && e.response.data
            if (!d) {
                Message.info({
                    content: '网络请求出错了...',
                    duration: 1.2,
                    closable: true
                })
                return Promise.reject(e)
            }
        } catch (e) {
            Message.info({
                content: '出现了奇怪且不可描述的问题',
                duration: 1.2,
                closable: true
            })
        }
    }
    return Promise.reject(e)
}

export function getNewToken() {
    const url = `${process.env.VUE_APP_LOGIN_API}/authGate/oauth/token`
    const data = qs.stringify({
        refresh_token: localStorage.getItem('refreshToken').split(' ')[1],
        grant_type: 'refresh_token'
    })
    instance.post(url, data).then(({ data }) => {
        const [accessToken, refreshToken] = [`${data.token_type}${' '}${data.access_token}`, `${data.token_type}${' '}${data.refresh_token}`]
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        // 重置请求头的token
        reRequestConfig.headers.Authorization = accessToken
        afterGetToken(reRequestConfig)
    })
    // }).catch(err => {
    //     Message.info({
    //         content: err.message + '请重新登录',
    //         duration: 1.2,
    //         closable: true
    //     })
    // })
}

/* 展示页面 + 填写页面（需中途发出请求／不需中途发请求）
 * 1.展示页面：只需重新发起请求即可，再次请求成功后不需请求提示，且需重载页面展示内容（实际上重载页面即可）
 * 2.中途不发请求的填写页面：再次自动保存时发起请求，且需要提示语（可重载可不重载）
 * 3.中途会发请求的填写页面：重新发起请求，不需要提示，并保存填写内容到store中（不需要重载即可实现）
 * 除了3不做重载，其他均做，区分3在于请求接口的特殊性（/dictionary/getDictionaryAddressTree，/service/node/getAreaNodes）
 */
// eslint-disable-next-line
function afterGetToken(requestConfig) {
    // 不需重载的
    if (/dictionary\/getDictionaryAddressTree|node\/getAreaNodes/.test(requestConfig.url)) {
        axios(reRequestConfig)
            .then(res => {})
            .catch(err => {
                Message.info({
                    content: err.data ? err.data.message : '出错了...',
                    duration: 1.2,
                    closable: true
                })
            })
        // 需重载的
    } else {
        // 1.2还需要区分是否有提示语
        axios(reRequestConfig)
            .then(res => {
                Message.info({
                    content: res.data.message,
                    duration: 1.2,
                    closable: true
                })
            })
            .catch(err => {
                Message.info({
                    content: err.data ? err.data.message : '出错了...',
                    duration: 1.2,
                    closable: true
                })
            })
    }
}

const http = {
    /**
     * @param {String} api: url请求的地址
     * @param {Object} query:请求时携带的参数
     * @description 对应get请求
     */
    get(api, query) {
        return instance
            .get(api, {
                params: query
            })
            .then(res => {
                return res.data
            })
            .catch(errorCallback)
    },

    /**
     * @param {String} api: url请求的地址
     * @param {Object} query:请求时携带的参数
     * @description 对应delete请求
     */
    delete(api, query) {
        return instance
            .delete(api, {
                params: query
            })
            .then(res => {
                return res.data
            })
            .catch(errorCallback)
    },

    /**
     * @param {String} api: url请求的地址
     * @param {Object} data: 请求时携带的数据，type请求时数据的类型，默认formdata
     * @description 对应post请求
     */
    post(api, { data = {}, type = 'json' } = {}) {
        data = data instanceof FormData || typeof data === 'string' || type !== 'formData' ? data : qs.stringify(data, { arrayFormat: 'brackets' })
        return instance
            .post(api, data)
            .then(res => {
                return res && res.data
            })
            .catch(errorCallback)
    },

    /**
     * @param {String} api: url请求的地址
     * @param {Object} data: 请求时携带的数据，type请求时数据的类型，默认formdata
     * @description 对应put请求
     */
    put(api, { data = {}, type = 'json' } = {}) {
        data = data instanceof FormData || typeof data === 'string' || type !== 'formData' ? data : qs.stringify(data, { arrayFormat: 'brackets' })
        return instance
            .put(api, data)
            .then(res => {
                return res.data
            })
            .catch(errorCallback)
    },

    patch(api, { data = {}, type = 'json' } = {}) {
        data = data instanceof FormData || typeof data === 'string' || type !== 'formData' ? data : qs.stringify(data, { arrayFormat: 'brackets' })
        return instance
            .patch(api, data)
            .then(res => {
                return res.data
            })
            .catch(errorCallback)
    }
}

export default http
