class Env {
  // 判断当前的环境是处于小程序还是ios还是android
  /**
   * @returns {String} ios android miniprogram
   */
  inEnv() {
    const u = window.navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
      return 'android'
    }
    if (isiOS) {
      return 'ios'
    }
    return 'android'
  }
}
export default new Env()
