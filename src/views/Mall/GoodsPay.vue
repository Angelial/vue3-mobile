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

  <section class="pay-wrap van-safe-area-bottom">
    <section class="address-wrap flex-vertical-between" @click="goAddress">
      <div v-if="userAddress.id" class="address-box">
        <p class="info">
          <span class="name">{{ userAddress.username }}</span>
          <span class="phone">{{ userAddress.phone }}</span>
        </p>
        <p v-if="!orderId" class="address">
          {{ userAddress.regins }},{{ userAddress.province }},
          {{ userAddress.city }},{{ userAddress.district }},
          {{ userAddress.address }},{{ userAddress.postalCode }}
        </p>
        <p v-else class="address">
          {{ userAddress.receiverDetailAddress }},{{ userAddress.postalCode }}
        </p>
      </div>

      <div v-else class="address-box flex-vertical">
        <Icon name="add-o" size="21" color="#F65E5E" class="icon-add" />
        <span class="text">Add delivery information</span>
      </div>
      <Icon v-if="!orderId" name="arrow" size="21" color="#000" />
    </section>

    <div class="goods-wrap">
      <h3 class="subtitle">Items List</h3>
      <div class="cm-goods-wrap default">
        <img :src="detail.mainImage" alt="MojoMojo" class="thumb" />

        <div class="goods-info">
          <p class="goods-name ellipsis">
            {{ detail.name || detail.goodsName }}
          </p>
          <p class="goods-number">x{{ goodsNum }}</p>
          <p v-if="type === 'CASH'" class="goods-price">
            ₱{{ detail.price || detail.salePrice * goodsNum }}
          </p>
          <p v-else class="energy">
            <img
              src="@/assets/images/gem.png"
              alt="MojoMojo"
              class="icon-energy"
            />
            {{ expenses.energyAmount }}
          </p>
        </div>
      </div>

      <div class="transaction-fee">
        <p class="fee-title">
          Shipping Fee
          <Icon
            name="question-o"
            size="14"
            color="#7e8d9b"
            @click="onShowFee"
          />
        </p>
        <p class="price">₱ {{ expenses.expressCost }}</p>
      </div>
      <div class="transaction-fee">
        <p class="fee-title">Transaction Fee</p>
        <p class="price">₱ {{ expenses.serviceCharge }}</p>
      </div>
    </div>

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

    <section class="note-wrap">
      <h3 class="subtitle">Message</h3>
      <Field
        v-model="note"
        type="textarea"
        rows="2"
        placeholder="Please input your cloth size / shoe size here."
      />
    </section>

    <footer class="cm-footer-btn-wrap">
      <section class="pay-footer flex-vertical-between van-safe-area-bottom">
        <div class="total">
          <div class="total-title" :class="{ 'flex-vertical': !orderId }">
            Total
            <p v-if="type === 'CASH'" class="price" style="margin-left: 10px">
              ₱{{ expenses.totalPrice }}
            </p>
            <p v-else class="energy" style="margin-left: 10px">
              <img
                v-if="orderBase.currencyType !== 2"
                src="@/assets/images/gem.png"
                alt="MojoMojo"
                class="icon-energy"
              />
              <span v-if="orderBase.currencyType !== 2">
                {{ expenses.energyAmount }} +
              </span>
              ₱ {{ (expenses.expressCost + expenses.serviceCharge).toFixed(2) }}
            </p>
          </div>
        </div>
        <div class="group-btn">
          <button
            v-if="orderId"
            class="btn flex-center btn-default"
            @click="cancelOrder"
          >
            Cancel Order
          </button>
          <button class="btn btn-primary" @click="payGoods">
            <p class="pay-now">Pay Now</p>
            <CountDown
              v-if="orderId"
              class="number"
              :time="orderTime.expireTime - orderTime.currentTime"
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
  Field,
  Toast,
  Dialog,
  CountDown
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
import { fetchGoodsDetail } from '@/api/mallApi'
import { fetchUserAddress } from '@/api/genericApi'
import { useStore } from 'vuex'
import GoAppPop from '@/components/GoAppPop.vue'
import usePixel from '@/mixins/metaPixel'

