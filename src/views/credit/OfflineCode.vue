<template>
  <section class="offline-page">
    <nav-bar
      :left-text="CODE[payDetail.channel]"
      left-arrow
      fixed
      placeholder
      safe-area-inset-top
      v-if="type === 'H5'"
    />
    <div class="price-code">
      <div class="price-box">
        <p class="label-amount">Amount Due</p>
        <p class="price"><em class="unit">₱</em>{{ payDetail.amount }}</p>
      </div>

      <div class="code-box">
        <div class="code-inner">
          <p class="label">Payment Code</p>
          <p class="code">{{ payDetail.repayCode }}</p>
        </div>
      </div>
    </div>
    <p v-if="payDetail.channel != 10" class="tips">
      Please open your {{ CODE[payDetail.channel] }} APP and fill in your
      payment details to continue with your order.
    </p>
    <p v-else class="tips">
      Please proceed to the nearest 7-Eleven branch and present the barcode or
      reference number to the cashier.
    </p>

    <div v-if="payDetail.channel == 10" class="title">Barcode</div>

    <div
      v-if="payDetail.channel == 10"
      class="img-box"
      :class="{ barCode: barCode }"
    >
      <img class="code-img" v-if="barCode" :src="barCode" />
      <img v-else class="error-img" src="../../assets/images/failed.png" />
    </div>
    <div v-if="payDetail.channel == 10 && barCode" class="tips-code">
      Pay by scanning the barcode. The barcode is valid for 24 hours. Please pay
      before {{ timeStep }}.
    </div>
    <div v-else-if="payDetail.channel == 10" class="tips-code">
      Retrieve barcode FAILED.Click "Refresh Barcode" to obtain or continue with
      Payment Code to pay.
    </div>

    <footer class="footer-btn-wrap">
      <div
        v-if="payDetail.channel == 10"
        class="btn-brcode flex-center"
        @click="refreshCode"
      >
        Refresh Barcode
      </div>
      <div class="btn-paid flex-center" @click="queryPayStatus">
        I Already Paid
      </div>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { NavBar, Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { fetchPayResult, fetchOffline } from '@/api/payApi'
import { sendBuringPoint } from '@/api/genericApi'
import fetchBlob from './barCode'
const route = useRoute()
const router = useRouter()

const reqId = route.query.orderBaseId
const type = route.query.type
const channel = route.query.channel

const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const CODE = {
  42: 'BDO',
  41: 'UNION BANK',
  6: 'GCash',
  10: '7-11'
}

const payDetail: any = ref({})
const barCode: any = ref({})
const timeStep = ref('')

const sendPoint = (pointType, pointName) => {
  sendBuringPoint({
    pointType,
    pointName,
    userId: payDetail.value.userId,
    channels: type,
    button: 1,
    phone: payDetail.value.phone
  })
}

/** 获取条形码 */
const getBarCode = (type) => {
  const loadingToast = Toast.loading({
    duration: 0,
    forbidClick: true
  })
  fetchBlob({
    userId: payDetail.value.userId,
    amount: payDetail.value.amount,
    contractNumber: payDetail.value.repayCode
  })
    .then(async (blob: any) => {
      loadingToast && loadingToast.clear()
      if (!blob) {
        if (type === 'refresh') {
          Toast('Refresh failed, please try again!')
        }
        barCode.value = false
      } else {
        if (type === 'refresh') {
          Toast('Refresh successful!')
        }
        barCode.value = blob
      }
    })
    .catch(() => {
      if (type === 'refresh') {
        Toast('Refresh failed, please try again!')
      }
      loadingToast && loadingToast.clear()
    })
}

/** 刷新 */
const refreshCode = () => {
  sendPoint('btn_refresh_bar_code', '刷新条形码')
  if (!barCode.value) {
    getBarCode('refresh')
  } else {
    Toast.loading({
      duration: 2000,
      forbidClick: true
    })
    setTimeout(() => {
      Toast('Refresh successful!')
    }, 2000)
  }
}

/** 查询是否已支付 */
const queryPayStatus = () => {
  sendPoint('btn_request_payment_results', '手动请求支付结果')
  fetchPayResult(payDetail.value.reqId).then((res: any) => {
    if (res.code === 0 && res.data.status) {
      Toast('Payment successful!')
      setTimeout(() => {
        if (type === 'H5') {
          router.push({ name: 'ResultH5pay' })
        } else {
          window.location.href = 'https://mysterybox.mojomojo.net/result'
        }
      }, 2000)
    } else {
      Toast('No payment found. Please confirm if the payment is successful.')
    }
  })
}
/** 获取支付信息 */
const getPayDetail = () => {
  fetchOffline(reqId, channel).then((res: any) => {
    payDetail.value = res.data
    ;(document as any).title = CODE[res.data.channel]
    if (res.data.channel == 10) {
      getBarCode('code')
      const failureTime = new Date(res.data.orderFailureTime)
      const time = res.data.orderFailureTime.split(' ')[1]
      const month = MONTH[failureTime.getMonth()]
      const day = failureTime.getDate()
      const year = failureTime.getFullYear()
      timeStep.value = `${time} on ${month} ${day}, ${year}`
    }
  })
}

onMounted(() => {
  getPayDetail()
})

onBeforeUnmount(() => {
  ;(document as any).title = 'MojoMojo'
})
</script>

<style lang="less" scoped>
.title {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 15px;
  color: #333333;
  text-align: center;
}
.offline-page {
  width: 100%;
  max-width: 750PX;
  min-height: 100vh;
  padding-bottom: 80px;
  background-color: #f7f7f7;
}
.price-code {
  position: relative;
  width: 100%;
  height: 160px;
  padding-top: 10px;
  margin-bottom: 113px;
  background-color: #fff;
  .label-amount {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #666666;
  }
}
.price-box {
  text-align: center;
}
.price {
  font-weight: 600;
  font-size: 30px;
  line-height: 42px;
  color: #f65e5e;
  .unit {
    font-size: 22px;
    line-height: 31px;
  }
}
.img-box {
  width: 335px;
  padding: 25px 0 14px;
  margin: 0 auto;
  background-color: #fff;
  &.barCode {
    padding: 10px 0;
    .code-img {
      display: block;
      width: 100%;
      margin: 0 auto;
    }
  }
  .error-img {
    display: block;
    width: 272px;
    margin: 0 auto;
  }
}
.label {
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  color: #333333;
  margin-bottom: 22px;
}
.code-inner {
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  padding-top: 13px;
  text-align: center;
  border: 1px dashed rgba(153, 153, 153, 0.5);
  border-radius: 13px;
}
.code-box {
  position: absolute;
  top: 102px;
  left: 50%;
  width: 335px;
  height: 156px;
  padding: 10px;
  background: #f6f6f6;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transform: translateX(-50%);
}
.code {
  width: 271px;
  height: 56px;
  margin: 0 auto;
  font-weight: 600;
  font-size: 26px;
  line-height: 56px;
  color: #219e44;
  background: #eee;
  border-radius: 28px;
}
// .code-img {
//   display: block;
//   width: 335px;
//   margin: 0 auto;
//   padding: 25px 0 14px;
//   background-color: #fff;
// }
.tips {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 0 20px;
  letter-spacing: -0.3px;
  color: #f65e5e;
  margin-bottom: 15px;
}
.tips-code {
  width: 335px;
  padding: 9px;
  margin: 0 auto;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #333;
  background: #f65e5e;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #fff;
}
.count-down {
  display: inline-block;
  color: #fff;
  margin: 0 4px;
}
.footer-btn-wrap {
  position: fixed;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 750PX;
  height: 70px;
  left: 50%;
  bottom: 0;
  padding: 11px 15px;
  background: #fff;
  transform: translateX(-50%);
  .btn-brcode {
    width: 166px;
    height: 48px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    margin-right: 14px;
    color: #000000;
    background: #fff;
    border: 3px solid #000000;
    border-radius: 12px;
  }
  .btn-paid {
    flex: 1;
    width: 166px;
    height: 48px;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #fff;
    background: #000000;
    border-radius: 12px;
  }
}
</style>
