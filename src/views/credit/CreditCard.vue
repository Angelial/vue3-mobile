<template>
  <section class="wrap">
    <div class="credit-card">
      <p class="tip">Credit Card</p>
      <Form>
        <Field
          v-model="formData.cardNumber"
          class="card-number"
          type="number"
          :border="false"
          placeholder="Card number"
        />
        <div class="box">
          <Field
            v-model="formData.date"
            class="date"
            :border="false"
            type="number"
            maxlength="5"
            :formatter="formatter"
            placeholder="Expiration (MM/YY)"
          />
          <Field
            v-model="formData.cvv"
            class="cvv"
            :border="false"
            type="number"
            placeholder="CVV"
          />
          <Icon
            name="warning-o"
            color="rgba(255, 255, 255, 0.85)"
            size="18"
            @click="handlerShowDialog(true)"
          />
        </div>
      </Form>
      <p class="shield">
        <Icon name="shield-o" color="#3AF536" size="16" />
        Your card details are protected.
      </p>
    </div>
  </section>
  <footer class="cm-pay-footer-bar">
    <button class="btn" @click="onSubmit">Pay ₱{{ amount }}</button>
  </footer>

  <VanDialog
    v-model:show="show"
    title="What’s CVV ?"
    :showConfirmButton="false"
  >
    <p class="dialog-tips">
      The CVV is the 3 digit number on the back of your card.
    </p>
    <img src="@/assets/images/cvv.png" alt="MojoMojo" class="dialog-img" />
    <button class="dialog-btn" @click="handlerShowDialog(false)">GOT IT</button>
  </VanDialog>

  <VanDialog
    width="100%"
    v-model:show="showIframe"
    :showConfirmButton="false"
    close-on-click-overlay
    @close="changeIframe"
  >
    <div class="iframe-content">
      <Icon
        name="cross"
        size="30"
        color="#000"
        class="close"
        @click="showIframe = false"
      />
      <iframe
        :src="payerAuthenticationUrl"
        frameborder="0"
        width="100%"
        height="400px"
        class="iframe-box"
      />
    </div>
  </VanDialog>
</template>

<script lang="ts" setup>
import { Field, Form, Icon, Toast, Dialog } from 'vant'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref, onBeforeMount } from 'vue'
import { sendCreditCardPay, fetchCreditAmount } from '@/api/genericApi'

const VanDialog = Dialog.Component

const store = useStore()
const router = useRouter()
const route = useRoute()
const reqId = route.query.reqId
const type = route.query.type

let _date = []
const show = ref(false)
const showIframe = ref(false)
let isLoading = false

const formData = reactive({
  cardNumber: '',
  cvv: '',
  date: ''
})
const amount = ref(0)

const payerAuthenticationUrl = ref('')
const tokenId = ref('')
let loadingToast: any = null

const Xendit = (window as any).Xendit
const publishableKey =
  process.env.NODE_ENV === 'production'
    ? 'xnd_public_production_SeNYFO1vp5f8s9jNH87rW7jDu1CTPInEOwvaFwTw3B7cX9gh6xnZRe9CiAPoCI'
    : 'xnd_public_development_fWHyFmkH3VSldRMuZSswVfgooUIT6dVh94sWt6NINYUZOQFuw2foYPCLjV7ZE3'
Xendit.setPublishableKey(publishableKey)

const changeIframe = () => {
  isLoading = false
}

const formatter = (value) => {
  if (value.length > 2) {
    return `${value.slice(0, 2)}/${value.slice(2)}`
  }
  return value
}

const onVerify = () => {
  if (!formData.cardNumber) {
    Toast('Please enter the card number.')
    return false
  }
  if (!formData.date) {
    Toast('Please enter the expiry date.')
    return false
  }
  if (!formData.cvv) {
    Toast('Please enter the CVV.')
    return false
  }
  if (!Xendit.card.validateCardNumber(formData.cardNumber)) {
    Toast('Credit card number is invalid.')
    return false
  }
  _date = formData.date.split('/')

  if (!Xendit.card.validateCvn(_date[0], `20${_date[1]}`)) {
    Toast('Date is invalid.')
    return false
  }
  if (!Xendit.card.validateCvn(formData.cvv)) {
    Toast('CVV number is invalid.')
    return false
  }
  return true
}
const handlerShowDialog = (value) => {
  show.value = value
}

