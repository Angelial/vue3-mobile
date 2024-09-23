import { Toast } from 'vant'
import getLocation from '@/util/map'
/*
 * @Description:
 */
import {
  getToken,
  setToken,
  setUserInfo,
  getUserInfo,
  exit
} from '@/util/storage'
import {
  sendLogin,
  logoutApi,
  fetchConfigKey,
  fetchUserInfo,
  isPhIp
} from '@/api/genericApi'
const url = window.location.href
const tiktok = process.env.VUE_APP_EXAMINE_TIKTOK
const facebook = process.env.VUE_APP_EXAMINE_FACEBOOK

export default {
  state: {
    user: getUserInfo() || {},
    token: getToken(),
    sysConfig: {
      webp_goods: '',
      h5_box_list: 0
    },
    directResult: {}
  },
  getters: {
    tokenVal: (state) => {
      return state.token
    },
    isLogin: (state) => {
      return Boolean(state.token)
    },
    userId: (state) => {
      return state.user.id || 0
    },
    h5_box_list: (state) => {
      return Number(state.sysConfig.h5_box_list)
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_CONFIG: (state, sysConfig) => {
      state.sysConfig = sysConfig
    },
    CLEAR_USER: (state) => {
      state.user = {}
    },
    CLEAR_TOKEN: (state) => {
      state.token = ''
    },
    setDirectResult(state, data) {
      state.directResult = data
    }
  },
  actions: {
    /**
     * 登录
     * @param {*} params
     * @returns
     */
    async login({ commit }, params) {
      const r: any = await sendLogin(params)
      if (r.code === 0) {
        setToken(r.data.token)
        setUserInfo(r.data.userInfo)
        commit('SET_TOKEN', r.data.token)
        if (r.data.type === 2) {
          localStorage.setItem('isNewUser', r.data.type)
          const obj = {
            purchase: true, // 完成购买
            initiateCheckout: true // 发起付款
          }
          console.log(url.indexOf(tiktok))
          if (url.indexOf(tiktok) > -1) {
            const ttq = (window as any).ttq
            ttq.track('CompleteRegistration')

            // TikTok meta pixel 登录成功记录

            localStorage.setItem('meta_pixel', JSON.stringify(obj))
            // TikTok meta pixel 登录成功记录 - ending
          } else if (url.indexOf(facebook) > -1) {
            // facebook meta pixel 登录成功记录
            const fbq = (window as any).fbq

            localStorage.setItem('meta_pixel', JSON.stringify(obj))
            fbq('track', 'CompleteRegistration', {
              content_ids: r.data.userInfo.id,
              content_name: r.data.userInfo.phone,
              status: true
            })
            // facebook meta pixel 登录成功记录 - ending
          }
        } else {
          localStorage.setItem('isNewUser', r.data.type)
          localStorage.removeItem('meta_pixel')
        }
        return r
      } else {
        Toast(r.message)
      }
    },

    /**
     * 获取当前用户信息
     * @returns
     */
    async getUser({ commit }) {
      const r = await fetchUserInfo()
      if (r.data) {
        commit('SET_USER', r.data)
        setUserInfo(r.data)
      }
      return r
    },

    async setConfig({ commit, state }) {
      if (state.sysConfig && state.sysConfig.h5_box_list) {
        return state.sysConfig
      }
      const r: any = await fetchConfigKey()
      if (r && r.data) {
        const response = await isPhIp()
        const isIp = response.data
        const { point } = await getLocation()
        const isPhone = r.data.app_check_phone.indexOf(state.user.phone) === -1
        const isUserId =
          r.data.ios_app_check_user_Id.indexOf(state.user.id) === -1
        if (state.token && isPhone && isUserId) {
          // if (point === 'UNAVAILABLE') {
          //   if (isIp) {
          //     r.data.h5_box_list = 1
          //   } else {
          //     r.data.h5_box_list = 0
          //   }
          // } else if (point === 'PHP') {
          //   r.data.h5_box_list = 1
          // } else if (point === 'NOT') {
          //   r.data.h5_box_list = 0
          // }
          if (point === 'PHP' || isIp) {
            r.data.h5_box_list = 1
          } else {
            r.data.h5_box_list = 0
          }
        } else {
          r.data.h5_box_list = 0
        }
        commit('SET_CONFIG', r.data)
      }
      return r.data
    },
    /**
     * 编辑当前用户信息
     * @param {*} params
     */
    // async editUser({ dispatch }, params) {
    //   const r = await editUserInfoApi(params)
    //   if (r.data !== 1) {
    //     dispatch('getUser')
    //   }
    //   return r
    // },

    /**
     * 退出当前账户
     * @returns
     */
    async logout() {
      const r = await logoutApi()
      return r
    },

    /**
     * 清除登录信息 用户信息
     * @param {*} param0
     * @param {*} flag
     */
    clear({ commit, state }, flag = false) {
      if (flag) {
        commit('CLEAR_TOKEN')
      }
      commit('CLEAR_USER')
      state.sysConfig.h5_box_list = 0
      localStorage.removeItem('meta_pixel')
      localStorage.removeItem('isNewUser')
      exit()
    }
  }
}
