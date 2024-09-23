<template>
  <div ref="boxesElement" class="boxes-wrap" @click="goToDetail">
    <div class="boxes-poster-wrap">
      <!-- 150px -->
      <Image
        width="4rem"
        height="4rem"
        fit="cover"
        radius="2px"
        lazy-load
        :src="box.blindBoxBasic.mainImage"
      />
    </div>

    <div class="boxes-detail">
      <div class="boxes-goods">
        <template
          v-for="(item, index) in box.blindBoxData.imageList"
          :key="index"
        >
          <div v-if="index < 4" class="goods-poster-wrap">
            <!-- 40px -->
            <Image
              width="1.06rem"
              height="1.06rem"
              fit="cover"
              lazy-load
              radius="2px"
              :src="item"
            />
          </div>
        </template>
      </div>

      <div class="boxes-info">
        <div class="name ellipsis">{{ box.blindBoxBasic.name }}</div>
        <div class="subtitle ellipsis">
          {{ box.blindBoxData.totalSalesVolumeStr }}
        </div>
        <div class="price">
          <span class="sell-price">₱{{ box.blindBoxData.salePrice }}</span>
          <span
            v-if="
              Number(box.blindBoxData.salePrice) <
              Number(box.blindBoxData.linyPrice)
            "
            class="original-price"
          >
            {{ box.blindBoxData.linyPrice }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup="props">
import { defineProps, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Image } from 'vant'
import { useRouter } from 'vue-router'
import useBuried from '@/mixins/buried'
import { useStore } from 'vuex'

const { sendBuried } = useBuried()
const store = useStore()
const isLogin = store.getters['user/isLogin']

const router = useRouter()
const props = defineProps({
  box: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number
  },
  cateId: {
    type: Number
  },
  mall: {
    type: String
  },
  active: {
    type: Number
  }
})

const boxesElement: any = ref('')
let isUp = false

const isInViewPort = (element) => {
  if (!element) return
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const { top, right, bottom, left } = element.getBoundingClientRect()

  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight
}
const scrollTop = ref(-1)
let oldScrollTop: any | never = 0
watch(scrollTop, (newValue: number) => {
  if (!isUp) {
    setTimeout(() => {
      isUp = false
    }, 4000)
    setTimeout(() => {
      if (newValue == window.scrollY) {
        if (isInViewPort(boxesElement.value)) {
          sendBuried({
            pointType: 'show_box',
            pointName: '曝光-盲盒',
            boxSource: 1,
            boxId: props.box.blindBoxBasic.id,
            boxPosition: props.index + 1,
            boxPrice: props.box.blindBoxData.salePrice,
            boxMenu: props.cateId
          })
          isUp = true
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        oldScrollTop = newValue // 每次滚动结束后都要给oldScrollTop赋值
      }
    }, 500)
  }
})

watch(
  () => props.active,
  () => {
    if (!isUp) {
      setTimeout(() => {
        isUp = false
      }, 3000)
      setTimeout(() => {
        if (isInViewPort(boxesElement.value)) {
          sendBuried({
            pointType: 'show_box',
            pointName: '曝光-盲盒',
            boxSource: 1,
            boxId: props.box.blindBoxBasic.id,
            boxPosition: props.index + 1,
            boxPrice: props.box.blindBoxData.salePrice,
            boxMenu: props.cateId
          })
          isUp = true
        }
      }, 500)
    }
  }
)

const onScroll = () => {
  scrollTop.value = window.scrollY
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, false)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const goToDetail = () => {
  if (!isLogin) {
    router.push({ name: 'MojoLogin' })
    return
  }
  router.push({
    name: 'BoxDetail',
    params: { id: props.box.blindBoxBasic.id },
    query: {
      mall: props.mall,
      cateId: props.cateId
    }
  })
  sendBuried({
    pointType: 'click_box',
    pointName: '点击盲盒',
    boxSource: 1,
    boxId: props.box.blindBoxBasic.id,
    boxPosition: props.index + 1,
    boxPrice: props.box.blindBoxData.salePrice,
    boxMenu: props.cateId
  })
}
</script>

<style lang="less" scoped>
.boxes-wrap {
  display: flex;
  margin: 0 15px 10px;
  background: #eee;
  border-radius: 2px;
  .boxes-detail {
    flex: 1;
    padding: 10px 10px 10px 7px;
  }
  .boxes-poster-wrap {
    display: flex;
    flex: 0 0 auto;
  }
  .boxes-goods {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .goods-poster-wrap {
      display: flex;
      background-color: #f6f6f6;
      border-radius: 2px;
    }
  }
  .boxes-info {
    width: 100%;
    height: 80px;
    padding: 8px 14px;
    background-color: #f6f6f6;
    border-radius: 2px;
    .name {
      width: 150px;
      font-weight: 600;
      font-size: 15px;
      line-height: 22px;
      color: #000000;
      word-break: break-all;
    }
    .subtitle {
      width: 150px;
      font-size: 12px;
      line-height: 18px;
      color: #7e8d9b;
    }
    .price {
      display: flex;
      align-items: center;
      margin-top: 4px;
      .sell-price {
        font-weight: 600;
        font-size: 17px;
        color: #000000;
      }
      .original-price {
        margin-left: 4px;
        font-size: 13px;
        color: #7e8d9b;
        text-decoration: line-through;
      }
    }
  }
}
</style>
