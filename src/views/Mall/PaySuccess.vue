<template>
  <nav-bar
    left-text="Order Successfully Placed"
    left-arrow
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onClickLeft"
  />

  <section class="order-page">
    <section class="coming-soon">
      <div class="flex-vertical-between">
        <p class="txt">Coming Soon!</p>
        <img
          src="@/assets/images/truck.png"
          alt="MojoMojo"
          class="icon-truck"
        />
      </div>

      <div class="bar" />

      <section class="btn-group">
        <button class="btn btn-default" @click="showGoApp = true">
          Order Details
        </button>
        <button class="btn btn-primary" @click="goHome">Homepage</button>
      </section>
    </section>
  </section>

  <GoAppPop v-model:show="showGoApp" />
</template>

<script lang="ts" setup>
import { NavBar, Dialog } from 'vant'
import GoAppPop from '@/components/GoAppPop.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import usePixel from '@/mixins/metaPixel'

const router = useRouter()

const showGoApp = ref(false)
const route = useRoute()
const { pixelPurchase } = usePixel()

const goodsId = route.params.id

const quantity = localStorage.getItem('quantity')
const name = localStorage.getItem('name')
const price = localStorage.getItem('price')

const onClickLeft = () => {
  // TODO: 跳转
  router.push({ name: 'GoodsDetail', params: { id: goodsId } })
}

const goHome = () => {
  router.push({ name: 'Mall' })
}

const onPopState = () => {
  history.pushState(null, null, document.URL)
}

onMounted(async () => {
  Dialog.alert({
    message: 'Payment successful.',
    confirmButtonText: 'Ok'
  })
  history.pushState(null, null, document.URL)
  window.addEventListener('popstate', onPopState, false)

  pixelPurchase({
    id: goodsId,
    name: name,
    type: 'goods',
    value: price,
    quantity: quantity
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', onPopState, false)
})
</script>

<style lang="less" scoped>
.order-page {
  width: 100vw;
  height: 100vh;
  max-width: 750PX;
  padding: 10px;
  background: #f6f6f6;
}
.coming-soon {
  padding: 15px 15px 25px;
  background: #fff;
  border-radius: 2px;
  .txt {
    font-weight: 600;
    font-size: 17px;
    line-height: 26px;
    color: #000000;
  }
  .icon-truck {
    width: 62px;
    height: 62px;
  }
  .bar {
    height: 7px;
    background: #f4a100;
    border-radius: 5px;
  }
}
.btn-group {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
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
