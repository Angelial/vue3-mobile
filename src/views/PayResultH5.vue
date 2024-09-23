<template>
  <nav-bar
    left-text="MojoMojo"
    fixed
    placeholder
    :border="false"
    safe-area-inset-top
  />
  <section v-if="count > 1" class="pay-result">
    <img src="@/assets/images/logo_mini.png" alt="MojoMojo" class="logo" />
    <section v-if="count <= 3" class="first-result">
      <p class="tips">Sorry, Payment not yet received.</p>
      <p class="tips">Please check if payment was successful.</p>
    </section>

    <section v-if="count > 3" class="second-result">
      <p class="tips">Payment not yet received.</p>
      <p class="tips">
        if payment has been made, please contact our Online Customer Service and
        provide proof of payment.
      </p>
    </section>

    <section v-if="count > 1" class="btn-group">
      <button class="btn btn-default" @click="goPay">I'm not yet paid</button>
      <button v-if="count <= 3" class="btn btn-primary" @click="queryPayStatus">
        I already paid
      </button>
      <button v-else class="btn btn-primary" @click="onClick">
        Contact CS
      </button>
    </section>
  </section>
  <GoAppPop v-model:show="showGoApp" />
</template>

<script lang="ts" setup>
import { NavBar } from 'vant'
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { queryThirdPayStatus } from '@/api/payApi'
import GoAppPop from '@/components/GoAppPop.vue'
import useBuried from '@/mixins/buried'

const { sendBuried } = useBuried()

const router = useRouter()
const orderId = localStorage.getItem('orderId')
const orderPayNo = localStorage.getItem('orderNum')
const orderNo = localStorage.getItem('orderNo')
const boxId = localStorage.getItem('boxId')
const goodsId = localStorage.getItem('goodsId')
const orderBaseId = localStorage.getItem('orderBaseId')
const payType = localStorage.getItem('payType')
const count = ref(1)
const showGoApp = ref(false)

const queryPayStatus = async () => {
  if (payType === 'gcash') {
    window.parent.postMessage(
      {
        code: 'success'
      },
      '*'
    )
    localStorage.removeItem('payType')
    return
  }
  const response: any = await queryThirdPayStatus({
    orderPayNo,
    orderBaseId,
    isAppletPay: 0
  })
  if (response.code === 0) {
    if (boxId) {
      router.push({
        name: 'BoxOpen',
        params: {
          orderNo: orderNo,
          id: boxId
        },
        query: {
          type: 'result'
        }
      })
    } else {
      router.push({
        name: 'PaySuccess',
        params: {
          id: goodsId
        }
      })
    }
  } else {
    count.value = count.value + 1
    count.value > 2 &&
      sendBuried({
        pointType: 'click_pay_dialog_button',
        pointName: '点击支付返回弹窗按钮',
        button: 2
      })
  }
}

const goPay = () => {
  if (boxId) {
    router.push({
      name: 'OrderPay',
      params: { id: orderId, boxId }
    })
  } else {
    router.push({
      name: 'GoodsPay',
      params: { id: goodsId },
      query: { orderId: orderId }
    })
  }
  sendBuried({
    pointType: 'click_pay_dialog_button',
    pointName: '点击支付返回弹窗按钮',
    button: 1
  })
}
const onClick = () => {
  showGoApp.value = true
  sendBuried({
    pointType: 'click_pay_dialog_button',
    pointName: '点击支付返回弹窗按钮',
    button: 3
  })
}

onBeforeMount(() => {
  queryPayStatus()
})

const onPopState = () => {
  history.pushState(null, null, document.URL)
}

onMounted(async () => {
  history.pushState(null, null, document.URL)
  window.addEventListener('popstate', onPopState, false)
})

onBeforeUnmount(() => {
  localStorage.removeItem('payType')
  window.removeEventListener('popstate', onPopState, false)
})
</script>

<style lang="less" scoped>
.pay-result {
  padding-top: 20px;
  .logo {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto 20px;
  }
  .tips {
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }
}
.btn-group {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  padding: 0 15px;
  .btn {
    width: 160px;
    height: 56px;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
    border-radius: 28px;
    &.btn-default {
      color: #000;
      background: #ffffff;
      border: 3px solid #000000;
    }
    &.btn-primary {
      color: #ffffff;
      background: #000000;
      border: 3px solid #000000;
    }
  }
}
</style>
