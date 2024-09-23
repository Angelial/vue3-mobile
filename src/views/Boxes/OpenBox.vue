<template>
  <Open v-model:show="isShowOpen" />
  <section v-if="!isShowOpen" style="position: relative">
    <img
      src="@/assets/images/icon-close-white.png"
      alt="MojoMojo"
      class="icon-close"
      @click="onBack"
    />
    <section v-if="boxes.length === 1" class="open-result-one">
      <template v-for="(item, index) in boxes" :key="index">
        <div
          class="type"
          :class="{
            'type-1': item.drawGroupType === 1,
            'type-2': item.drawGroupType === 2,
            'type-3': item.drawGroupType === 3,
            'type-4': item.drawGroupType === 4
          }"
        >
          {{ item.drawGroupType === 1 ? 'Good' : '' }}
          {{ item.drawGroupType === 2 ? 'Rare' : '' }}
          {{ item.drawGroupType === 3 ? 'Epic' : '' }}
          {{ item.drawGroupType === 4 ? 'Legend' : '' }}
        </div>
        <div class="goods-box">
          <img :src="item.picUrl" alt="MojoMojo" class="goods-img" />
        </div>
        <p class="name">{{ item.drawGoodsName }}</p>
        <!-- <p class="price">₱{{ item.recoverPriceShow }}</p> -->
      </template>
    </section>

    <section v-else class="open-results">
      <div v-for="(item, index) in boxes" :key="index" class="goods-item">
        <div class="goods-box">
          <img :src="item.picUrl" alt="MojoMojo" class="goods-img" />
        </div>
        <div>
          <p
            class="type"
            :class="{
              'type-1': item.drawGroupType === 1,
              'type-2': item.drawGroupType === 2,
              'type-3': item.drawGroupType === 3,
              'type-4': item.drawGroupType === 4
            }"
          >
            No.{{ index + 1 }}
            {{ item.drawGroupType === 1 ? 'Good' : '' }}
            {{ item.drawGroupType === 2 ? 'Rare' : '' }}
            {{ item.drawGroupType === 3 ? 'Epic' : '' }}
            {{ item.drawGroupType === 4 ? 'Legend' : '' }}
          </p>
          <p class="name">{{ item.drawGoodsName }}</p>
          <!-- <p class="price">₱{{ item.recoverPriceShow }}</p> -->
        </div>
      </div>
    </section>
  </section>

  <footer v-if="!isShowOpen" class="footer-bar">
    <div class="btn-group">
      <div class="btn recycle" @click="showGoApp = true">Sell Back</div>
      <div class="btn more" @click="isShowDrewButton = true">Unbox More</div>
    </div>
    <p class="tips" @click="showGoApp = true">To My Warehouse</p>
  </footer>

  <DrawButton
    v-if="detail.drawButton"
    v-model:show="isShowDrewButton"
    :goods="{
      name: detail.name,
      mainImage: detail.mainImage
    }"
    :drawButton="detail.drawButton.discountButton.discountList"
    :boxId="detail.id"
  />

  <GoAppPop v-model:show="showGoApp" />
</template>

<script lang="ts" setup>
import Open from './components/Open.vue'
import { ref, onMounted, reactive, onBeforeMount, onBeforeUnmount } from 'vue'
import { drawBoxes, fetchBoxesDetail } from '@/api/boxesApi'
import { useRoute, useRouter } from 'vue-router'
import DrawButton from './components/DrawButton.vue'
import GoAppPop from '@/components/GoAppPop.vue'
import usePixel from '@/mixins/metaPixel'

import useBuried from '@/mixins/buried'

const { sendBuried } = useBuried()

const isShowOpen = ref(true)
const route = useRoute()
const router = useRouter()
const { pixelPurchase } = usePixel()

const orderNo = route.params.orderNo
const boxId = route.params.id
const boxes = ref([])
const isShowDrewButton = ref(false)
const detail: any = reactive({})
const showGoApp = ref(false)
const type = route.query.type

