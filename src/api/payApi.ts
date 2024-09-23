import request from '@/util/request'

export const fetchPayTypeList = () => {
  const response = request({
    url: '/api/pay/getPayTypeListV3',
    method: 'get'
  })
  return response
}

export const recalculatePrice = (params) => {
  const response = request({
    url: '/api/order/recalculatePrice',
    method: 'get',
    params
  })
  return response
}

export const fetchPayResult = (reqId) => {
  const response = request({
    url: '/api/skypay/getPayResult',
    method: 'get',
    params: {
      reqId,
      isAppletPay: 0
    }
  })
  return response
}

export const submitOrderList = (data) => {
  const response = request({
    url: '/api/order/prePayNew',
    method: 'post',
    data
  })
  return response
}

export const cancelPay = (data) => {
  const response = request({
    url: '/api/order/cancelPay',
    method: 'post',
    data
  })
  return response
}

export const queryThirdPayStatus = (data) => {
  const response = request({
    url: 'api/order/submitOrderList',
    method: 'post',
    data
  })
  return response
}

export const fetchOrderDetail = (id) => {
  const response = request({
    url: 'api/order/applicateOrderList',
    method: 'get',
    params: {
      id
    }
  })
  return response
}

export const fetchOffline = (orderBaseId, channel) => {
  const response = request({
    url: 'api/skypay/selectOrderPayCode',
    method: 'get',
    params: {
      orderBaseId,
      channel
    }
  })
  return response
}
