<template>
  <NavBar
    left-arrow
    fixed
    placeholder
    z-index="100"
    safe-area-inset-top
    :border="false"
    @click-left="onBack"
  />
  <iframe
    ref="iframePay"
    :src="href"
    frameborder="0"
    class="iframe-pay"
  ></iframe>
</template>

<script setup lang="ts">
import { NavBar } from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const router = useRouter()
const route = useRoute()
const iframePay: any = ref('')

const href: any = route.query.href || ''

const onBack = () => {
  localStorage.removeItem('payType')
  router.push({ name: 'ResultH5pay' })
}
const handleMessage = (e) => {
  const code = e.data.code
  if (code && code === 'success') {
    router.push({ name: 'ResultH5pay' })
  }
}
onMounted(() => {
  window.addEventListener('message', handleMessage)
})
onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<style lang="less">
.iframe-pay {
  width: 100%;
  max-width: 750PX;
  height: calc(100vh - 46px);
}
</style>