import useBuried from '@/mixins/buried'

const { sendBuried } = useBuried()

const router = useRouter()
const route = useRoute()
const store = useStore()
const { pixelInitiateCheckout } = usePixel()

const list = ref([])
const checked = ref(0)
const isMore = ref(false)
const isPolicy = ref(true)
const showAppPop = ref(false)
const note = ref('')

const goodsId = Number(route.params.id)

const orderTime = reactive({
  currentTime: 0,
  expireTime: 0
})

const showPayNum = ref(0)
const type: any = ref('')
type.value = route.params.type
const number = route.params.number
const cateId = route.query.cateId

const orderId = Number(route.query.orderId)

const orderBase: any = reactive({
  currencyType: 0,
  orderNo: undefined
})

const expenses: any = reactive({
  energyAmount: 0,
  expressCost: 0,
  serviceCharge: 0,
  totalPrice: 0
})

const currencyType = {
  ENERGY: 2,
  CASH: 1
}

const detail: any = reactive({})
const userAddress: any = reactive({})

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

const goodsNum = computed(() => {
  return Number(number || detail.goodsNum)
})

const onBack = () => {
  if (orderId) {
    router.push({
      name: 'Order',
      params: { type: 'PENDING' }
    })
  } else {
    router.push({
      name: 'GoodsDetail',
      params: { id: goodsId }
    })
  }
  sendBuried({
    pointName: '订单确认页点击返回',
    pointType: 'order_confirm_return'
  })
}
const goAddress = () => {
  if (orderId) {
    return
  }
  router.push({
    name: 'Address'
  })
}
const onMore = () => {
  isMore.value = !isMore.value
}

const onShowFee = () => {
  Dialog.alert({
    title: 'About delivery fee',
    message:
      "Shipping Policy Shipping charges vary depending on the quantity of items that you've ordered, and the shipping address that you want it delivery to. The final shipping charge will be shown to you before you make your order",
    theme: 'round-button',
    confirmButtonText: 'Ok'
  }).then(() => {
    // on close
  })
}
let energyAmount = 0
let salePrice = 0

const getBoxesDetail = async () => {
  let response: any = {}
  if (orderId) {
    response = await fetchOrderDetail(orderId)
    Object.assign(detail, response.data.list[0])
    Object.assign(userAddress, {
      username: response.data.receiverName,
      id: response.data.addressId,
      phone: response.data.receiverPhone,
      postalCode: response.data.postalCode,
      receiverDetailAddress: response.data.receiverDetailAddress
    })
    Object.assign(orderBase, response.data.orderBase)
    Object.assign(orderTime, {
      currentTime: response.data.currentTime,
      expireTime: response.data.expireTime
    })
    note.value = response.data.note
    type.value = orderBase.currencyType === 1 ? 'CASH' : 'ENERGY'
    const responseDetail: any = await fetchGoodsDetail({ id: goodsId })
    energyAmount = responseDetail.data.energyAmount
    salePrice = responseDetail.data.salePrice
  } else {
    response = await fetchGoodsDetail({ id: goodsId })
    Object.assign(detail, response.data)
    const addressRes: any = await fetchUserAddress()
    if (addressRes.data && addressRes.data.length > 0) {
      Object.assign(userAddress, addressRes.data[0])
    }
  }
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
  const response: any = await fetchPayTypeList()
  const { data } = response
  list.value = data.list
  list.value = payTypeReduce(data.list)
  checked.value = data.list[0].id
  showPayNum.value = data.showNum
  await getPrice(data.list[0].id)
}

const getPrice = async (id) => {
  if (!id) return
  const currencyTypeValue = orderId
    ? orderBase.currencyType
    : currencyType[type.value]
  const { data } = await recalculatePrice({
    payTypeId: id,
    addressId: userAddress.id,
    currencyType: currencyTypeValue,
    goodsNum: goodsNum.value,
    goodsId: goodsId
  })
  Object.assign(expenses, data)
}
const changePayType = (id: string) => {
  checked.value = Number(id)
  if (detail.salePrice || detail.price) {
    getPrice(id)
  }
}

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

