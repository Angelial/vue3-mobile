<template>
  <div class="login-page">
    <header-bar @back="onBuried('close_login', '登录页面关闭')" />

    <div class="info-tips">
      <h3 class="title">Login with SMS code</h3>
      <p class="subtitle">Unregistered numbers will be automatically</p>
      <p class="subtitle">registered after verification</p>
    </div>

    <van-form @submit="onSubmit">
      <cell-group :inset="true">
        <h5 class="name">Mobile Number</h5>
        <field
          class="my-field"
          v-model="phone"
          name="phone"
          type="number"
          :border="false"
          maxlength="10"
          label-width="50"
          placeholder="10-Digit Mobile Number"
        >
          <template #label>
            <span class="pre-text">{{ preLabel }}</span>
          </template>
        </field>
        <h5 class="name">Verification Code</h5>
        <field
          class="my-field"
          v-model="verifiCode"
          name="verifiCode"
          maxlength="6"
          type="number"
          :border="false"
          placeholder="Verification Code"
        >
          <template #button>
            <span v-if="time < 60" class="text">{{ time }}s </span>
            <span v-else class="text" @click="sendVerify"> Obtain </span>
          </template>
        </field>
      </cell-group>

      <div class="privacy-policy">
        <Checkbox
          v-model="isPolicy"
          icon-size="20px"
          checked-color="#000"
          @change="changePolicy"
        >
          I have read and agree with the
        </Checkbox>
        <span class="link" @click="goPrivacy">Privacy Policy</span>.
      </div>

      <div style="margin: 16px">
        <van-button
          class="my-button"
          round
          block
          type="primary"
          native-type="submit"
        >
          Login
        </van-button>
      </div>
    </van-form>
  </div>
  <VanDialog
    v-model:show="showDialog"
    close-on-click-overlay
    confirmButtonText="Agree"
    showCancelButton
    cancelButtonText="No"
    @cancel="onBuried('check_login_privacy_0', '登录页面反勾选协议')"
    @confirm="onPrivacy"
  >
    <div class="agree-content">
      By logging in, you agree to accept our
      <em @click="goService">Service Agree</em>
      and
      <em @click="goPrivacy">Privacy Policy</em>.
    </div>
  </VanDialog>
</template>

<script lang="ts">
import { getSmsLoginVerifiCode } from '@/api/genericApi'
import { defineComponent, ref, onBeforeMount } from 'vue'
import { Field, CellGroup, Form, Button, Toast, Checkbox, Dialog } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import HeaderBar from '@/components/HeaderBar.vue'
import useBuried from '@/mixins/buried'

const VanDialog = Dialog.Component

export default defineComponent({
  components: {
    Field,
    CellGroup,
    VanForm: Form,
    VanButton: Button,
    HeaderBar,
    Checkbox,
    VanDialog
  },
  setup() {
    const phone = ref('')
    const verifiCode = ref('')
    const preLabel = ref('+63')
    const time: any = ref(60)
    const isPolicy = ref(false)
    const showDialog = ref(false)

    const show = ref(false)
    const router: any = useRouter()
    const store = useStore()

    const { sendBuried } = useBuried()

    const onBuried = (pointType, pointName) => {
      sendBuried({ pointType, pointName })
    }

    const onSubmit = async (values) => {
      if (!values.phone) {
        Toast('Please fill in your phone number！')
        return
      }
      if (!/^9\d{9}$/.test(phone.value)) {
        Toast('kindly provide your 10 digit phone number that begins with 9.')
        return
      }
      if (!values.verifiCode) {
        Toast('Please fill in the verification Code')
        return
      }
      if (!isPolicy.value) {
        // Toast('Please check the agreement!')
        showDialog.value = true
        return
      }
      store
        .dispatch('user/login', {
          ...values
        })
        .then((r) => {
          if (r) {
            router.push({ name: 'Mall' })
          }
        })

      onBuried('press_login_button', '登录页面点击登录按钮')
    }

    const onPrivacy = () => {
      isPolicy.value = true
      onSubmit({ phone: phone.value, verifiCode: verifiCode.value })
    }

    const sendVerify = async () => {
      if (!phone.value) {
        Toast('Please fill in your phone number！')
        return
      }
      if (!/^9\d{9}$/.test(phone.value)) {
        Toast('kindly provide your 10 digit phone number that begins with 9.')
        return
      }
      const response: any = await getSmsLoginVerifiCode(phone.value, 1)
      if (response.code === 0) {
        Toast('Sent successfully！')
        stepsTimer()
      } else if (response.code === 400) {
        Toast(response.message)
      }
    }

    const goPrivacy = () => {
      router.push({
        name: 'Privacy',
        query: {
          type: 'h5'
        }
      })
    }
    const goService = () => {
      router.push({
        name: 'Serve',
        query: {
          type: 'h5'
        }
      })
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

    onBeforeMount(async () => {
      onBuried('show_login', '登录页面曝光')
    })
    const changePolicy = (value) => {
      if (value) {
        onBuried('check_login_privacy_1', '勾选登录页面勾选隐私协议')
      } else {
        onBuried('check_login_privacy_0', '登录页面反勾选隐私协议')
      }
    }
    return {
      phone,
      verifiCode,
      show,
      preLabel,
      time,
      isPolicy,
      showDialog,
      onSubmit,
      sendVerify,
      goPrivacy,
      onBuried,
      goService,
      onPrivacy,
      changePolicy
    }
  }
})
</script>

<style lang="less" scoped>
.agree-content {
  padding: 20px;
  em {
    text-decoration: underline;
  }
}
.info-tips {
  padding: 0 20px;
  margin-bottom: 25px;
  .title {
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #000000;
    margin-bottom: 6px;
  }
  .subtitle {
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.24px;
    color: #7e8d9b;
  }
}
.name {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  padding-left: 6px;
  margin-bottom: 8px;
}
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
