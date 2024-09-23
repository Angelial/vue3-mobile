<template>
  <NavBar
    left-arrow
    fixed
    placeholder
    title="Order Confirmation"
    safe-area-inset-top
    :border="false"
    @click-left="onBack"
  >
    <template #right>
      <div v-hasPermi class="opera" @click="showAppPop = true">
        <img
          src="@/assets/images/customer-black.png"
          alt="MojoMojo"
          class="icon"
        />
      </div>
    </template>
  </NavBar>

  <section v-if="detail.id" class="pay-wrap van-safe-area-bottom">
    <div class="goods-wrap">
      <div class="cm-goods-wrap default">
        <img
          :src="detail.blindBoxInfo.mainImage"
          alt="MojoMojo"
          class="thumb"
        />

        <div class="goods-info">
          <p class="goods-name ellipsis">{{ detail.blindBoxInfo.name }}</p>
          <p class="goods-price">₱{{ detail.blindBoxInfo.salePrice }}</p>
        </div>
      </div>

      <div class="transaction-fee">
        <p class="fee-title">Transaction Fee</p>
        <p class="price">₱ {{ expenses.serviceCharge }}</p>
      </div>
    </div>

    <Cell
      v-if="detail.blindBoxInfo.deductionPrice > 0"
      center
      class="is-use-gem"
    >
      <template #icon>
        <img src="@/assets/images/gem.png" alt="MojoMojo" class="icon-gem" />
      </template>
      <template #right-icon>
        <checkbox
          v-model="isUseEnergyAmount"
          disabled
          icon-size="20px"
          checked-color="#000"
        />
      </template>
      <span class="gem-content">
        Apply {{ detail.blindBoxInfo.deductionEnergyAmount }} Mojo points to get
        Php {{ detail.blindBoxInfo.deductionPrice }} discount.
      </span>
    </Cell>

    <h3 class="cm-title">Payment Methods</h3>
    <section class="payment-type">
      <RadioGroup v-model="checked" @change="changePayType">
        <CellGroup v-for="(pay, indexPay) in list" :key="indexPay" inset>
          <Cell
            v-show="isMore || indexPay <= isShowIndex || isShowIndex === 0"
            class="title-cell"
            center
            :title="pay[0].payTypeName"
          />
          <template v-for="(item, index) in pay" :key="index">
            <Cell
              v-show="isMore || item.count <= showPayNum"
              clickable
              :title="item.name"
            >
              <template #icon>
                <img :src="item.img" alt="MojoMojo" class="cm-cell-img" />
              </template>
              <template #right-icon>
                <Radio :name="item.id" checked-color="#000" />
              </template>
            </Cell>
          </template>
        </CellGroup>
        <Cell class="more" center @click="onMore">
          {{ isMore ? 'Fold' : 'More Payment Methods' }}
          <icon v-if="isMore" name="arrow-up" />
          <icon v-else name="arrow-down" />
        </Cell>
      </RadioGroup>
    </section>

    <div class="cm-tips">
      kindly expect delay in shipping due to unforeseen factors(eg.Weather,
      Covid-19). Thank you for your patience and support.
    </div>

    <footer class="cm-footer-btn-wrap">
      <section class="pay-footer flex-vertical-between van-safe-area-bottom">
        <div class="total">
          <p class="total-title">Total</p>
          <p class="price">₱{{ expenses.totalPrice }}</p>
        </div>
        <div class="group-btn">
          <button class="btn flex-center btn-default" @click="cancelOrder">
            Cancel Order
          </button>
          <button class="btn btn-primary" @click="payBoxes">
            <p class="pay-now">Pay Now</p>
            <CountDown
              class="number"
              :time="detail.expireTime - detail.currentTime"
              format="HH:mm:ss"
            />
          </button>
        </div>
      </section>
    </footer>
  </section>
  <GoAppPop v-model:show="showAppPop" />
</template>

