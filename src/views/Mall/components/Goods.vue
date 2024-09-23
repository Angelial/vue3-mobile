<template>
  <section class="goods-box" @click="goToDetail">
    <div class="goods-poster-wrap">
      <Image
        width="3.333rem"
        height="3.333rem"
        fit="cover"
        lazy-load
        radius="2px"
        :src="goods.mainImage"
      />
    </div>
    <div class="info-box">
      <div class="name ellipsis2">{{ goods.name }}</div>
      <div class="subtitle">{{ goods.totalSalesVolumeStr }}</div>

      <div class="price">
        <p class="cash">
          ₱{{ goods.salePrice }}
          <span class="or">or</span>
        </p>
        <p class="energy">
          <img
            src="@/assets/images/gem.png"
            alt="MojoMojo"
            class="icon-energy"
          />
          {{ goods.energyAmountShow }}
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup="props">
import { defineProps } from 'vue'
import { Image } from 'vant'
import { useRouter } from 'vue-router'
import useBuried from '@/mixins/buried'
import { useStore } from 'vuex'

const store = useStore()
const isLogin = store.getters['user/isLogin']

const { sendBuried } = useBuried()

const router = useRouter()
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number
  },
  cateId: {
    type: Number
  }
})
const goToDetail = () => {
  if (!isLogin) {
    router.push({ name: 'MojoLogin' })
    return
  }
  router.push({
    name: 'GoodsDetail',
    params: { id: props.goods.id },
    query: { cateId: props.cateId }
  })
  sendBuried({
    pointName: '点击商品',
    pointType: 'click_goods',
    goodsId: props.goods.id,
    goodsPosition: props.index,
    goodsPrice: props.goods.salePriceReal,
    goodsMenu: props.cateId,
    goodsStonePrice: props.goods.energyAmount
  })
}
</script>

<style lang="less" scoped>
.goods-box {
  display: flex;
  margin: 0 15px 10px;
  padding: 10px;
  border-radius: 2px;
  background-color: #eee;
  .goods-poster-wrap {
    display: flex;
    background-color: #f6f6f6;
    border-radius: 2px;
    margin-right: 10px;
  }
  .info-box {
    display: flex;
    flex-direction: column;

    .name {
      width: 191px;
      font-weight: 600;
      font-size: 15px;
      line-height: 22px;
      margin-bottom: 4px;
      color: #000000;
      word-break: break-all;
    }
    .subtitle {
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #7e8d9b;
    }
    .price {
      margin-top: auto;
      .cash {
        font-weight: 600;
        font-size: 15px;
        line-height: 22px;
        color: #f65e5e;
        .or {
          font-weight: 600;
          font-size: 14px;
          line-height: 22px;
          color: #728290;
        }
      }
      .energy {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 15px;
        line-height: 22px;
        color: #000000;
        .icon-energy {
          width: 16px;
        }
      }
    }
  }
}
</style>