const sendPay = async () => {
  const response: any = await sendCreditCardPay({
    amount: amount.value,
    reqId,
    tokenId: tokenId.value
  })
  if (response.code === 0) {
    const { status } = response.data
    if (status === 'COMPLETED') {
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

const xenditResponseHandler = (err, creditCardToken) => {
  loadingToast.clear()
  if (err) {
    Toast(err.message)
    isLoading = false
    showIframe.value = false
    return
  }
  if (!creditCardToken) {
    showIframe.value = false
    return
  }
  const brands = ['VISA', 'MASTERCARD', 'JCB']
  const country = process.env.NODE_ENV === 'production' ? 'PH' : 'ID'

  if (
    creditCardToken.card_info.country !== country ||
    creditCardToken.card_info.type !== 'CREDIT' ||
    brands.indexOf(creditCardToken.card_info.brand) <= -1
  ) {
    Toast('Sorry, only Philippine-issued credit card is acceptable.')
    isLoading = false
    return
  }
  if (creditCardToken && creditCardToken.status === 'VERIFIED') {
    showIframe.value = false
    // Get the token ID:
    tokenId.value = creditCardToken.id
    sendPay()
    isLoading = false
  } else if (creditCardToken.status === 'IN_REVIEW') {
    showIframe.value = true
    payerAuthenticationUrl.value = creditCardToken.payer_authentication_url
  } else if (creditCardToken.status === 'FAILED') {
    Toast(creditCardToken.failure_reason)
    isLoading = false
  }
}
const onSubmit = () => {
  if (amount.value < 20) {
    Toast('Accepted payment amount must be 20 pesos above.')
    return
  }
  const verify = onVerify()
  if (isLoading) {
    return
  }
  if (verify) {
    isLoading = true
    loadingToast = Toast.loading({
      duration: 0,
      forbidClick: true
    })
    Xendit.card.createToken(
      {
        amount: amount.value,
        card_number: formData.cardNumber,
        card_exp_month: _date[0],
        card_exp_year: `20${_date[1]}`,
        card_cvn: formData.cvv,
        is_multiple_use: false,
        should_authenticate: true
      },
      xenditResponseHandler
    )
  }
}

const getAmount = async () => {
  const response = await fetchCreditAmount({ reqId })
  amount.value = Number(response.data)
}

onBeforeMount(() => {
  getAmount()
})
</script>

<style lang="less">
.van-button__text {
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #fff;
}
.credit-card {
  .box {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
  }
  .shield {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #ffffff;
    .van-icon {
      margin-right: 9px;
    }
  }
  .van-cell {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    backdrop-filter: blur(5px);
    height: 46px;
    .van-field__body {
      height: 100%;
    }
    &.card-number {
      width: 230px;
      margin-bottom: 20px;
    }
    &.date {
      width: 175px;
      margin-right: 20px;
    }
    &.cvv {
      width: 85px;
      margin-right: 10px;
    }
    .van-field__control {
      color: #fff;
      font-weight: 400;
      font-size: 15px;
      line-height: 21px;
      &::placeholder {
        color: #fff;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.iframe-content {
  position: relative;
  padding-top: 35px;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
}
.wrap {
  padding: 15px;
}
.credit-card {
  width: 100%;
  height: 219px;
  padding: 15px 15px 15px 20px;
  background: linear-gradient(31.58deg, #93278f -2.49%, #29abe2 67.92%);
  border-radius: 20px;
  .tip {
    font-size: 15px;
    font-weight: 700;
    line-height: 22px;
    color: #ffffff;
    text-align: right;
    padding-right: 10px;
    margin-bottom: 7px;
  }
}
.cm-pay-footer-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 750PX;
  padding: 10px 15px calc(10px + env(safe-area-inset-bottom));
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
  padding: 0 25px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #333333;
}
.dialog-img {
  display: block;
  width: 125px;
  margin: 15px auto 20px;
}
.dialog-btn {
  display: block;
  width: 255px;
  height: 42px;
  margin: 0 auto 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 42px;
  color: #ffffff;
  text-align: center;
  background: #000000;
  border-radius: 12px;
}
.iframe-box {
  width: 100%;
}
</style>