const payGoods = async () => {
  if (!isPolicy.value) {
    return
  }
  if (!userAddress.id) {
    Toast('Please enter shipping information.')
    return
  }
  const payType: any = getPayType()
  const currencyTypeValue = orderId
    ? orderBase.currencyType
    : currencyType[type.value]

  const params = {
    currencyType: currencyTypeValue,
    orderType: 1,
    orderPayType: 1,
    price: expenses.totalPrice,
    productId: goodsId,
    productNum: goodsNum.value,
    code: payType.code,
    payTypeId: payType.id,
    payType: payType.type,
    addressId: userAddress.id,
    expressCost: expenses.expressCost,
    serviceCharge: expenses.serviceCharge,
    deductionEnergyAmount: currencyTypeValue === 1 ? 0 : '',
    source: currencyTypeValue === 1 ? '现金购买商品' : '元气石兑换商品',
    note: note.value,
    orderNos: orderBase.orderNo,
    id: orderId || 0
  }

  if (!orderId) {
    pixelInitiateCheckout({
      id: goodsId,
      name: detail.name,
      type: 'goods',
      value: expenses.totalPrice,
      quantity: goodsNum.value
    })
  }
  sendBuried({
    pointType: 'click_goods_pay',
    pointName: '点击商品-去支付',
    goodsId: goodsId,
    goodsPrice: orderId ? salePrice : detail.salePrice,
    goodsNum: goodsNum.value,
    rechargeWay: payType.id,
    goodsStonePrice: orderId ? energyAmount : detail.energyAmount,
    goodsPriceReal: expenses.totalPrice,
    discountAmount: currencyTypeValue === 1 ? 0 : detail.energyAmount,
    freightAmount: expenses.expressCost,
    paymentChannelAmount: expenses.serviceCharge,
    boxPayType: currencyTypeValue === 1 ? 1 : '1,2',
    goodsMenu: cateId
  })
  const response: any = await submitOrderList(params)
  if (response.code === 0) {
    await store.dispatch('user/getUser')
    if (!response.data.payUrl) {
      router.push({
        name: 'PaySuccess',
        params: {
          id: goodsId
        }
      })
    } else {
      localStorage.setItem('orderNum', response.data.orderNum)
      localStorage.setItem('orderNo', response.data.orderNos)
      localStorage.setItem('orderId', response.data.orderPayId)
      localStorage.setItem('orderBaseId', response.data.orderBaseId)
      localStorage.setItem('goodsId', String(goodsId))
      if (!orderId) {
        localStorage.setItem('quantity', String(goodsNum.value))
        localStorage.setItem('name', detail.name)
        localStorage.setItem('price', expenses.totalPrice)
      }
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
        id: orderId,
        orderPayNo: orderBase.orderNo,
        userId: orderBase.userId
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
  localStorage.removeItem('boxId')
  localStorage.removeItem('payType')
  getPayTypeList()
})
</script>

<style lang="less" scoped>
.address-wrap {
  padding: 15px 15px 19px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 2px;
  background: #fff bottom / 100% 4px url('../../assets/images/address-bg.png')
    no-repeat;
  .address-box {
    .info {
      font-size: 15px;
      line-height: 22px;
      color: #000000;
      margin-bottom: 8px;
      .name {
        margin-right: 20px;
      }
    }
    .address {
      font-weight: 400;
      font-size: 13px;
      line-height: 20px;
      color: #7e8d9b;
      word-break: break-all;
    }
    .icon-add {
      font-weight: 900;
    }
    .text {
      font-weight: 600;
      font-size: 15px;
      margin-left: 10px;
      line-height: 22px;
      color: #f65e5e;
    }
  }
}
.title-cell {
  background-color: #eee;
}
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
.goods-number {
  margin: 7px 0 0;
  font-size: 13px;
  line-height: 20px;
  color: #000000;
}
.energy {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #f65e5e;
  .icon-energy {
    width: 16px;
  }
}
.subtitle {
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 10px;
  color: #000000;
}
.note-wrap {
  width: 100%;
  padding: 15px;
  background: #fff;
  border-radius: 2px;
}
</style>
