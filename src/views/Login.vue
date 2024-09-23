<template>
  <div class="login-page">
    <nav-bar
      left-text="MojoMojo"
      left-arrow
      fixed
      placeholder
      safe-area-inset-top
    />
    <img class="poster" src="@/assets/images/login-banner.jpg" />
    <van-form @submit="onSubmit">
      <cell-group :inset="true">
        <field
          class="my-field"
          v-model="phone"
          name="phone"
          :border="false"
          maxlength="10"
          label-width="50"
          placeholder="10-Digit Mobile Number"
        >
          <template #label>
            <span class="pre-text">{{ preLabel }}</span>
          </template>
        </field>
        <field
          class="my-field"
          v-model="verifiCode"
          name="verifiCode"
          :border="false"
          placeholder="Verification Code"
        >
          <template #button>
            <span v-if="time < 60" class="text">{{ time }}s </span>
            <span v-else class="text" @click="sendVerify"> Obtain </span>
          </template>
        </field>
      </cell-group>
      <div style="margin: 16px">
        <van-button
          class="my-button"
          round
          block
          type="primary"
          native-type="submit"
        >
          Download to get rewards
        </van-button>
      </div>
    </van-form>
    <action-sheet
      class="my-action"
      v-model:show="show"
      :actions="actions"
      @select="onSelect"
      safe-area-inset-bottom
    />

    <div
      v-if="isShowTip"
      class="tip-box"
      :class="{ top: envDevice === 'android', bottom: envDevice === 'ios' }"
    >
      Click the
      {{ envDevice === 'ios ' ? 'lower-right' : 'upper-right' }} corner to open
      with your browser.
      <icon class="close" name="cross" @click="hideTip" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  getSmsLoginVerifiCode,
  sendLogin,
  fetchDownload
} from '@/api/genericApi'
import { defineComponent, ref } from 'vue'
import {
  NavBar,
  Field,
  CellGroup,
  Form,
  Button,
  ActionSheet,
  Toast,
  Icon
} from 'vant'
import { useRoute } from 'vue-router'
import env from '@/util/env'

declare var document: Document & { webkitHidden: any }

export default defineComponent({
  components: {
    NavBar,
    Field,
    CellGroup,
    VanForm: Form,
    VanButton: Button,
    ActionSheet,
    Icon
  },
  setup() {
    const phone = ref('')
    const verifiCode = ref('')
    const preLabel = ref('+63')
    const time: any = ref(60)
    const isShowTip = ref(false)
    const envDevice = ref('')

    const u = navigator.userAgent
    isShowTip.value = u.indexOf('FBAN') > -1 || u.indexOf('FB') > -1

    const actions = [{ name: '+62' }, { name: '+86' }, { name: '+72' }]
    const show = ref(false)
    const router: any = useRoute()
    const userId = router.query?.userId
    const shareSource = router.query?.type
    let isOldUser = false
    let downloadAddress = {}
    const getAddress = async () => {
      const response = await fetchDownload()
      const address = JSON.parse(response.data['pull_new_app_download_url'])
      downloadAddress = address
    }
    envDevice.value = env.inEnv()
    getAddress()

    const onSubmit = async (values) => {
      if (!values.phone) {
        Toast('Please fill in your phone number！')
        return
      }
      if (!/^9\d{9}$/.test(phone.value)) {
        Toast('The phone number must be 10 digits.')
        return
      }
      if (!values.verifiCode) {
        Toast('Please fill in the verification Code')
        return
      }
      const response: any = await sendLogin({
        ...values,
        inviteeUserId: userId,
        shareSource
      })
      if (response.code === 0 && !isOldUser) {
        Toast('You have successfully signed up!')
        toApp()
      }
    }
    // TODO: 选择手机区号
    const onSelect = (item) => {
      show.value = false
      console.log(item.name)
      preLabel.value = item.name
    }

    const sendVerify = async () => {
      if (!phone.value) {
        Toast('Please fill in your phone number！')
        return
      }
      if (!/^9\d{9}$/.test(phone.value)) {
        Toast('The phone number must be 10 digits.')
        return
      }
      const response: any = await getSmsLoginVerifiCode(phone.value)
      if (response.code === 0) {
        Toast('Sent successfully！')
        stepsTimer()
      } else {
        if (
          response.message === 'This number already registered with MojoMojo.'
        ) {
          isOldUser = true
          toApp()
        }
      }
    }

    let timer = null
    const stepsTimer = () => {
      if (timer) clearInterval(timer)
      timer = setInterval(() => {
        time.value--
        if (time.value <= 0) {
          time.value = 60
          clearInterval(timer)
          return
        }
      }, 1000)
    }

    const toApp = () => {
      const _env = env.inEnv()
      const _clickTime = new Date().getTime()
      window.location.href = 'mojomojo://' /*** 打开app的协议，mojomojo:// ***/

      // 启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
      let _count = 0
      let intHandle
      intHandle = setInterval(function () {
        _count++
        let elsTime = new Date().getTime() - _clickTime
        if (_count >= 100 || elsTime > 5000) {
          clearInterval(intHandle)
          // 检查app是否打开
          if (document.hidden || document.webkitHidden) {
            // 打开了
            window.close()
            location.reload()
          } else {
            if (_env === 'android') {
              window.location.href = downloadAddress['google_address']
            } else {
              window.location.href = downloadAddress['ios_address']
            }
          }
        }
      }, 50)
    }
    const hideTip = () => {
      isShowTip.value = false
    }

    return {
      phone,
      verifiCode,
      actions,
      show,
      preLabel,
      time,
      envDevice,
      isShowTip,
      onSubmit,
      onSelect,
      sendVerify,
      hideTip
    }
  }
})
</script>

<style lang="less" scoped>
.login-page {
  padding: 10px 0;
}
.poster {
  display: block;
  width: 345px;
  height: 160px;
  margin: 0 auto 25px;
}
.my-field {
  height: 48px;
  background: #eee;
  border-radius: 24px;
  margin-bottom: 15px;
}
.pre-text {
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #7e8d9b;
}
.text {
  display: inline-block;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #7e8d9b;
  width: 80px;
  padding-left: 25px;
  border-left: 0.6px solid #ccc;
}
.my-button {
  height: 48px;
  background: #000000;
  border-radius: 24px;
  border: none;
}
.tip-box {
  position: fixed;
  left: 50%;
  width: 350px;
  font-size: 12px;
  color: #fff;
  text-align: right;
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  transform: translateX(-50%);
  z-index: 999;
  &.top {
    top: 10px;
  }
  &.bottom {
    bottom: 10px;
  }
}
</style>
