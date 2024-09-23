<template>
  <div v-if="picUrl" class="pay-info">
    <img :src="picUrl" alt="MojoMojo" class="logo" />
    <p class="tip">Select Account to Pay</p>
  </div>

  <radio-group v-model="checked" class="radio-group">
    <cell-group inset>
      <cell
        v-for="(item, index) in paymentList"
        :key="index"
        :title="item.properties.account_type"
        :label="item.properties.account_details"
        clickable
        :border="false"
        @click="checked = item.id"
      >
        <template #right-icon>
          <radio :name="item.id" checked-color="#000" />
        </template>
      </cell>
    </cell-group>
  </radio-group>
  <footer class="cm-pay-footer-bar">
    <button class="btn" @click="onSubmit">Pay ₱{{ amount }}</button>
  </footer>

  <VanDialog
    v-model:show="show"
    closeOnPopstate
    closeOnClickOverlay
    title="MOBILE VERIFICATION"
    :showConfirmButton="false"
  >
    <p class="dialog-tips">
      Enter the 6-digit OTP we sent to your BPI registered number
      {{ otpMobileNumber }} to continue with your purchase.
    </p>
    <PasswordInput
      :value="code"
      :length="6"
      :mask="false"
      @focus="showKeyboard = true"
    />
    <div class="dialog-tips">
      Didn't receive it?
      <span class="blue" @click="onSendVerify">Resend OTP</span>
      <span v-show="isShowCountDown" class="blue">in</span>
      <CountDown
        v-show="isShowCountDown"
        ref="countDown"
        :time="60000"
        :auto-start="false"
        format="mm:ss"
        @finish="onFinish"
      />
    </div>
  </VanDialog>
  <number-keyboard
    v-model="code"
    :show="showKeyboard"
    z-index="9999"
    maxlength="6"
    @blur="showKeyboard = false"
  />
</template>

<script lang="ts" setup>
import {
  RadioGroup,
  Radio,
  CellGroup,
  Cell,
  Dialog,
  PasswordInput,
  NumberKeyboard,
  CountDown
} from 'vant'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import {
  sendXenditUserPayment,
  sendXenditValidateOTP,
  fetchXenditPayDebitPay,
  sendXenditResendOTP
} from '@/api/genericApi'

const VanDialog = Dialog.Component
const route = useRoute()
const router = useRouter()
const store = useStore()
const otpMobileNumber = ref('')

const checked = ref('')
const code = ref('')
const countDown = ref(null)
const paymentList = ref([])
const amount = ref(0)
const directDebitId = ref('')
const tokenId = route.query.linked_account_token_id
const type = route.query.type
const picUrl = ref('')

const show = ref(false)
const showKeyboard = ref(false)
const isShowCountDown = ref(false)
let isLoading = false

// 显示验证码输入弹窗
const handlerShowDialog = (value) => {
  show.value = value
  if (value) {
    isShowCountDown.value = value
    setTimeout(() => {
      countDown.value && countDown.value.reset()
      countDown.value && countDown.value.start()
    })
  } else {
    countDown.value && countDown.value.pause()
  }
}

// 验证码输入错误
const onVerifyError = () => {
  Dialog.alert({
    title: 'Error',
    message: 'The OTP provided is incorrect.',
    theme: 'round-button',
    confirmButtonColor: '#000000',
    confirmButtonText: 'OK, Got it!'
  }).then(() => {
    code.value = ''
    countDown.value.pause()
    isShowCountDown.value = false
  })
}

// 提交验证码
const sendVerify = async () => {
  const response: any = await sendXenditValidateOTP({
    directDebitId: directDebitId.value,
    otpCode: code.value
  })
  if (response.code === 0) {
    const status = response.data.status
    // 状态 状态为 COMPLETED 则支付成功 状态为 PENDING 则需要验证手机验证码
    if (status === 'COMPLETED') {
      store.commit('user/setDirectResult', response.data)
      router.push({
        name: 'DirectPaymentResult',
        params: { status: 'success' },
        query: { type }
      })
    }
  } else if (response.code === 400) {
    router.push({
      name: 'DirectPaymentResult',
      params: { status: 'fail' },
      query: { error: response.message, type }
    })
  } else {
    onVerifyError()
  }
}
// 支付订单
const onSubmit = async () => {
  if (isLoading) {
    return
  }
  isLoading = true
  const response: any = await fetchXenditPayDebitPay({
    paymentId: checked.value,
    tokenId
  })
  isLoading = false
  if (response.code === 0) {
    const isOtpRequired = response.data.isOtpRequired
    directDebitId.value = response.data.directDebitId
    otpMobileNumber.value = response.data.otpMobileNumber

    const status = response.data.status
    // isOtpRequired 是否需要验证码验证 true:需要 false:不需要
    if (isOtpRequired) {
      handlerShowDialog(true)
    } else if (status === 'COMPLETED') {
      // 状态 状态为 COMPLETED 则支付成功 状态为 PENDING 则需要验证手机验证码
      store.commit('user/setDirectResult', response.data)
      router.push({
        name: 'DirectPaymentResult',
        params: { status: 'success' },
        query: { type }
      })
    }
  } else if (response.code === 400) {
    router.push({
      name: 'DirectPaymentResult',
      params: { status: 'fail' },
      query: { error: response.message, type }
    })
  }
}

// 发送验证码
const onSendVerify = async () => {
  if (isShowCountDown.value) {
    return
  }
  countDown.value.reset()
  isShowCountDown.value = true
  countDown.value.start()
  // 发送短信
  await sendXenditResendOTP({ directDebitId: directDebitId.value })
}
// 倒计时结束
const onFinish = () => {
  isShowCountDown.value = false
  countDown.value.reset()
}

// 获取储蓄卡列表
const getList = async () => {
  const response: any = await sendXenditUserPayment({ tokenId })
  paymentList.value = response.data.paymentList
  if (paymentList.value && paymentList.value.length) {
    checked.value = paymentList.value[0].id
  }
  amount.value = response.data.amount
  picUrl.value = response.data.picUrl
}

onMounted(() => {
  getList()
})

watch(code, (newValue) => {
  if (newValue.length >= 6) {
    sendVerify()
  }
})
</script>

<style lang="less">
.van-count-down {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #1878f1;
}
.radio-group {
  .van-cell {
    background: #f6f6f6;
    border-radius: 2px;
    margin-bottom: 10px;
    .van-cell__title {
      span {
        font-weight: 600;
      }
    }
  }
}
</style>

<style lang="less">
.van-nav-bar .van-icon {
  color: #000000;
  font-size: 24px;
}
.van-nav-bar__text {
  font-weight: 600;
  font-size: 17px;
  color: #000000;
}
.van-button__text {
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #fff;
}
</style>

<style lang="less" scoped>
.radio-group {
  padding-bottom: calc(68px + env(safe-area-inset-bottom));
}
.pay-info {
  padding-top: 40px;
  margin-bottom: 15px;
  .logo {
    display: block;
    margin: 0 auto 50px;
    width: 119px;
  }
  .tip {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #000;
    padding-left: 20px;
  }
}
.cm-pay-footer-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 750PX;
  padding: 10px 15px calc(10px + env(safe-area-inset-bottom));
  background-color: #fff;
  transform: translateX(-50%);
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 345px;
    height: 48px;
    margin: 0 auto;
    background: #000000;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
  }
}
.dialog-tips {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  font-size: 14px;
  line-height: 20px;
  color: #333333;
  .blue {
    font-weight: 600;
    color: #1878f1;
    margin-right: 8px;
    margin-left: 8px;
    & + .blue {
      margin-left: 0;
    }
  }
}
</style>
