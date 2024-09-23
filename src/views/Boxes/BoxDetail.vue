<template>
  <NavBar
    left-arrow
    fixed
    placeholder
    z-index="100"
    safe-area-inset-top
    :border="false"
    @click-left="onBack"
  >
    <template #right>
      <div class="gem-number">
        <img src="@/assets/images/gem.png" alt="MojoMojo" class="gem" />
        <span>{{ energyAmount }}</span>
      </div>
      <Badge :content="waitCount" :show-zero="false" color="#000" v-hasPermi>
        <div class="opera" @click="showGoApp = true">
          <img
            src="@/assets/images/storehouse.png"
            alt="MojoMojo"
            class="icon"
          />
        </div>
      </Badge>
      <div v-hasPermi class="opera" @click="showGoApp = true">
        <img src="@/assets/images/customer.png" alt="MojoMojo" class="icon" />
      </div>
    </template>
  </NavBar>

  <Swipe class="goods-swipe" :show-indicators="false" @change="changeSwipe">
    <SwipeItem
      v-for="(item, index) in detail.goodsAll"
      :key="index"
      class="goods-swipe-item"
    >
      <div class="img-wrap">
        <img class="swipe-img" :src="item.mainImage" />
        <img
          v-if="isShowWebpGoods && index === swipeIndex"
          src="@/assets/images/webp-goods.gif"
          alt="MojoMojo"
          class="webp-goods"
        />
        <img
          src="@/assets/images/shadow.gif"
          alt="MojoMojo"
          class="webp-shadow"
        />
      </div>
    </SwipeItem>
  </Swipe>
  <section v-if="detail.goodsAll" class="goods-info">
    <h3 class="name ellipsis2">{{ detail.goodsAll[swipeIndex].name }}</h3>
    <div v-if="detail.description" class="description ellipsis2">
      {{ detail.description }}
    </div>
    <div class="cm-price">
      <span class="sell-price">
        ₱{{ detail.goodsAll[swipeIndex].salePrice }}
      </span>
      <span
        v-if="
          swipeIndex === 0 &&
          detail.goodsAll[swipeIndex].linySalePrice &&
          Number(detail.goodsAll[swipeIndex].salePrice) <
            Number(detail.goodsAll[swipeIndex].linySalePrice)
        "
        class="original-price"
        >{{ detail.goodsAll[swipeIndex].linySalePrice }}</span
      >
      <img
        v-else-if="detail.goodsAll[swipeIndex].groupType === 1"
        src="@/assets/images/good.png"
        alt="MojoMojo"
        class="group-type"
      />
      <img
        v-else-if="detail.goodsAll[swipeIndex].groupType === 2"
        src="@/assets/images/rare.png"
        alt="MojoMojo"
        class="group-type"
      />
      <img
        v-else-if="detail.goodsAll[swipeIndex].groupType === 3"
        src="@/assets/images/epic.png"
        alt="MojoMojo"
        class="group-type"
      />
      <img
        v-else-if="detail.goodsAll[swipeIndex].groupType === 4"
        src="@/assets/images/legend.png"
        alt="MojoMojo"
        class="group-type"
      />
    </div>
  </section>

  <section class="all-goods-swipe" @click="changeShowBoxesGoods">
    <div v-if="detail.goodsAll" class="goods-wrap">
      <LoopScroll :goods-list="detail.goodsAll" />
    </div>
    <div class="click-to">
      <img
        src="@/assets/images/word-slide.gif"
        alt="MojoMojo"
        class="click-img"
      />
    </div>
  </section>
  <section class="more-boxes">
    <MoreBoxes :boxId="detail.id" />
  </section>

  <div class="footer-bar-box"></div>
  <footer v-if="detail.drawButton" class="footer-bar-wrap">
    <div class="footer-bar">
      <div
        v-if="detail.drawButton.discountButton.discountList.length > 1"
        class="consecutively flex-center flex-column"
        @click="changeShowDrewButton"
      >
        <p
          v-if="detail.drawButton.discountButton.discountList.length > 2"
          class="name"
        >
          Unbox more
        </p>
        <p v-else class="name">
          Unbox {{ detail.drawButton.discountButton.discountList[1].drawNum }}
        </p>

        <p v-if="detail.drawButton.discountButton.maxDiscount" class="tip">
          Save up to ₱{{ detail.drawButton.discountButton.maxDiscount }}
        </p>
      </div>
      <div class="once flex-center flex-column" @click="goPay(1)">
        <p class="name">Unbox 1</p>
        <p class="tip">
          ₱{{ detail.drawButton.oneDrawButton.salePrice }}
          <span class="line-price">
            {{ detail.drawButton.oneDrawButton.linySalePrice }}
          </span>
        </p>
      </div>
    </div>
    <AppInfo />
  </footer>
  <DrawButton
    v-if="detail.drawButton"
    v-model:show="isShowDrawButton"
    :goods="{
      name: detail.name,
      mainImage: detail.mainImage
    }"
    :drawButton="detail.drawButton.discountButton.discountList"
    :boxId="detail.id"
  />
  <BoxesGoods
    v-model:show="isShowBoxesGoods"
    :groupList="detail.groupList"
    :goodsAll="detail.goodsAll"
    :box-id="detail.id"
  />
  <GoAppPop v-model:show="showGoApp" />
