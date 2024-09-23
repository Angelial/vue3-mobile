<template>
  <List
    class="order-list"
    v-if="orderList.length"
    v-model:loading="page.loading"
    :finished="page.finished"
    loading-text="Loading..."
    :immediate-check="false"
    @load="onLoad"
  >
    <section
      v-for="(order, index) in orderList"
      :key="index"
      class="order-item"
      @click="showGoAppPop = true"
    >
      <div class="time-box flex-vertical-between">
        <span class="date">{{ order.orderTime }}</span>
        <div class="time-left flex-vertical">
          {{ order.collOrderStatusStr }}
        </div>
      </div>

      <div class="box-info flex-vertical">
        <img :src="order.mainImage" alt="MojoMojo" class="thumb" />

        <div class="info">
          <p class="name ellipsis2">
            {{ order.goodsName }}
          </p>

          <p class="count">x{{ order.goodsNum }}</p>

          <p class="time">{{ order.lastSendTimeMsg }}</p>
        </div>
      </div>
    </section>
  </List>
  <Empty v-if="!orderList.length" />
  <GoAppPop v-model:show="showGoAppPop" />
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, defineProps } from 'vue'
import { List } from 'vant'
import Empty from '@/components/Empty.vue'
import usePage from '@/mixins/page'
import { fetchMyOrder } from '@/api/genericApi'
import GoAppPop from '@/components/GoAppPop.vue'

const props = defineProps({
  status: {
    type: [Number, String],
    default: 3
  }
})

const { page } = usePage()
const orderList = ref([])
const showGoAppPop = ref(false)

const getOrder = () => {
  fetchMyOrder({ ...page, status: props.status }).then((res: any) => {
    orderList.value = res.data.list
    page.pageNum = page.pageNum + 1
    page.loading = false
    page.total = res.data.total
    page.finished = Boolean(orderList.value.length === res.data.total)
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
  fetchMyOrder({ ...page, status: 3 }).then((res: any) => {
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
  padding: 0 10px 10px;
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
      color: #219e44;
    }
  }
  .box-info {
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
      .red {
        font-size: 12px;
        line-height: 18px;
        color: #f65e5e;
      }
      .time {
        font-size: 12px;
        line-height: 18px;
        color: #7e8d9b;
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
