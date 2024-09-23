/**
 *  埋点
 * @returns
 */

import { sendBuringPoint } from '@/api/genericApi'
import { useStore } from 'vuex'
import { computed } from 'vue'
import env from '@/util/env'
import { ClientInfo, sysVersion } from '@/util/constants'
// import { customizeDateToFormat } from '@/util/index'

export default function () {
  const store = useStore()
  const user = computed(() => store.state.user.user)
  const envPlatform = env.inEnv()

  const commonParams = {
    userId: user.value.id,
    phone: user.value.phone,
    phoneSystem: envPlatform,
    serverVersion: sysVersion,
    appVersion: ClientInfo.outAppVersion,
    channels: ClientInfo.channel
  }
  /**
   * @param  point_name 埋点时间,
   */
  const sendBuried = (data) => {
    const params = {
      ...data,
      ...commonParams
    }
    sendBuringPoint(params)
  }
  return {
    sendBuried
  }
}