</template>

<script lang="ts" setup>
import { NavBar, Badge, Swipe, SwipeItem } from 'vant'
import { onBeforeMount, ref, computed, watch } from 'vue'
import { fetchBoxesDetail, fetchWaitCount } from '@/api/boxesApi'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import MoreBoxes from '@/components/MoreBoxes.vue'
import LoopScroll from './components/LoopScroll.vue'
import DrawButton from './components/DrawButton.vue'
import BoxesGoods from './components/BoxesGoods.vue'
import GoAppPop from '@/components/GoAppPop.vue'
import AppInfo from '@/components/AppInfo.vue'
import useBuried from '@/mixins/buried'

const { sendBuried } = useBuried()

const route = useRoute()
const router = useRouter()
const store = useStore()

const energyAmount = computed(
  () => store.state.user.user.energyAmount || '0.00'
)
const isLogin = store.getters['user/isLogin']
const boxId = route.params.id

const detail: any = ref({})
const swipeIndex = ref(0)
const isShowWebpGoods = ref(false)
const isShowDrawButton = ref(false)
const isShowBoxesGoods = ref(false)
const showGoApp = ref(false)
const cateId = route.query.cateId

const waitCount = ref(0)

const h5_box_list = computed(() => {
  return Number(store.state.user.sysConfig.h5_box_list)
})

watch(isShowWebpGoods, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      isShowWebpGoods.value = false
    }, 2000)
  }
})

const getBoxesDetail = async () => {
  const response: any = await fetchBoxesDetail(boxId)
  const { groupList } = response.data
  const goodsAll = []
  groupList.map((item: any) => {
    if (item.groupGoodList.length) {
      goodsAll.push(...item.groupGoodList)
    }
  })
  goodsAll.unshift({
    mainImage: response.data.mainImage,
    name: response.data.name,
    salePrice: response.data.salePrice,
    linySalePrice: response.data.linySalePrice
  })
  response.data.goodsAll = goodsAll
  detail.value = response.data
  isShowWebpGoods.value = true
}

const changeSwipe = (index) => {
  isShowWebpGoods.value = false
  swipeIndex.value = index
  isShowWebpGoods.value = true
}

const onBack = () => {
  if (h5_box_list.value === 0) {
    router.push({ name: 'Mall' })
  } else {
    if (route.query.mall === 'Mall') {
      router.push({ name: 'Mall' })
    } else {
      router.push({ name: 'BlindBox' })
    }
  }
}

