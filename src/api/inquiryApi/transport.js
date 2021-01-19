import { postRequest } from '../common'
import { inquiry as baseUrl } from '../api'

// 运输回执录入
export const addReceipt = data => {
    return postRequest(`${baseUrl}/receipt/transport`, data)
}
