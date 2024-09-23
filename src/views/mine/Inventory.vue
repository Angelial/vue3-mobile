<template>
  <nav-bar
    left-text="Inventory"
    left-arrow
    fixed
    placeholder
    :border="false"
    safe-area-inset-top
    @click-left="onClickLeft"
  />
  <List
    class="inventory-list"
    v-model:loading="page.loading"
    :finished="page.finished"
    loading-text="Loading..."
    @load="onLoad"
  >
    <CheckboxGroup v-model="checked" ref="checkboxGroup">
      <ul class="boxes-list">
        <li v-for="(item, index) in orderList" :key="index" class="item">
          <Checkbox
            :name="item.orderNo"
            class="checkout"
            checked-color="#000"
          />
          <div class="boxes">
            <div class="thumb-wrap">
              <img :src="item.mainImage" alt="MojoMojo" class="thumb" />
              <span
                class="type flex-center"
                :class="{
                  'type-1': item.blindBoxGroupType === 1,
                  'type-2': item.blindBoxGroupType === 2,
                  'type-3': item.blindBoxGroupType === 3,
                  'type-4': item.blindBoxGroupType === 4
                }"
              >
                {{ item.blindBoxGroupType === 1 ? 'Good' : '' }}
                {{ item.blindBoxGroupType === 2 ? 'Rare' : '' }}
                {{ item.blindBoxGroupType === 3 ? 'Epic' : '' }}
                {{ item.blindBoxGroupType === 4 ? 'Legend' : '' }}
              </span>
            </div>
            <div class="info">
              <p class="name ellipsis2">{{ item.goodsName }}</p>
              <p class="market">
                <span class="label">Market Value:</span>
                <span class="price">₱{{ item.goodsSalePrice }}</span>
              </p>
              <div class="cost flex-vertical">
                <span class="label">Your Cost:</span>
                <div class="price flex">
                  <span v-if="item.rmbPrice">₱{{ item.rmbPrice }}</span>
                  <span
                    v-if="item.rmbPrice && Number(item.energyPriceShow)"
                    class="unit"
                    >+</span
                  >
                  <p
                    v-if="Number(item.energyPriceShow)"
                    class="gem-number flex-vertical"
                  >
                    <img
                      src="@/assets/images/gem.png"
                      alt="MojoMojo"
                      class="gem"
                    />
                    {{ item.energyPriceShow }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="sold-date">
            <span class="sold">Unbox Time</span>
            <span class="date">{{ item.orderTime }}</span>
          </div>
        </li>
      </ul>
    </CheckboxGroup>
  </List>
  <Empty v-if="!orderList.length" />
  <footer v-if="orderList.length" class="footer-bar flex-vertical-between">
    <Checkbox
      v-model="checkedAll"
      checked-color="#000"
      icon-size="20px"
      @change="changeAll"
    >
      Select All
    </Checkbox>

    <button class="confirm flex-center" @click="showGoAppPop = true">
      Confirm Shipment
    </button>
  </footer>

  <GoAppPop v-model:show="showGoAppPop" />
</template>

<script lang="ts" setup>
import { NavBar, List, Checkbox, CheckboxGroup } from 'vant'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { fetchMyWare } from '@/api/genericApi'
import usePage from '@/mixins/page'
import GoAppPop from '@/components/GoAppPop.vue'
import Empty from '@/components/Empty.vue'

const { page } = usePage()
const router = useRouter()

const checked = ref([])
const checkboxGroup: any = ref('')
const checkedAll = ref(false)
const orderList = ref([])
const showGoAppPop = ref(false)

const onLoad = () => {
  if (page.pageNum !== 1 && orderList.value.length === page.total) {
    page.finished = true
    return
  }
  page.loading = true
  fetchMyWare({ ...page, status: 1, type: 0 })
    .then((res: any) => {
      orderList.value = [...orderList.value, ...res.data.list]
      page.pageNum = page.pageNum + 1
      page.loading = false
      page.total = res.data.total
      page.finished = Boolean(orderList.value.length === res.data.total)
    })
    .catch(() => {
      page.loading = false
      page.finished = true
    })
}

const onClickLeft = () => {
  router.push({ name: 'Mine' })
}

const changeAll = (checked) => {
  checkboxGroup.value.toggleAll(checked)
}
</script>

<style lang="less" scoped>
.boxes-list {
  padding: 15px 15px calc(56px + env(safe-area-inset-bottom));
  .item {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    margin-bottom: 10px;
    .checkout {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      height: 20px;
    }
  }
  .boxes {
    display: flex;
    padding: 10px;
    background: #eee;
    .thumb-wrap {
      position: relative;
      overflow: hidden;
      width: 100px;
      height: 100px;
      border-radius: 2px;
      margin-right: 10px;
      .thumb {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .type {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20px;
        color: #fff;
        font-size: 12px;
        line-height: 18px;
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
    }
    .info {
      .market {
        margin-bottom: 4px;
      }
      .name {
        width: 174px;
        font-size: 14px;
        line-height: 21px;
        color: #000000;
        margin-bottom: 6px;
        word-break: break-all;
      }
      .label {
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        color: #7e8d9b;
        margin: 0 4px 0 0;
      }
      .price {
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        color: #f65e5e;
      }
      .unit {
        margin: 0 4px;
      }
      .gem {
        height: 14px;
        line-height: 18px;
      }
    }
  }
  .sold-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    width: 100%;
    font-size: 13px;
    line-height: 20px;
    height: 36px;
    color: #fff;
    background: #000000;
    .sold {
      font-weight: 600;
    }
  }
}
.footer-bar {
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 100%;
  max-width: 750PX;
  height: calc(56px + env(safe-area-inset-bottom));
  background-color: #f6f6f6;
  transform: translateX(-50%);
  padding: 0 15px env(safe-area-inset-bottom);
  font-size: 13px;
  line-height: 20px;
  color: #000000;
  .confirm {
    width: 150px;
    height: 40px;
    background: #000000;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    border: none;
    color: #fff;
    border-radius: 12px;
  }
}
</style>
