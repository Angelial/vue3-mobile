<template>
  <nav-bar
    left-text="My Order"
    left-arrow
    fixed
    placeholder
    :border="false"
    safe-area-inset-top
    @click-left="onClickLeft"
  />

  <div class="order-content">
    <tabs
      v-model:active="active"
      sticky
      offset-top="46px"
      type="card"
      class="three-tabs"
      color="#000000"
    >
      <tab title="Pending" name="PENDING">
        <Pending />
      </tab>

      <tab title="To Ship" name="SHIP">
        <Ship :status="3" />
      </tab>

      <tab title="Shipped" name="SHIPPED">
        <Ship :status="4" />
      </tab>
    </tabs>
    <MoreBoxes
      v-if="active !== 'PENDING' && h5_box_list === 1"
      pageKey="GoodsOrderActivity"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, computed } from 'vue'
import { NavBar, Tabs, Tab } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import Pending from './components/Pending.vue'
import Ship from './components/Ship.vue'
import MoreBoxes from '@/components/MoreBoxes.vue'
import { useStore } from 'vuex'

const store = useStore()

const h5_box_list = computed(() => {
  return Number(store.state.user.sysConfig.h5_box_list)
})

const router = useRouter()
const route = useRoute()
const active: any = ref('')
const type = route.params.type

const onClickLeft = () => {
  router.push({ name: 'Mine' })
}
onBeforeMount(() => {
  active.value = type
})
</script>

<style lang="less" scoped>
.order-content {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 10px;
  background-color: #f6f6f6;
  .go-app {
    margin-bottom: 30px;
  }
}
</style>
