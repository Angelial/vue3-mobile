<template>
  <nav-bar fixed placeholder safe-area-inset-top>
    <template #left>
      <img
        src="@/assets/images/MOJOMOJO.png"
        alt="MojoMojo"
        class="title-logo"
      />
    </template>
    <template #right>
      <img
        v-if="isRight"
        src="@/assets/images/icon-close.png"
        alt="MojoMojo"
        class="icon-close"
        @click="onBack"
      />
      <img
        v-else
        src="@/assets/images/customer-black.png"
        alt="MojoMojo"
        class="icon-customer"
        v-hasPermi
        @click="showGoApp = true"
      />
    </template>
  </nav-bar>
  <GoAppPop v-model:show="showGoApp" />
</template>

<script lang="ts" setup="props, { emit }">
import { NavBar } from 'vant'
import { useRouter } from 'vue-router'
import { defineProps, ref, defineEmits } from 'vue'
import GoAppPop from './GoAppPop.vue'

const router: any = useRouter()
const showGoApp = ref(false)

defineProps({
  isRight: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['back'])

const onBack = () => {
  router.back()
  emit('back')
}
</script>

<style lang="less">
.van-nav-bar .van-icon {
  color: #000000;
  font-size: 24px;
}
.van-nav-bar__text {
  font-weight: 600;
  font-size: 17px;
  color: #000000;
}
.van-button__text {
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #fff;
}
</style>

<style lang="less" scoped>
.title-logo {
  width: 143px;
}
.icon-close {
  width: 32px;
}
.icon-customer {
  width: 24px;
}
</style>
