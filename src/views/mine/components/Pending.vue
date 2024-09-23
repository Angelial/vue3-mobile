<template>
  <List
    class="order-list"
    v-if="orderList.length"
    v-model:loading="page.loading"
    :finished="page.finished"
    loading-text="Loading..."
    @load="onLoad"
  >
    <section
      v-for="(order, index) in orderList"
      :key="index"
      class="order-item"
    >
      <div class="time-box flex-vertical-between">
        <span class="date">{{ order.orderTime }}</span>
        <div class="time-left flex-vertical">
          Time Left
          <CountDown
            class="number"
            :time="order.expireTime - order.currentTime"
            format="HH:mm:ss"
          />
        </div>
      </div>

      <div
        class="box-info flex-vertical"
        @click="goPay(order.id, order.type, order.goodsId)"
      >
        <img :src="order.mainImage" alt="MojoMojo" class="thumb" />

        <div class="info">
          <p class="name ellipsis2">
            {{ order.goodsName }}
          </p>

          <p class="count">x{{ order.goodsNum }}</p>

          <p class="amount flex-vertical">
            <span>Total Payment</span>
            <span class="price">₱{{ order.totalPrice }}</span>
          </p>
        </div>
      </div>

      <div class="btn-group">
        <button
          class="btn flex-center btn-default"
          @click="cancelOrder(order, index)"
        >
          Cancel Order
        </button>
        <button
          class="btn flex-center btn-primary"
          @click="goPay(order.id, order.type, order.goodsId)"
        >
          Pay Now
        </button>
      </div>
    </section>
  </List>
  <Empty v-if="!orderList.length" />
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { List, CountDown, Dialog, Toast } from 'vant'
import Empty from '@/components/Empty.vue'
import { useStore } from 'vuex'
import usePage from '@/mixins/page'
import { fetchMyOrder } from '@/api/genericApi'
import { cancelPay } from '@/api/payApi'
import router from '@/router'
const { page } = usePage()
const orderList = ref([])
const store = useStore()

const user = computed(() => store.state.user.user)

const getOrder = () => {
  fetchMyOrder({ ...page, status: 1 }).then((res: any) => {
    orderList.value = res.data.list
    page.pageNum = page.pageNum + 1
    page.loading = false
    page.total = res.data.total
    page.finished = Boolean(orderList.value.length === res.data.total)
  })
}
const goPay = (id, type, goodsId) => {
  if (type === 1) {
    router.push({
      name: 'GoodsPay',
      params: { id: goodsId },
      query: { orderId: id }
    })
  } else if (type === 2) {
    router.push({ name: 'OrderPay', params: { id } })
  }
}

const cancelOrder = (item: any, index: number) => {
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
        id: item.id,
        orderPayNo: item.orderNo,
        userId: user.value.id
      }).then((res: any) => {
        if (res.code === 0) {
          orderList.value.splice(index, 1)
        } else if (res.code === 400) {
          Toast(res.message)
        }
      })
    })
}
const onLoad = () => {
  if (page.pageNum === 1) {
    return
  }
  if (orderList.value.length === page.total) {
    page.finished = true
    return
  }
  page.loading = true
  fetchMyOrder({ ...page, status: 1 }).then((res: any) => {
    orderList.value = [...orderList.value, ...res.data.list]
    page.pageNum = page.pageNum + 1
    page.finished = Boolean(orderList.value.length === res.data.total)
    page.loading = false
  })
}

onBeforeMount(() => {
  getOrder()
})
</script>

<style lang="less" scoped>
.order-list {
  padding: 0 10px;
}
.order-item {
  width: 100%;
  padding: 15px;
  margin: 10px auto 0;
  background: #fff;
  border-radius: 2px;
  .time-box {
    margin-bottom: 9px;
    .date {
      font-size: 12px;
      line-height: 18px;
      color: #7e8d9b;
    }
    .time-left {
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: #f4a100;
      .number {
        margin-left: 4px;
        color: #f4a100;
      }
    }
  }
  .box-info {
    margin-bottom: 18px;
    .thumb {
      width: 90px;
      height: 90px;
      margin-right: 10px;
      border-radius: 2px;
      object-fit: cover;
    }
    .info {
      .name {
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #000000;
      }
      .count {
        font-size: 13px;
        line-height: 20px;
        color: #000000;
      }
      .amount {
        font-size: 13px;
        color: #7e8d9b;
        .price {
          font-weight: 600;
          font-size: 17px;
          color: #f65e5e;
          margin-left: 8px;
        }
      }
    }
  }
  .btn-group {
    display: flex;
    justify-content: flex-end;
    .btn {
      height: 34px;
      padding: 4px 15px;
      background: #000000;
      border-radius: 17px;
      font-weight: 600;
      font-size: 14px;
      border: none;
      line-height: 26px;
      color: #ffffff;
      &.btn-default {
        background: #e0e0e0;
      }
      &.btn-primary {
        background: #000000;
      }
      & + .btn {
        margin-left: 11px;
      }
    }
  }
}
</style>
