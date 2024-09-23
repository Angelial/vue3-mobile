import request from '@/util/request'

export const getPullNew = (userId) => {
  const response = request({
    url: '/api/pullNew/pullNewPageInfo',
    method: 'get',
    params: {
      userId
    }
  })
  return response
}

export const getAppVersion = (deviceType) => {
  const response = request({
    url: '/Software/GetLatestVersion',
    params: {
      deviceType
    },
    method: 'get'
  })
  return response
}

export const getSmsLoginVerifiCode = (phone, type = 2) => {
  const response = request({
    url: '/api/user/getSmsLoginVerifiCode',
    method: 'get',
    params: {
      phone,
      type
    }
  })
  return response
}

export const sendLogin = ({
  inviteeUserId,
  phone,
  verifiCode,
  shareSource
}) => {
  const response = request({
    url: '/api/user/smsLogin',
    method: 'post',
    data: {
      inviteeUserId,
      phone,
      verifiCode,
      shareSource
    }
  })
  return response
}

export const fetchDownload = () => {
  const response = request({
    url: '/api/sys/getConfig?configKey=pull_new_app_download_url'
  })
  return response
}

export const sendFeedback = (data) => {
  const response = request({
    url: '/api/useradvise/appSave',
    method: 'post',
    data
  })
  return response
}

export const fetchFeedbackList = () => {
  const response = request({
    url: '/api/adviseConfig/list',
    method: 'get'
  })
  return response
}

export const sendBuringPoint = (data) => {
  const response = request({
    url: '/api/buringPoint/push',
    method: 'post',
    data
  })
  return response
}
export function fetchUserInfo() {
  const response = request({
    url: '/api/user/info',
    method: 'get'
  })
  return response
}
/**
 * @description: 退出
 * @param {*}
 * @return {*}
 */
export function logoutApi() {
  const response = request({
    url: '/api/blindBox/newPage',
    method: 'get'
  })
  return response
}

export const fetchXenditPayDebitPay = (data) => {
  const response = request({
    url: '/api/xenditPay/debitPay',
    method: 'post',
    data
  })
  return response
}

/**
 * @param {*} configKey
 * webp_goods 盲盒商品详情--刀 动画
 * mp3_draw_symbol 开箱页音乐
 * order_express_desc 运费说明文案支持配置
 * @returns
 */
export function fetchConfigKey() {
  const response = request({
    url: '/api/sys/getConfig',
    method: 'get',
    params: {
      configKey:
        'webp_goods,mp3_draw_symbol,pull_new_app_download_url,order_express_desc,examine_h5_box,app_check_phone,ios_app_check_user_Id'
    }
  })
  return response
}
export const sendXenditUserPayment = (params) => {
  const response = request({
    url: '/api/xenditPay/getUserPayment',
    method: 'get',
    params
  })
  return response
}

export const sendXenditValidateOTP = (data) => {
  const response = request({
    url: '/api/xenditPay/validateOTP',
    method: 'post',
    data
  })
  return response
}

export const sendXenditResendOTP = (params) => {
  const response = request({
    url: '/api/xenditPay/resendOTP',
    method: 'get',
    params
  })
  return response
}

export const sendCreditCardPay = (data) => {
  const response = request({
    url: '/api/xenditPay/creditCardPay',
    method: 'post',
    data
  })
  return response
}

export const fetchCreditAmount = (params) => {
  const response = request({
    url: '/api/xenditPay/getAmount',
    method: 'get',
    params
  })
  return response
}

export const fetchMyOrder = (params) => {
  const response = request({
    url: '/api/order/myOrderList',
    method: 'get',
    params
  })
  return response
}

export const fetchUserAddress = () => {
  const response = request({
    url: '/api/address/list',
    method: 'get'
  })
  return response
}

export const updateUserAddress = (data) => {
  const response = request({
    url: '/api/address/save',
    method: 'post',
    data
  })
  return response
}

export const fetchAddressList = (params) => {
  const response = request({
    url: '/api/address/getAddressList',
    params
  })
  return response
}

export const fetchMyWare = (params) => {
  const response = request({
    url: '/api/order/myWarehouseList',
    params
  })
  return response
}

export const isPhIp = () => {
  const response = request({
    url: '/api/user/isPhIp'
  })
  return response
}