<script lang="ts" setup>
import {
  NavBar,
  RadioGroup,
  Radio,
  CellGroup,
  Cell,
  Icon,
  Checkbox,
  CountDown,
  Dialog,
  Toast
} from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { ref, onBeforeMount, reactive, computed } from 'vue'
import {
  fetchPayTypeList,
  recalculatePrice,
  submitOrderList,
  fetchOrderDetail,
  cancelPay
} from '@/api/payApi'
import { useStore } from 'vuex'
import GoAppPop from '@/components/GoAppPop.vue'

import useBuried from '@/mixins/buried'

const { sendBuried } = useBuried()

const router = useRouter()
const route = useRoute()
const store = useStore()
const list = ref()
const checked = ref(0)
const isMore = ref(false)
const isUseEnergyAmount = ref(false)
const showAppPop = ref(false)
const showPayNum = ref(0)

const expenses: any = reactive({
  energyAmount: 0,
  expressCost: 0,
  serviceCharge: 0,
  totalPrice: 0
})

const boxId = route.params.boxId

const detail: any = reactive({})

const user = computed(() => store.state.user.user)

const isShowIndex = computed(() => {
  let count = 0
  let isShow = 0
  list.value.map((item, index) => {
    count += item.length
    if (count > showPayNum.value && isShow === 0) {
      isShow = index
    }
  })
  return isShow
})

const getPayType = () => {
  let type = {}
  list.value.map((item) => {
    item.map((i: any) => {
      if (i.id === checked.value) {
        type = i
      }
    })
  })
  return type
}

const onBack = () => {
  if (boxId) {
    router.push({ name: 'BoxDetail', params: { id: boxId } })
  } else {
    router.back()
  }
  sendBuried({
    pointName: '订单确认页点击返回',
    pointType: 'order_confirm_return'
  })
}

const onMore = () => {
  isMore.value = !isMore.value
}

const getBoxesDetail = async () => {
  const response: any = await fetchOrderDetail(route.params.id)
  Object.assign(detail, response.data)
  isUseEnergyAmount.value = Boolean(detail.blindBoxInfo.deductionPrice)
}
const payTypeReduce = (data) => {
  let obj = {}
  let newArr = []
  let count = 1
  data.forEach((item) => {
    if (!obj[item.payTypeName]) {
      var arr = []
      arr.push({ ...item, count: count++ })
      newArr.push(arr)
      obj[item.payTypeName] = item
    } else {
      newArr.forEach((value) => {
        // 如果已经存在 就循环新组的值将值插入属性相同的数组里
        // 为了防止重复添加 只要和第一个比较就可以了
        if (value[0].payTypeName == item.payTypeName) {
          value.push({ ...item, count: count++ })
        }
      })
    }
  })
  return newArr
}

const getPayTypeList = async () => {
  await getBoxesDetail()
  const { data }: any = await fetchPayTypeList()
  list.value = payTypeReduce(data.list)
  checked.value = data.list[0].id
  showPayNum.value = data.showNum
  await getPrice(data.list[0].id)
}

const getPrice = async (id) => {
  if (!id) return

  const price = !isUseEnergyAmount.value
    ? detail.blindBoxInfo.salePrice
    : (
        detail.blindBoxInfo.salePrice - detail.blindBoxInfo.deductionPrice
      ).toFixed(2)

  const { data } = await recalculatePrice({
    orderNos: detail.orderBase.orderNo,
    price,
    payTypeId: id,
    currencyType: detail.orderBase.currencyType
  })
  Object.assign(expenses, data)
}
const changePayType = (id: string) => {
  checked.value = Number(id)
  if (detail.blindBoxInfo.salePrice) {
    getPrice(id)
  }
}