const getWaitCount = async () => {
  const response: any = await fetchWaitCount()
  response.data && (waitCount.value = response.data)
}
const changeShowDrewButton = () => {
  if (!isLogin) {
    router.push({ name: 'MojoLogin' })
    return
  }
  if (detail.value.drawButton.discountButton.discountList.length === 2) {
    goPay(detail.value.drawButton.discountButton.discountList[1].drawNum)
    return
  }
  isShowDrawButton.value = true
  sendBuried({
    pointType: 'click_unbox_num',
    pointName: '盲盒详情页点击Unbox More、Unbox N埋点',
    boxId: detail.value.id,
    drawNum: 0
  })
}
const changeShowBoxesGoods = () => {
  isShowBoxesGoods.value = true
  sendBuried({
    pointType: 'click_view_box_content',
    pointName: '点击查看盲盒内容',
    boxId: detail.value.id
  })
}
const goPay = (type) => {
  if (!isLogin) {
    router.push({ name: 'MojoLogin' })
    return
  }
  sendBuried({
    pointType: 'click_unbox_num',
    pointName: '盲盒详情页点击Unbox More、Unbox N埋点',
    boxId: detail.value.id,
    drawNum: type
  })
  router.push({
    name: 'BoxPay',
    params: { type, id: boxId },
    query: { cateId: cateId }
  })
}
onBeforeMount(() => {
  getBoxesDetail()
  if (isLogin) {
    getWaitCount()
  }
})
</script>

<style lang="less" scoped>
.gem-number {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  background: #f6f6f6;
  border: 1px solid #efe4e4;
  box-sizing: border-box;
  border-radius: 16px;
  .gem {
    width: 16px;
    margin-right: 2px;
  }
}
.opera {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-left: 10px;
  background: #f6f6f6;
  border: 1px solid #efe4e4;
  border-radius: 50%;
  .icon {
    width: 20px;
  }
}
.goods-swipe {
  height: 280px;
  width: 100%;
  .goods-swipe-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swipe-img {
    display: block;
    width: 220px;
    height: 220px;
    object-fit: cover;
    animation: pulse 1s infinite;
  }
  .img-wrap {
    position: relative;
    .webp-goods {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 280px;
      object-fit: cover;
      transform: translate(-50%, -50%);
    }
    .webp-shadow {
      position: absolute;
      bottom: -130px;
      left: 50%;
      width: 239px;
      transform: translateX(-50%);
      opacity: 0.2;
    }
  }
}
.goods-info {
  text-align: center;
  margin-bottom: 20px;
  .description {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    margin: 10px 15px;
    color: #333;
  }
  .name {
    padding: 0 52px;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #000000;
  }
  .group-type {
    height: 27px;
    margin-left: 9px;
  }
}
.warp {
  width: 130px * 4;
  height: 120px;
  margin: 0 auto;
  overflow: hidden;
}
.all-goods-swipe {
  background-color: #f6f6f6;
  .goods-wrap {
    height: 100px;
    padding: 20px 0;
    border-bottom: 1px dashed #bcbcbc;
    .goods-list {
      display: flex;
      padding: 0 15px;
    }
    .goods-item {
      position: relative;
      margin-right: 8px;
      border-radius: 2px;
      overflow: hidden;
      .goods-img {
        display: block;
        width: 60px;
        height: 60px;
      }
      .type {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 18px;
        font-weight: 400;
        font-size: 10px;
        line-height: 18px;
        text-align: center;
        color: #ffffff;
        z-index: 1;
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
  }
  .click-to {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 43px;
    .click-img {
      display: block;
      height: 35px;
    }
  }
}
.more-boxes {
  padding-bottom: 148px;
}
.footer-bar-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 750PX;
  z-index: 100;
  height: 118px;
  background-color: #fff;
  .footer-bar {
    width: 100%;
    display: flex;
    height: 70px;
    padding: 10px 0 10px;
    background: linear-gradient(90deg, #ff3131 0%, #fff500 100%);
    text-align: center;
    color: #faff00;
  }
  .name {
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;
  }
  .tip {
    font-size: 12px;
    line-height: 18px;
    .line-price {
      text-decoration: line-through;
    }
  }
  .consecutively {
    flex: 0 0 auto;
    width: 229px;
    border-right: 2px solid rgba(255, 255, 255, 0.6);
    & + .once {
      color: #f50000;
    }
  }
  .once {
    flex: 1;
  }
}

@keyframes pulse {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -15px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
