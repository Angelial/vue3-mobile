<template>
  <vanDialog
    class="down-wrap-pop"
    v-model:show="isShow"
    :show-confirm-button="false"
  >
    <div class="go-app-wrap">
      <GoApp size="mini" />
      <img
        src="@/assets/images/icon-close.png"
        alt="MojoMojo"
        class="close"
        @click="handlerClose"
      />
    </div>
  </vanDialog>
</template>

<script lang="ts" setup="props, { emit }">
import { Dialog } from 'vant'
import GoApp from './GoApp.vue'
import { ref, defineProps, defineEmits, watch } from 'vue'
const vanDialog = Dialog.Component

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const isShow = ref(false)
const emit = defineEmits(['update:show'])

const handlerClose = () => {
  emit('update:show', false)
  isShow.value = false
}
watch(
  () => props.show,
  (newShow) => {
    isShow.value = newShow
  }
)
</script>

<style lang="less">
.down-wrap-pop {
  .van-dialog {
    .van-dialog__footer {
      border: none;
    }
  }
}
</style>

<style lang="less" scoped>
.go-app-wrap {
  position: relative;
  padding: 15px;
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 35px;
    height: 35px;
  }
}
</style>