const quantity = localStorage.getItem('quantity')
const name = localStorage.getItem('name')
const price = localStorage.getItem('price')

const onBack = () => {
  router.push({ name: 'BoxDetail', params: { id: boxId } })
}

const openBoxes = async () => {
  const response: any = await drawBoxes(orderNo)
  if (response.code === 0) {
    boxes.value = response.data.list
  }
}

const getBoxesDetail = async () => {
  const response: any = await fetchBoxesDetail(boxId)
  Object.assign(detail, response.data)
}

onBeforeMount(() => {
  sendBuried({
    pointType: 'open_box_view',
    pointName: '开盲盒动画页面',
    boxId: boxId
  })
  if (type === 'result') {
    isShowOpen.value = true
  } else {
    isShowOpen.value = false
  }
})

const onPopState = () => {
  window.history.pushState(null, null, document.URL)
}

onMounted(async () => {
  history.pushState(null, null, document.URL)
  window.addEventListener('popstate', onPopState, false)
  openBoxes()
  getBoxesDetail()

  pixelPurchase({
    id: boxId,
    name: name,
    type: 'box',
    value: price,
    quantity: quantity
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', onPopState, false)
})
</script>

<style lang="less" scoped>
.icon-close {
  position: absolute;
  top: 50px;
  right: 15px;
  width: 32px;
  z-index: 4;
}
.open-result-one {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  max-width: 750PX;
  background-color: rgba(21, 22, 38, 0.9);
  .type {
    position: absolute;
    top: 64px;
    left: 0;
    width: 120px;
    height: 40px;
    font-weight: 600;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    color: #f6f6f6;
    border-radius: 0px 22.5px 22.5px 0px;
    &.type-1 {
      background: #19d302;
    }
    &.type-2 {
      background: #009fff;
    }
    &.type-3 {
      background: #b001ff;
    }
    &.type-4 {
      background: #f4a100;
    }
  }
}
.goods-box {
  width: 221px;
  height: 221px;
  padding: 10px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #f6f6f6 0%, #8c8c8c 100%);
  border-radius: 100%;
  .goods-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
  }
}
.name {
  width: 209px;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 15px;
  color: #f6f6f6;
  text-align: center;
}
.price {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #bed0ff;
  text-align: center;
}
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 750PX;
  padding-top: 10px;
  background-color: #272834;
  transform: translateX(-50%);
  .btn-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 160px;
      height: 48px;
      font-weight: 600;
      font-size: 18px;
      line-height: 27px;
      border-radius: 28px;
      &.recycle {
        color: #efe4e4;
        background: #2d2e3c;
        border: 3px solid #efe4e4;
      }
      &.more {
        color: #282a38;
        background: #efe4e4;
        border: 3px solid #efe4e4;
      }
    }
  }
  .tips {
    font-size: 18px;
    line-height: 60px;
    color: #bed0ff;
    text-align: center;
  }
}
.open-results {
  padding-bottom: 118px;
  min-height: 100vh;
  width: 100vw;
  padding-top: 84px;
  max-width: 750PX;
  background-color: rgba(21, 22, 38, 0.9);
  .goods-item {
    display: flex;
    padding: 0 15px;
    margin-bottom: 40px;
  }
  .goods-box {
    flex: 0 0 auto;
    width: 130px;
    height: 130px;
    padding: 6px;
  }
  .name {
    padding-left: 15px;
    text-align: left;
    font-size: 18px;
    line-height: 27px;
    margin-bottom: 2px;
  }
  .price {
    padding-left: 15px;
    text-align: left;
  }
  .type {
    display: inline-block;
    height: 34px;
    padding: 0 12px;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 16px;
    line-height: 34px;
    color: #f6f6f6;
    border-radius: 34px;
    &.type-1 {
      background: #19d302;
    }
    &.type-2 {
      background: #009fff;
    }
    &.type-3 {
      background: #b001ff;
    }
    &.type-4 {
      background: #f4a100;
    }
  }
}
</style>
