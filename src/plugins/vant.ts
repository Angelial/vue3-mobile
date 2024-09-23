import { App } from 'vue'
import { Button, NavBar } from 'vant'

const plugins = [Button, NavBar]

const vant = {
  install: function (app: App<Element>) {
    plugins.forEach((item) => {
      app.component(item.name, item)
    })
  }
}

export default vant
