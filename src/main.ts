import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from './plugins/vant'
import 'normalize.css/normalize.css'
import '@/util/WebViewJavascriptBridge.js'
import { Lazyload } from 'vant'
import '@/assets/style/index.less'
import hasPermi from './directive'

import 'lib-flexible'

import '@vant/touch-emulator'
const app = createApp(App)
app.directive('hasPermi', hasPermi)

app
  .use(store)
  .use(router)
  .use(vant)
  .use(Lazyload, { lazyComponent: true })
  .mount('#app')
