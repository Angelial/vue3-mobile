<template>
  <nav-bar
    left-text="Setting"
    left-arrow
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onClickLeft"
  />
  <div class="setting-page">
    <div class="log-out flex-center" @click="onLogout">Log Out</div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { NavBar, Dialog } from 'vant'
const store = useStore()
const router = useRouter()

const onLogout = () => {
  Dialog.confirm({
    message: 'Are you sure you want to log out?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  })
    .then(() => {
      router.push({ name: 'Mall' })
      store.dispatch('user/clear', true)
    })
    .catch(() => {
      // on cancel
    })
}
const onClickLeft = () => {
  router.back()
}
</script>

<style lang="less" scoped>
.setting-page {
  padding-top: 82px;
  height: 100vh;
  background-color: #f6f6f6;
  .log-out {
    width: 315px;
    height: 48px;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    color: #ffffff;
    margin: 0 auto;
    background: #000000;
    border-radius: 24px;
  }
}
</style>
