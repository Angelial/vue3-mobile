/*
 * @Description: native接口
 *
 */
// const host = 'qiaoshangzhenpin'
// const schema = 'qiaoshangzhenpin'

declare const window: Window & {
  WebViewJavascriptBridge: any
  WVJBCallbacks: any
  webkit: any
}

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback)
  }
  // window.WVJBCallbacks = [callback]
  // const WVJBIframe = document.createElement('iframe')
  // WVJBIframe.style.display = 'none'
  // WVJBIframe.src = 'https://__bridge_loaded__'
  // document.documentElement.appendChild(WVJBIframe)
  // setTimeout(() => {
  //   document.documentElement.removeChild(WVJBIframe)
  // }, 0)
}

class Native {
  /**
   *
   * @param {Object}
   * @example share({
   *  "storeID": 0,
   *  "code": "string",
   *  "name": "string",
   *  "mainImg": "string",
   *  "price": 0,
   *  "count": 0,
   *  "sellCount": 0,
   *  "id": 0,
   *  "createTime": "2020-08-20T05:49:41.288Z"
   * })
   */

  shareIosFacebook() {
    window.webkit.messageHandlers.shareFacebook.postMessage('shareFB')
  }
  shareAndroidFacebook(name, data, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  }
  shareAndroidViber(name, data, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  }

  registerHandler(name, callback) {
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(name, function (data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  }
}

export default new Native()
