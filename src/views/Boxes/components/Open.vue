<template>
  <section v-if="show" class="open-wrap">
    <ConfigProvider :theme-vars="themeVars">
      <NavBar
        left-arrow
        fixed
        placeholder
        safe-area-inset-top
        :border="false"
        @click-left="onBack"
      />
    </ConfigProvider>
    <img src="@/assets/images/unbox.png" alt="MojoMojo" class="unbox" />

    <div v-if="process < 100" class="box-wrap">
      <img src="@/assets/images/open.png" alt="MojoMojo" class="box-img" />
      <div class="process">
        <Slider
          v-model="process"
          bar-height="30"
          button-size="55"
          step="1"
          inactive-color="rgba(0, 0, 0, 0)"
        >
          <template #button>
            <img src="@/assets/images/knife.png" alt="MojoMojo" class="knife" />
          </template>
        </Slider>
      </div>
    </div>

    <div v-else class="box-wrap">
      <img :src="imgs" alt="MojoMojo" @load="onImgLoad" class="box-img" />
    </div>

    <p class="slide">Use the cutter to unbox now!</p>
    <audio hidden="true" ref="audio" autoplay>
      <source :src="mp3_draw_symbol" type="audio/mpeg" />
    </audio>
  </section>
</template>

<script lang="ts" setup="props, { emit }">
import { NavBar, ConfigProvider, Slider } from 'vant'
import { ref, defineProps, defineEmits, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const router = useRouter()
const boxId = route.params.id

const imgs = require('@/assets/images/opening.gif')

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const themeVars = {
  navBarBackgroundColor: 'rgba(255, 255, 255, 0)'
}
const mp3_draw_symbol = computed(
  () => store.state.user.sysConfig.mp3_draw_symbol
)
const audio = ref()
const process = ref(0)

const emit = defineEmits(['update:show'])
watch(
  () => props.show,
  (newShow) => {
    emit('update:show', newShow)
  }
)
const onBack = () => {
  router.push({ name: 'BoxDetail', params: { id: boxId } })
}

const onImgLoad = () => {
  setTimeout(() => {
    emit('update:show', false)
    process.value = 0
  }, 800)
}
</script>

<style lang="less">
.process {
  .van-slider__button-wrapper--right {
    right: -25.5px;
    top: -10px;
  }
}
</style>

<style lang="less" scoped>
.open-wrap {
  position: fixed;
  top: 0;
  left: 50%;
  height: 100vh;
  width: 100vw;
  max-width: 750PX;
  z-index: 10;
  background: 0 / cover no-repeat url('../../../assets/images/background.jpg');
  transform: translateX(-50%);
}
.unbox {
  display: block;
  margin: 40px auto 70px;
  width: 299px;
}
.box-img {
  display: block;
  width: 297px;
  height: 180px;
}
.slide {
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  text-align: center;
  color: #282a38;
}
.box-wrap {
  position: relative;
  margin: 0 auto 80px;
  width: 297px;
  .process {
    position: absolute;
    top: 40%;
    left: 0;
    width: 100%;
    height: 100%;
    .knife {
      display: block;
      width: 55px;
      height: 55px;
    }
  }
}
</style>
