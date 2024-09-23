<template>
  <ActionSheet
    close-on-click-overlay
    v-model:show="showPop"
    safe-area-inset-bottom
    lazy-render
    :closeable="true"
  >
    <div class="content">
      <img
        src="@/assets/images/icon-close.png"
        alt="MojoMojo"
        class="cm-close"
        @click="showPop = false"
      />
      <div class="title">
        <p class="name">All items in this box</p>
        <p class="subtitle">The quantity and the percentage obtained</p>
      </div>

      <Tabs
        color="#7E8D9B"
        class="boxes-tab"
        :ellipsis="false"
        :line-width="70"
        v-model:active="active"
        animated
        lazy-render
        swipeable
        @change="changeTab"
      >
        <Tab>
          <template #title>
            <div class="tab-title">
              <p class="name">All</p>
              <p class="number">{{ goodsAll.length - 1 }}</p>
            </div>
          </template>
          <div ref="scrollElement" class="goods-list">
            <template v-for="(item, index) in goodsAll" :key="index">
              <Goods
                v-if="index"
                :item="item"
                :index="index - 1"
                :type="item.groupType"
                @change="changeDetail"
                :scrollTop="scrollTop"
                :scrollY="scrollY"
                :box-id="boxId"
                v-model:isChange="isChange"
                :DomTop="DomTop"
              />
            </template>
          </div>
        </Tab>

        <Tab v-for="(group, indexGroup) in groupList" :key="indexGroup">
          <template #title>
            <div class="tab-title">
              <p
                class="name"
                :class="{
                  'type-1': group.type === 1,
                  'type-2': group.type === 2,
                  'type-3': group.type === 3,
                  'type-4': group.type === 4
                }"
              >
                {{ group.type === 1 ? 'Good' : '' }}
                {{ group.type === 2 ? 'Rare' : '' }}
                {{ group.type === 3 ? 'Epic' : '' }}
                {{ group.type === 4 ? 'Legend' : '' }}
              </p>
              <p class="number">{{ group.groupGoodList.length }}</p>
              <!-- <p class="rate">{{ group.rate }}%</p> -->
            </div>
          </template>
          <div
            ref="scrollTopElement"
            :data-index="indexGroup"
            class="goods-list"
          >
            <template v-for="(item, index) in group.groupGoodList" :key="index">
              <Goods
                :item="item"
                :index="index"
                :type="group.type"
                @change="changeDetail"
                :scrollTop="scrollTop"
                :scrollY="scrollY"
                :box-id="boxId"
                v-model:isChange="isChange"
                :DomTop="DomTop"
              />
            </template>
          </div>
        </Tab>
      </Tabs>
    </div>
  </ActionSheet>
  <GoodsDetail
    v-model:show="isShowDetail"
    :goodsId="goodsId"
    :rate="rate"
    :type="type"
    :box-id="boxId"
    :index="currentIndex"
  />
</template>

<script lang="ts" setup="props, { emit }">
import { ActionSheet, Tab, Tabs } from 'vant'
import GoodsDetail from './GoodsDetail.vue'
import Goods from './Goods.vue'
import {
  defineProps,
  PropType,
  ref,
  defineEmits,
  watch,
  onBeforeMount,
  computed,
  nextTick,
  onBeforeUnmount
} from 'vue'
const showPop = ref(false)
const isShowDetail = ref(false)
const goodsId = ref(0)
const rate = ref('0')
const type = ref(0)
const active = ref(-1)

const scrollElement: any = ref('')
const scrollTopElement: any = ref('')

const props = defineProps({
  groupList: {
    type: Array as PropType<any>,
    default: () => []
  },
  goodsAll: {
    type: Array as PropType<any>,
    default: () => []
  },
  show: {
    type: Boolean,
    default: false
  },
  boxId: {
    type: [Number, String]
  }
})
const rates = computed(() => {
  const rate = {}
  props.groupList.map((item) => {
    rate[item.type] = item.rate
  })
  return rate
})

const currentIndex = ref(undefined)
const scrollTop = ref(-1)
const DomTop = ref(0)

const emit = defineEmits(['update:show'])
const isChange: any = ref('')

watch(showPop, (newShowPop) => {
  newShowPop &&
    nextTick(() => {
      setTimeout(() => {
        scrollElement.value &&
          scrollElement.value.addEventListener('scroll', onScroll, false)
        newShowPop && (isChange.value = '0')
        const { top } = scrollElement.value.getBoundingClientRect()
        DomTop.value = top
      }, 20)
    })
  !newShowPop && (isChange.value = '')
  emit('update:show', newShowPop)
})

watch(
  () => props.show,
  (newShow) => {
    showPop.value = newShow
    newShow && (active.value = 0)
  }
)
const scrollY = ref(0)
const onScroll = (e) => {
  scrollTop.value = e.target.scrollTop
  setTimeout(() => {
    scrollY.value = e.target.scrollTop
  }, 100)
}

const changeTab = (name) => {
  isChange.value = active.value
  scrollTopElement.value[name - 1] &&
    scrollTopElement.value[name - 1].addEventListener('scroll', onScroll, false)
}

const changeDetail = (item: any, index: number) => {
  currentIndex.value = index
  goodsId.value = item.goodsId
  isShowDetail.value = true
  rate.value = rates.value[item.groupType]
  type.value = item.groupType
}
onBeforeMount(() => {
  showPop.value = props.show
})
onBeforeUnmount(() => {
  scrollElement.value &&
    scrollElement.value.removeEventListener('scroll', onScroll, false)
  scrollTopElement.value[0] &&
    scrollTopElement.value[0].removeEventListener('scroll', onScroll, false)
  scrollTopElement.value[1] &&
    scrollTopElement.value[1].removeEventListener('scroll', onScroll, false)
  scrollTopElement.value[2] &&
    scrollTopElement.value[2].removeEventListener('scroll', onScroll, false)
  scrollTopElement.value[3] &&
    scrollTopElement.value[3].removeEventListener('scroll', onScroll, false)
  isChange.value = ''
})
</script>

<style lang="less">
.boxes-tab {
  .van-tabs__wrap {
    height: 55px;
    .van-tabs__nav {
      padding: 0;
    }
    .van-tab--grow {
      padding: 0 !important;
    }
    .van-tab__text {
      width: 100%;
      height: 100%;
      padding: 10px 0;
    }
    .van-tabs__line {
      bottom: 0;
    }
  }
}
</style>

<style lang="less" scoped>
.content {
  background: #f6f6f6;
  overflow: hidden;
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
.tab-title {
  text-align: center;
  color: #7e8d9b;
  .name {
    font-weight: 600;
    font-size: 13px;
    line-height: 20px;
    &.type-1 {
      color: #19d302;
    }
    &.type-2 {
      color: #009fff;
    }
    &.type-3 {
      color: #b001ff;
    }
    &.type-4 {
      color: #f4a100;
    }
  }
  .number {
    font-size: 10px;
    line-height: 15px;
    color: #7e8d9b;
  }
}
.goods-list {
  display: flex;
  flex-wrap: wrap;
  height: 380px;
  overflow-y: auto;
  justify-content: space-between;
  padding: 10px;
}
</style>