const payBoxes = async () => {
  const payType: any = getPayType()

  const params = {
    currencyType: detail.orderBase.currencyType,
    orderType: 2,
    price: expenses.totalPrice,
    productId: detail.blindBoxInfo.id,
    productNum: detail.orderBase.num,
    code: payType.code,
    deductionEnergyAmount: isUseEnergyAmount.value
      ? detail.blindBoxInfo.deductionPrice
      : 0,
    orderPayType: 2,
    payTypeId: payType.id,
    payType: payType.type,
    id: Number(route.params.id),
    serviceCharge: expenses.serviceCharge
  }

  sendBuried({
    pointType: 'click_box_pay',
    pointName: '点击盲盒-去支付',
    boxSource: 1,
    boxId: detail.id,
    boxPrice: detail.blindBoxInfo.salePrice,
    boxPriceReal: expenses.totalPrice || null,
    discountAmount: isUseEnergyAmount.value
      ? detail.blindBoxInfo.deductionPrice
      : null,
    freightAmount: expenses.expressCost,
    paymentChannelAmount: expenses.serviceCharge,
    boxPayType: isUseEnergyAmount.value
      ? expenses.totalPrice === 0
        ? 2
        : '1、2'
      : 1,
    rechargeWay: payType.id,
    drawNum: detail.orderBase.num
  })

  const response: any = await submitOrderList(params)
  if (response.code === 0) {
    store.dispatch('user/getUser')
    if (!response.data.payUrl) {
      router.push({
        name: 'BoxOpen',
        params: {
          orderNo: response.data.orderNos,
          id: detail.blindBoxInfo.id
        },
        query: {
          type: 'result'
        }
      })
    } else {
      localStorage.setItem('orderNum', response.data.orderNum)
      localStorage.setItem('orderNo', response.data.orderNos)
      localStorage.setItem('orderId', response.data.orderPayId)
      localStorage.setItem('boxId', detail.blindBoxInfo.id)
      localStorage.setItem('orderBaseId', response.data.orderBaseId)
      if (payType.name.toLowerCase() === 'gcash') {
        localStorage.setItem('payType', 'gcash')
        router.push({ name: 'Iframe', query: { href: response.data.payUrl } })
      } else {
        response.data.payUrl && (window.location.href = response.data.payUrl)
      }
    }
  }
}
const cancelOrder = () => {
  Dialog.confirm({
    message: 'Are you sure you want to cancel the order?',
    showCancelButton: true,
    confirmButtonText: 'No',
    cancelButtonText: 'Yes'
  })
    .then(() => {
      // on cancel
    })
    .catch(() => {
      cancelPay({
        id: detail.id,
        orderPayNo: detail.orderBase.orderNo,
        userId: user.value.id
      }).then((res: any) => {
        if (res.code === 0) {
          router.push({
            name: 'Order',
            params: { type: 'PENDING' }
          })
        } else if (res.code === 400) {
          Toast(res.message)
        }
      })
    })
}

onBeforeMount(() => {
  localStorage.removeItem('goodsId')
  localStorage.removeItem('payType')
  getPayTypeList()
})
</script>

<style lang="less" scoped>
.is-use-gem {
  margin-bottom: 15px;
}
.icon-gem {
  width: 16px;
  height: 24px;
  margin-right: 8px;
}
.gem-content {
  font-size: 13px;
  line-height: 20px;
  color: #7e8d9b;
}
.opera {
  .icon {
    width: 22px;
  }
}
.pay-wrap {
  background: #f6f6f6;
  min-height: calc(100vh - 46px);
  padding: 10px;
  padding-bottom: calc(100px + env(safe-area-inset-bottom));
}
.goods-wrap {
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  margin-bottom: 15px;
  .transaction-fee {
    display: flex;
    justify-content: space-between;
    padding-top: 12px;
    margin-top: 15px;
    border-top: 0.5px solid #eeeeee;
    .fee-title {
      font-size: 13px;
      line-height: 26px;
      color: #7e8d9b;
    }
    .price {
      font-weight: 600;
      font-size: 17px;
      line-height: 26px;
      color: #000000;
    }
  }
}
.payment-type {
  background-color: #fff;
  margin-bottom: 15px;
}
.privacy-policy {
  margin: 0 auto 10px;
}
.title-cell {
  background-color: #eee;
}
</style>
