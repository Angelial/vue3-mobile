<template>
  <ActionSheet
    lazy-render
    close-on-click-overlay
    v-model:show="showPop"
    safe-area-inset-bottom
    :closeable="true"
    @open="getGoods"
  >
    <div class="content">
      <img
        src="@/assets/images/icon-close.png"
        alt="MojoMojo"
        class="cm-close"
        @click="showPop = false"
      />
      <div class="title">
        <p class="name">Item detail</p>
      </div>

      <div class="img-wrap">
        <div v-if="detail.description" class="description">
          {{ detail.description }}
        </div>
        <Image
          v-for="(item, index) in detail.detailImageList"
          :key="index"
          width="100%"
          lazy-load
          :src="item"
        />
        <div v-if="detail.id" class="rate">
          {{ rate }}% ODDS for [
          {{ type === 1 ? 'Good' : '' }}
          {{ type === 2 ? 'Rare' : '' }}
          {{ type === 3 ? 'Epic' : '' }}
          {{ type === 4 ? 'Legend' : '' }}
          ] Items.
        </div>
      </div>
    </div>
  </ActionSheet>
</template>

<script lang="ts" setup="props, { emit }">
import { ActionSheet, Image } from 'vant'
import { defineProps, ref, defineEmits, watch, onBeforeMount } from 'vue'
import { fetchGoodsDetail } from '@/api/mallApi'
import useBuried from '@/mixins/buried'

const { sendBuried } = useBuried()

const showPop = ref(false)
const props = defineProps({
  goodsId: {
    type: [Number, String],
    default: undefined
  },
  show: {
    type: Boolean,
    default: false
  },
  rate: {
    type: [Number, String],
    default: 0
  },
  type: {
    type: [Number, String],
    default: 0
  },
  boxId: {
    type: [Number, String],
    default: undefined
  },
  index: {
    type: Number
  }
})
const emit = defineEmits(['update:show'])
const detail: any = ref({})
watch(showPop, (newShowPop) => {
  emit('update:show', newShowPop)
  if (!newShowPop) {
    detail.value = {}
  }
})
watch(
  () => props.show,
  (newShow) => {
    showPop.value = newShow
  }
)
const getGoodsDetail = async (goodsId: number | string) => {
  const { data } = await fetchGoodsDetail({ id: goodsId })
  detail.value = data
  sendBuried({
    pointType: 'click_view_box_item_detail',
    pointName: '点击盲盒内商品详情',
    goodsId: detail.value.id,
    goodsPrice: detail.value.salePriceReal,
    goodsPosition: props.index + 1,
    boxId: props.boxId
  })
}
const getGoods = async () => {
  if (props.goodsId) {
    getGoodsDetail(props.goodsId)
  }
}
onBeforeMount(() => {
  showPop.value = props.show
})
</script>

<style lang="less">
.img-wrap {
  .van-image {
    display: block;
  }
}
</style>

<style lang="less" scoped>
.content {
  background: #f6f6f6;
  overflow: hidden;
}
.description {
  font-size: 13px;
  line-height: 20px;
  margin: 10px 15px;
  color: #333;
}
.title {
  text-align: center;
  margin-bottom: 15px;
  padding-top: 20px;
  .name {
    font-weight: 600;
    font-size: 17px;
    line-height: 26px;
    color: #000000;
    margin-bottom: 4px;
  }
  .subtitle {
    font-size: 11px;
    line-height: 16px;
    color: #7e8d9b;
  }
}
.img-wrap {
  height: 460px;
  overflow-y: auto;
}
.rate {
  padding: 10px 15px;
  text-align: center;
  font-weight: 600;
}
</style>
