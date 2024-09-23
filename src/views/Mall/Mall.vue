<template>
  <HeaderBar :is-right="false" />
  <h5 class="title">Products</h5>
  <h5 class="subtitle">All items on sale now</h5>

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
        v-if="goodsList[index] && goodsList[index].records.length"
        v-model:loading="goodsList[index].loading"
        :finished="goodsList[index].finished"
        loading-text="Loading..."
        finished-text="No more box"
        @load="onLoad"
      >
        <div v-if="item.isBox">
          <Boxes
            v-for="(boxes, indexBox) in goodsList[index].records"
            :key="indexBox"
            :box="boxes"
            mall="Mall"
            :index="indexBox"
            :cate-id="item.id"
            :active="active"
          />
        </div>
        <div v-else>
          <Goods
            v-for="(goods, indexGoods) in goodsList[index].records"
            :key="indexGoods"
            :goods="goods"
            :index="indexGoods"
            :cate-id="item.id"
          />
        </div>
      </List>

      <Empty
        v-if="
          !goodsList[index] ||
          !goodsList[index].records ||
          !goodsList[index].records.length
        "
      />
    </tab>
  </tabs>

  <FooterBar />
</template>

<script lang="ts" setup>
import FooterBar from '@/components/FooterBar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import Empty from '@/components/Empty.vue'
import { Tabs, Tab, List } from 'vant'
import Goods from './components/Goods.vue'
import Boxes from '@/components/Boxes.vue'
import { ref, onBeforeMount, computed } from 'vue'
import { fetchMallCategory, fetchGoodsList } from '@/api/mallApi'
import { fetchBlindBoxes } from '@/api/boxesApi'
import usePage from '@/mixins/page'
import { useStore } from 'vuex'

const store = useStore()

const h5_box_list = computed(() => {
  const name = Number(store.state.user.sysConfig.h5_box_list)
  if (name === 0) {
    return 1
  } else {
    return 0
  }
})

const { initPage } = usePage()

const category = ref([])
const goodsList = ref([])
const active = ref(0)

const getGoodsList = (categoryId, isBox) => {
  if (!isBox) {
    fetchGoodsList({
      ...initPage,
      categoryId
    }).then((res: any) => {
      goodsList.value[active.value] = {
        ...res.data,
        finished: false,
        loading: false
      }
    })
  } else {
    fetchBlindBoxes({
      ...initPage,
      categoryId
    }).then((res: any) => {
      goodsList.value[active.value] = {
        ...res.data,
        finished: false,
        loading: false
      }
    })
  }
}

const beforeChange = (index) => {
  if (
    goodsList.value[index] &&
    goodsList.value[index].records &&
    goodsList.value[index].records.length
  ) {
    return
  }
  getGoodsList(category.value[index].id, category.value[index].isBox)
}

const getCategory = () => {
  fetchMallCategory({ isAudit: h5_box_list.value }).then((res) => {
    // const boxesMenu = {
    //   id: 38,
    //   name: 'Limited Time Offer',
    //   isBox: true
    // }
    // category.value = [boxesMenu, ...res.data]
    category.value = res.data
    if (category.value && category.value.length) {
      getGoodsList(category.value[0].id, category.value[0].isBox)
    }
  })
}

const onLoad = () => {
  const { current, pages, records } = goodsList.value[active.value]
  if (!current || !pages) {
    goodsList.value[active.value].finished = true
    return
  }
  const categoryId = category.value[active.value].id
  if (current === pages && goodsList.value[active.value].loading) {
    goodsList.value[active.value].finished = true
    return
  }
  goodsList.value[active.value].loading = true
  if (category.value[active.value].isBox) {
    fetchBlindBoxes({
      pageNum: current + 1,
      pageSize: initPage.pageSize,
      categoryId
    }).then((res: any) => {
      res.data.records = [...records, ...res.data.records]
      goodsList.value[active.value] = {
        ...res.data,
        finished: goodsList.value[active.value].finished,
        loading: false
      }
    })
  } else {
    fetchGoodsList({
      pageNum: current + 1,
      pageSize: initPage.pageSize,
      categoryId
    }).then((res: any) => {
      res.data.records = [...records, ...res.data.records]
      goodsList.value[active.value] = {
        ...res.data,
        finished: goodsList.value[active.value].finished,
        loading: false
      }
    })
  }
}

onBeforeMount(() => {
  getCategory()
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
</style>
