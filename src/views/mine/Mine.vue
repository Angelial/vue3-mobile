<template>
  <section class="personal-box flex-vertical">
    <div class="avatar-box">
      <img src="@/assets/images/avatar.png" alt="MojoMojo" class="avatar" />
    </div>
    <div class="info">
      <p class="name">{{ userInfo.nickname || '--' }}</p>
      <div class="gem-number">
        <img src="@/assets/images/gem.png" alt="MojoMojo" class="gem" />
        <span>{{ userInfo.energyAmount || '0.00' }}</span>
      </div>
    </div>
    <img
      src="@/assets/images/setting.png"
      alt="MojoMojo"
      class="setting"
      @click="goTo('Setting')"
    />
  </section>
  <section class="wrap">
    <section class="my-order">
      <h3 class="title">My Order</h3>
      <ul class="order-list flex-between">
        <li class="order" @click="goTo('Order', { type: 'PENDING' })">
          <img src="@/assets/images/pending.png" alt="MojoMojo" class="icon" />
          <span class="status">Pending</span>
          <em v-if="userInfo.waitPayCount" class="number flex-center">{{
            userInfo.waitPayCount
          }}</em>
        </li>
        <li class="order" @click="goTo('Order', { type: 'SHIP' })">
          <img src="@/assets/images/to-ship.png" alt="MojoMojo" class="icon" />
          <span class="status">To Ship</span>
          <em v-if="userInfo.waitSendCount" class="number flex-center">{{
            userInfo.waitSendCount
          }}</em>
        </li>
        <li class="order" @click="goTo('Order', { type: 'SHIPPED' })">
          <img src="@/assets/images/shipped.png" alt="MojoMojo" class="icon" />
          <span class="status">Shipped</span>
          <em v-if="userInfo.waitReceiveCount" class="number flex-center">{{
            userInfo.waitReceiveCount
          }}</em>
        </li>
        <li class="order" @click="goTo('Inventory')">
          <img
            src="@/assets/images/inventory-my.png"
            alt="MojoMojo"
            class="icon"
          />
          <span class="status">Inventory</span>
        </li>
      </ul>
    </section>

    <section class="line-item flex-vertical" @click="goToTerms()">
      <img src="@/assets/images/terms.png" alt="MojoMojo" class="icon" />
      <span class="status">Terms</span>
    </section>
  </section>

  <FooterBar />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'
import FooterBar from '@/components/FooterBar.vue'

const store = useStore()
const router = useRouter()
const userInfo = computed(() => store.state.user.user)
const isLogin = store.getters['user/isLogin']

const getUser = () => {
  if (isLogin) {
    store.dispatch('user/getUser')
  }
}
const goTo = (name, params = {}) => {
  if (!isLogin) {
    router.push({ name: 'MojoLogin' })
    return
  }
  router.push({ name, params })
}
const goToTerms = () => {
  router.push({ name: 'Terms' })
}
onMounted(async () => {
  getUser()
})
</script>

<style lang="less" scoped>
.title {
  font-weight: 600;
  font-size: 15px;
  padding: 12px 0;
  line-height: 22px;
  color: #000000;
}
.setting {
  position: absolute;
  top: 21px;
  right: 16px;
  width: 24px;
  height: 24px;
}
.personal-box {
  position: relative;
  padding: 25px 20px 25px;
  margin-bottom: 25px;
}
.avatar-box {
  width: 74px;
  height: 74px;
  padding: 3px;
  margin-right: 11px;
  border-radius: 50%;
  background: linear-gradient(
      281.43deg,
      #dd3073 3.04%,
      rgba(222, 47, 109, 0) 33.14%
    ),
    linear-gradient(
      164.38deg,
      #4b64d3 4.21%,
      #b9328e 23.29%,
      rgba(185, 50, 142, 0) 40.2%
    ),
    linear-gradient(
      217.66deg,
      #8940bf 7.14%,
      #e5365f 49.09%,
      #ec6937 61.36%,
      #f9db81 91.92%
    );
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.info {
  .name {
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #000000;
  }
  .gem-number {
    display: inline-block;
    padding: 3px 15px 3px 9px;
    background: #f6f6f6;
    line-height: 24px;
    border-radius: 16px;
    font-size: 14px;
    .gem {
      display: inline-block;
      width: 16px;
      vertical-align: middle;
      margin-right: 2px;
    }
    .number {
      display: inline-block;
      font-size: 14px;
      color: #000000;
    }
  }
}
.my-order {
  margin: 0 auto 15px;
  padding: 0 15px 15px;
  background: #f6f6f6;
  border-radius: 2px;
  .order-list {
    .order {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 23%;
      height: 77px;
      background: #fff;
      border-radius: 2px;
      padding: 10px 0;
      .icon {
        width: 40px;
        height: 40px;
      }
      .status {
        font-size: 13px;
        color: #000000;
      }
      .number {
        position: absolute;
        top: 4px;
        right: 4px;
        width: 18px;
        height: 18px;
        font-size: 12px;
        line-height: 18px;
        color: #fff;
        background: #f65e5e;
        border-radius: 50%;
      }
    }
  }
}
.line-item {
  height: 50px;
  padding: 0 20px;
  background: #f6f6f6;
  border-radius: 2px;
  .icon {
    width: 24px;
    height: 24px;
    margin-right: 24px;
  }
  .status {
    font-size: 15px;
    line-height: 22px;
    color: #000000;
  }
}
.wrap {
  padding: 0 15px;
}
</style>
