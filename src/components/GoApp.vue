<template>
  <section class="go-app">
    <img src="@/assets/images/logo_mini.png" alt="MojoMojo" class="logo" />
    <p class="tip">Please use MojoMojo app to activate this function</p>
    <button
      class="download flex-center"
      :class="{ mini: size === 'mini' }"
      @click="goApp"
    >
      Download MojoMojo
    </button>
  </section>
</template>

<script lang="ts" setup="props">
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import envMoble from '@/util/env'

const store = useStore()

defineProps({
  size: {
    type: String,
    default: 'large' // large mini
  }
})

const pull_new_app_download_url = computed(
  () => store.state.user.sysConfig.pull_new_app_download_url
)
const goApp = () => {
  const env = envMoble.inEnv()
  const url = JSON.parse(pull_new_app_download_url.value)
  // google_address || ios_address
  if (env === 'android') {
    window.location.href = url.google_address
  } else {
    window.location.href = url.ios_address
  }
}
</script>

<style lang="less" scoped>
.go-app {
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  .logo {
    width: 100px;
    margin-bottom: 20px;
  }
  .tip {
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    margin-bottom: 20px;
    text-align: center;
    color: #333333;
  }
  .download {
    width: 315px;
    height: 48px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    color: #ffffff;
    background: #000000;
    border-radius: 24px;
    &.mini {
      width: 255px;
    }
  }
}
</style>
