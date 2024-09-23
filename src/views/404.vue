<template>
  <nav-bar
    left-text="MojoMojo"
    left-arrow
    fixed
    placeholder
    :border="false"
    safe-area-inset-top
    @click-left="onClickLeft"
  />
  <div class="page-error">
    <Empty image="error" description="Page is missing..." />
  </div>
</template>

<script lang="ts" setup>
import { Empty, NavBar } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()
const onClickLeft = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
.page-error {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
