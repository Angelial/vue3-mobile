/*
 * @Description: 凭证信息存取
 */
/**
 * @description: token-存储、获取、清除
 * @param {*}
 * @return {*}
 */
const TOKEN_KEY = 'TOKEN'
const USER_KEY = 'USER'
export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY)
  return token
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUserInfo() {
  const user: any = localStorage.getItem(USER_KEY)
  if (user && user !== 'undefined') {
    return JSON.parse(user)
  } else {
    return {}
  }
}
export function setUserInfo(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
export function clearUserInfo() {
  localStorage.removeItem(USER_KEY)
}

/**
 * @description: 清除缓存 退出登录
 * @param {*}
 * @return {*}
 */
export function clear() {
  clearToken()
  clearUserInfo()
}
export function exit() {
  clear()
  clearToken()
}
