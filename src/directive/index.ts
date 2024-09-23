/**
 * v-hasPermi 操作权限处理
 */

import store from '@/store'

export default {
  mounted(el) {
    const permissions = store.getters['user/h5_box_list']
    console.log(permissions)
    const hasPermissions = permissions === 1

    if (!hasPermissions) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
