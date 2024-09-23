<template>
  <ActionSheet
    lazy-render
    close-on-click-overlay
    v-model:show="showPop"
    safe-area-inset-bottom
  >
    <div class="content">
      <div class="cm-goods-wrap">
        <img :src="goods.mainImage" alt="MojoMojo" class="thumb" />

        <div class="goods-info">
          <p class="goods-name ellipsis2">{{ goods.name }}</p>
          <p class="goods-price">₱{{ drawButton[0].salePrice }}</p>
        </div>
      </div>

      <div class="draw-button">
        <div
          v-for="(item, index) in drawButton"
          :key="index"
          class="btn"
          :class="{
            green: item.drawNum === 1,
            blue: item.drawNum === 3,
            purple: item.drawNum === 5,
            orange: item.drawNum === 10
          }"
          @click="goPay(item.drawNum, item.salePrice)"
        >
          <span v-if="item.discountPrice" class="save">
            Save ₱{{ item.discountPrice }}
          </span>
          <p class="price">
            ₱{{ item.salePrice }}
            <span class="line-price"> {{ item.linySalePrice }} </span>
          </p>
          <div class="draw-name">
            <span class="text">Unbox</span>
            <span class="num">{{ item.drawNum }}</span>
          </div>
        </div>
      </div>
    </div>
  </ActionSheet>
</template>

<script lang="ts" setup="props, { emit }">
import { ActionSheet } from 'vant'
import { useRouter } from 'vue-router'
import {
  defineProps,
  PropType,
  ref,
  defineEmits,
  watch,
  onBeforeMount
} from 'vue'
import useBuried from '@/mixins/buried'

const { sendBuried } = useBuried()

const showPop = ref(false)
const router = useRouter()
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({})
  },
  drawButton: {
    type: Array as PropType<any>,
    default: () => []
  },
  show: {
    type: Boolean,
    default: false
  },
  boxId: {
    type: [String, Number],
    default: 0
  }
})
const emit = defineEmits(['update:show'])
watch(showPop, (newShowPop) => {
  emit('update:show', newShowPop)
})

watch(
  () => props.show,
  (newShow) => {
    showPop.value = newShow
  }
)

const goPay = (type, price) => {
  router.push({ name: 'BoxPay', params: { type, id: props.boxId } })
  sendBuried({
    pointType: 'click_unbox_more',
    pointName: '点击Unbox More展示的更多选项',
    drawNum: type,
    boxPrice: price
  })
}

onBeforeMount(() => {
  showPop.value = props.show
})
</script>

<style lang="less" scoped>
.content {
  height: 454px;
  padding: 20px;
  background: #f6f6f6;
}
.btn {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 25px;
  margin-bottom: 20px;
  border-radius: 28px;
  .save {
    position: absolute;
    top: -10px;
    left: 25px;
    height: 20px;
    padding: 0 8px;
    background: #f65e5e;
    border-radius: 10px;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: #ffffff;
  }
  &.green {
    background: #219e44;
    box-shadow: 0 4px 0 #7db18b;
  }
  &.blue {
    background: #245d9f;
    box-shadow: 0 4px 0 #5ca3f5;
  }
  &.purple {
    background: #9a3096;
    box-shadow: 0 4px 0 #ce42c9;
  }
  &.orange {
    background: #ffa800;
    box-shadow: 0 4px 0 #dc9304;
  }
  .price {
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #ffffff;
    .line-price {
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
      text-decoration-line: line-through;
      color: #ffffff;
    }
  }
  .draw-name {
    display: flex;
    align-items: center;
  }

  .text {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    margin-right: 28px;
    color: #ffffff;
  }
  .num {
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
  }
}
</style>
