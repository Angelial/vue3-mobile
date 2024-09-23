<template>
  <nav-bar
    left-text="Item Detail"
    left-arrow
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onClickLeft"
  />
  <section class="page-wrap">
    <div class="goods-wrap">
      <div class="thumb">
        <Image
          width="100%"
          class="goods-poster"
          :src="detail.mainImage"
          mode="cover"
        />
      </div>

      <div class="goods-info">
        <h3 class="name ellipsis2">{{ detail.name }}</h3>
        <h3 class="subtitle">{{ detail.totalSalesVolumeStr }}</h3>
        <div class="price-box">
          <span class="cash">₱{{ detail.salePrice }}</span>
          <p class="energy">
            <img
              src="@/assets/images/gem.png"
              alt="MojoMojo"
              class="icon-energy"
            />
            {{ detail.energyAmountShow }}
          </p>
        </div>
      </div>
    </div>

    <section class="description">
      <h3 class="title">Description</h3>
      <div class="content">
        <div class="detail">{{ detail.description }}</div>
        <Image
          v-for="(item, index) in detail.detailImageList"
          :key="index"
          class="image"
          width="100%"
          :src="item"
          mode="cover"
        />
      </div>
    </section>
  </section>

  <footer class="footer-box-wrap">
    <div class="flex-between footer-box">
      <div class="energy flex-center" @click="onShowPayPop('ENERGY')">
        Exchange For
        <img src="@/assets/images/gem.png" alt="MojoMojo" class="icon-energy" />
      </div>
      <div class="buy flex-center" @click="onShowPayPop('CASH')">Buy Now</div>
    </div>
    <AppInfo />
  </footer>

  <PayPop
    :name="detail.name"
    :mainImg="detail.mainImage"
    :price="detail.salePrice"
    :type="payType"
    :energy="detail.energyAmountShow"
    v-model:show="isShowPayPop"
    @pay="handlerPay"
  />
</template>

<script lang="ts" setup>
import { NavBar, Image } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { fetchGoodsDetail } from '@/api/mallApi'
import { onBeforeMount, reactive, ref } from 'vue'
import PayPop from './components/PayPop.vue'
import { useStore } from 'vuex'
import AppInfo from '@/components/AppInfo.vue'
const router = useRouter()
const route = useRoute()
const store = useStore()
const detail: any = reactive({})
const isShowPayPop = ref(false)
const payType = ref('') // CASH ENERGY

const cateId = route.query.cateId

const isLogin = store.getters['user/isLogin']

const onClickLeft = () => {
  router.push({ name: 'Mall' })
}
const getDetail = () => {
  fetchGoodsDetail({ id: route.params.id }).then((res) => {
    Object.assign(detail, res.data)
  })
}
const onShowPayPop = (name) => {
  if (!isLogin) {
    router.push({ name: 'MojoLogin' })
    return
  }
  payType.value = name
  isShowPayPop.value = true
}

const handlerPay = ({ number, type }) => {
  router.push({
    name: 'GoodsPay',
    params: { id: detail.id, type, number },
    query: { cateId }
  })
}

onBeforeMount(() => {
  getDetail()
})
</script>

<style lang="less" scoped>
.page-wrap {
  width: 100%;
  padding: 10px 0 120px;
  min-height: 100vh;
  background-color: #f6f6f6;
}
.goods-wrap {
  padding: 0 10px 10px;
}
.thumb {
  display: flex;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 2px;
  .goods-poster {
    width: 100%;
    height: 100%;
  }
}
.goods-info {
  padding: 15px 20px;
  background-color: #fff;
  border-radius: 2px;
  .name {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #000000;
  }
  .subtitle {
    font-size: 400;
    font-size: 14px;
    line-height: 21px;
    color: #7e8d9b;
    margin-bottom: 10px;
  }
  .price-box {
    display: flex;
    .cash {
      font-weight: 600;
      font-size: 20px;
      line-height: 20px;
      color: #f65e5e;
      padding-right: 10px;
    }
    .energy {
      display: flex;
      align-items: center;
      padding-left: 10px;
      font-weight: 600;
      font-size: 20px;
      line-height: 20px;
      color: #000000;
      border-left: 1px solid #000;
      .icon-energy {
        height: 20px;
      }
    }
  }
}
.description {
  background-color: #fff;
  .detail {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    margin: 10px 15px;
    color: #333;
  }
  .title {
    padding-left: 20px;
    font-weight: 600;
    font-size: 16px;
    line-height: 54px;
    color: #000000;
  }
  .content {
    .image {
      display: block;
    }
  }
}
.footer-box-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 750PX;
  height: 120px;
  background-color: #fff;
  .footer-box {
    width: 100%;
    padding: 10px 15px 10px;
  }
  .energy {
    width: 195px;
    height: 48px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #000000;
    background: #fff;
    border: 3px solid #000000;
    border-radius: 12px;
    .icon-energy {
      width: 20px;
      margin-left: 4px;
    }
  }
  .buy {
    width: 138px;
    height: 48px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    background: #000000;
    border-radius: 12px;
  }
}
</style>
