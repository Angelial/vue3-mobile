<template>
  <header-bar :isRight="false" />
  <div>
    <h5 class="title">Items</h5>
    <h5 class="subtitle">Choose your style</h5>
    <div class="live-drop">
      <BetterScroll ref="scroll" @end="onLoadDrop" :loading="page.loading">
        <div class="live-drop-wrap">
          <div
            class="drop"
            v-for="(item, index) in singleGoods"
            :key="item.goodsId"
            @click="goDetail(item, index)"
          >
            <Image
              width="2.666rem"
              height="2.666rem"
              fit="cover"
              :src="item.image"
              radius="2px"
              @load="onRefresh"
            />
          </div>
        </div>
      </BetterScroll>
    </div>
    <h5 class="title">Mystery Boxes</h5>
    <h5 class="subtitle">Unbox and get these great items</h5>

    <tabs
      v-model:active="active"
      type="card"
      sticky
      offset-top="46px"
      animated
      lazy-render
      swipe-threshold="1"
      color="#000000"
      swipeable
      @change="beforeChange"
    >
      <tab v-for="(item, index) in category" :title="item.name" :key="index">
        <List
          v-if="boxesList[index] && boxesList[index].records.length"
          v-model:loading="boxesList[index].loading"
          :finished="boxesList[index].finished"
          loading-text="Loading..."
          finished-text="No more box"
          @load="onLoad"
        >
          <Boxes
            v-for="(boxes, indexBox) in boxesList[index].records"
            :key="indexBox"
            :box="boxes"
            :index="indexBox"
            :cate-id="item.id"
            :active="active"
          />
        </List>

        <Empty
          v-if="
            !boxesList[index] ||
            !boxesList[index].records ||
            !boxesList[index].records.length
          "
        />
      </tab>
    </tabs>

    <FooterBar />
  </div>
</template>

<script setup lang="ts">
import { Image, Tab, Tabs, List } from 'vant'
import { ref, onBeforeMount } from 'vue'
import FooterBar from '@/components/FooterBar.vue'
import Boxes from '@/components/Boxes.vue'
import Empty from '@/components/Empty.vue'
import BetterScroll from '@/components/Scroll.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import { useRouter } from 'vue-router'
import {
  fetchBlindBoxesCategory,
  fetchBlindBoxes,
  fetchSingleGoodsPage
} from '@/api/boxesApi'
import usePage from '@/mixins/page'

import useBuried from '@/mixins/buried'

const { sendBuried } = useBuried()

const router = useRouter()

const active = ref(0)
const boxesList = ref([])
const category = ref([])
const singleGoods = ref([])
const scroll = ref()

const { page, initPage } = usePage()

const onLoad = () => {
  const { current, pages, records } = boxesList.value[active.value]
  if (!current || !pages) {
    boxesList.value[active.value].finished = true
    return
  }
  const categoryId = category.value[active.value].id
  if (current === pages) {
    boxesList.value[active.value].finished = true
    return
  }
  boxesList.value[active.value].loading = true
  fetchBlindBoxes({
    pageNum: current + 1,
    pageSize: initPage.pageSize,
    categoryId,
    showType: 1
  }).then((res: any) => {
    res.data.records = [...records, ...res.data.records]
    boxesList.value[active.value] = {
      ...res.data,
      finished: boxesList.value[active.value].finished,
      loading: false
    }
  })
}

const getBlindBoxes = (categoryId) => {
  fetchBlindBoxes({ ...initPage, categoryId, showType: 1 }).then((res: any) => {
    boxesList.value[active.value] = {
      ...res.data,
      finished: false,
      loading: false
    }
  })
}

const getCategory = () => {
  fetchBlindBoxesCategory().then((res) => {
    category.value = res.data
    if (category.value && category.value.length) {
      getBlindBoxes(category.value[0].id)
    }
  })
}

const beforeChange = (index) => {
  if (
    boxesList.value[index] &&
    boxesList.value[index].records &&
    boxesList.value[index].records.length
  ) {
    return
  }
  getBlindBoxes(category.value[index].id)
}

const getSingleGoods = () => {
  fetchSingleGoodsPage(page).then((res: any) => {
    singleGoods.value = res.data.records
    page.pageNum = res.data.current
    page.pages = res.data.pages
  })
}

const onLoadDrop = () => {
  if (page.pageNum === page.pages || page.loading === true) {
    return
  }
  page.loading = true
  fetchSingleGoodsPage({ ...page, pageNum: page.pageNum + 1 }).then(
    (res: any) => {
      const records = [...singleGoods.value, ...res.data.records]
      singleGoods.value = records
      page.pageNum = res.data.current
      page.pages = res.data.pages
      page.loading = false
    }
  )
}
const onRefresh = () => {
  scroll.value.handlerFresh()
}

const goDetail = (item, index) => {
  router.push({
    name: 'BoxDetail',
    params: {
      id: item.bindBoxId
    }
  })
  sendBuried({
    pointType: 'click_box',
    pointName: '点击盲盒',
    boxSource: 1,
    goodsId: item.goodsId,
    boxId: item.bindBoxId,
    singlePosition: index + 1
  })
}

onBeforeMount(() => {
  getCategory()
  getSingleGoods()
})
</script>

<style lang="less" scoped>
.title {
  margin-top: 20px;
  font-weight: 600;
  font-size: 20px;
  padding-left: 15px;
  line-height: 30px;
  color: #000000;
}
.subtitle {
  font-weight: 400;
  padding-left: 15px;
  font-size: 12px;
  line-height: 18px;
  color: #7e8d9b;
}
.live-drop {
  overflow-x: auto;
  padding: 10px 0 10px 10px;
  width: 100%;
  display: flex;
}
.live-drop-wrap {
  .drop {
    display: inline-block;
    min-width: 100px;
    margin-right: 10px;
  }
}
</style>
