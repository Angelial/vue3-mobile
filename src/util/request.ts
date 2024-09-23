import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { ClientInfo, ClientSecret, sysVersion } from './constants'
import { getToken } from '@/util/storage'
import { Toast } from 'vant'
import router from '@/router'
import store from '@/store'
let loadingToast: any = null

const ignoreUrlLoginToast = [
  '/api/sys/getConfig',
  '/api/user/info',
  '/api/buringPoint/push'
]

const sign = require('@/util/sign')
const service = axios.create({
  // 联调  http://mysteryboxes.mojomojo.net
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://mysteryboxes.mojomojo.net'
      : process.env.NODE_ENV === 'test'
      ? 'http://dev.mojo-java.leapgen.net'
      : '/api',
  // 是否跨站点访问控制请求
  withCredentials: false,
  timeout: 30000,
  headers: {
    // php 的 post 传输请求头一定要这个 不然报错 接收不到值
    'Content-Type': 'application/json;charset=UTF-8'
  },
  transformRequest: [
    (data) => {
      data = JSON.stringify(data)
      return data
    }
  ],
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  },
  transformResponse: [
    (data) => {
      if (typeof data === 'string' && data.startsWith('{')) {
        data = JSON.parse(data)
      }
      return data
    }
  ]
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const hasIgnore = ignoreUrlLoginToast.filter(
      (item: string) => item === config.url
    )
    if (!hasIgnore.length) {
      loadingToast = Toast.loading({
        duration: 0,
        forbidClick: true
      })
    }
    const timestamp: any = new Date().getTime()
    const nonce: any = Math.round(Math.random() * 1000)

    const signature = sign.sign(
      {
        timestamp,
        nonce,
        ...ClientInfo
      },
      ClientSecret
    )
    // 获取token，并将其添加至请求头中
    const token = getToken()
    config.headers = {
      Authorization: `Bearer ${token}`,
      sign: signature,
      timestamp,
      nonce,
      sysVersion,
      ...ClientInfo,
      'Content-Type': 'application/json;charset=UTF-8'
    }
    return config
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    loadingToast && loadingToast.clear()
    if (
      response?.data['code'] !== 0 &&
      response?.data['code'] !== 400 &&
      response?.data['code'] !== 300 &&
      response?.data['code'] !== 60218
    ) {
      Toast(response?.data['message'])
    }
    if (response?.data['code'] === 401 || response?.data['code'] === 10003) {
      // token过期，重新登录
      store.dispatch('user/clear', true)
      router.push({ name: 'MojoLogin' })
    }
    return response?.data
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('repeated request: ' + error.message)
    } else {
      // handle error code
      // 错误抛到业务代码
      error.data = {}
      error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    }
    return Promise.reject(error)
  }
)

export default service
