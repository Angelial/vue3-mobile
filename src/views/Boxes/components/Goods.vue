<template>
  <div ref="goodsElement" class="goods" @click="goToDetail()">
    <img :src="item.mainImage" alt="MojoMojo" class="thumb" />
    <p class="name ellipsis2">{{ item.name }}</p>
    <p class="price">₱{{ item.salePrice }}</p>
    <p
      class="type"
      :class="{
        'type-1': type === 1,
        'type-2': type === 2,
        'type-3': type === 3,
        'type-4': type === 4
      }"
    >
      {{ type === 1 ? 'Good' : '' }}
      {{ type === 2 ? 'Rare' : '' }}
      {{ type === 3 ? 'Epic' : '' }}
      {{ type === 4 ? 'Legend' : '' }}
    </p>
  </div>
</template>

<script lang="ts" setup="props, { emit }">
import { defineProps, defineEmits, ref, watch } from 'vue'
import useBuried from '@/mixins/buried'

const { sendBuried } = useBuried()

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  index: {
    type: Number
  },
  type: {
    type: Number
  },
  scrollTop: {
    type: Number
  },
  scrollY: {
    type: Number
  },
  isChange: {
    type: [Number, String],
    default: -1
  },
  boxId: {
    type: [Number, String]
  },
  show: {
    type: Boolean
  },
  DomTop: {
    type: Number
  }
})

const emit = defineEmits(['change', 'update:isChange'])

const goToDetail = () => {
  emit('change', props.item, props.index)
}

const goodsElement: any = ref('')
let isUp = false

const isInViewPort = (element) => {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const { top, right, bottom, height, left } = element.getBoundingClientRect()
  return (
    top >= props.DomTop - height / 2 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom - height / 2 <= viewHeight
  )
}

let oldScrollTop: any | never = 0
watch(
  () => props.isChange,
  () => {
    if (!isUp) {
      setTimeout(() => {
        isUp = false
      }, 3000)
      setTimeout(() => {
        if (isInViewPort(goodsElement.value)) {
          sendBuried({
            pointType: 'show_box_items',
            pointName: '盲盒内商品列表曝光',
            goodsId: props.item.id,
            goodsPosition: props.index + 1,
            goodsPrice: props.item.salePrice,
            boxId: props.boxId
          })
          isUp = true
        }
      }, 500)
    }
  }
)

watch(
  () => props.scrollTop,
  (newValue: number) => {
    if (!isUp) {
      setTimeout(() => {
        isUp = false
      }, 4000)
      setTimeout(() => {
        if (newValue == props.scrollY) {
          console.log(isInViewPort(goodsElement.value), props.index + 1)
          if (isInViewPort(goodsElement.value)) {
            sendBuried({
              pointType: 'show_box_items',
              pointName: '盲盒内商品列表曝光',
              goodsId: props.item.id,
              goodsPosition: props.index + 1,
              goodsPrice: props.item.salePrice,
              boxId: props.boxId
            })
            isUp = true
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          oldScrollTop = newValue // 每次滚动结束后都要给oldScrollTop赋值
        }
      }, 500)
    }
  }
)
</script>

<style lang="less" scoped>
.goods {
  position: relative;
  width: 173px;
  height: 268px;
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
  border-radius: 2px;
  .type {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 70px;
    height: 20px;
    font-weight: 600;
    font-size: 11px;
    line-height: 20px;
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
  .thumb {
    display: block;
    width: 153px;
    height: 153px;
    margin-bottom: 10px;
    border-radius: 2px;
  }
  .name {
    font-weight: 600;
    font-size: 15px;
    line-height: 22px;
    color: #000000;
    margin-bottom: 8px;
  }
  .price {
    font-weight: 600;
    font-size: 17px;
    line-height: 26px;
    color: #f65e5e;
  }
}
</style>
