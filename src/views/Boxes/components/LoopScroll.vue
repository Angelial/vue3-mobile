<template>
  <swiper
    class="swiper-container"
    :space-between="10"
    :slides-per-view="5"
    :loop="props.goodsList.length > 5"
    :modules="modules"
    :autoplay="autoplay"
  >
    <template v-for="(item, index) in goodsList" :key="index">
      <swiper-slide v-if="index" class="goods-item">
        <img :src="item.mainImage" alt="MojoMojo" class="goods-img" />
        <span
          class="type"
          :class="{
            'type-1': item.groupType === 1,
            'type-2': item.groupType === 2,
            'type-3': item.groupType === 3,
            'type-4': item.groupType === 4
          }"
        >
          {{ item.groupType === 1 ? 'Good' : '' }}
          {{ item.groupType === 2 ? 'Rare' : '' }}
          {{ item.groupType === 3 ? 'Epic' : '' }}
          {{ item.groupType === 4 ? 'Legend' : '' }}
        </span>
      </swiper-slide>
    </template>
  </swiper>
</template>

<script lang="ts" setup="props">
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import { defineProps, PropType } from 'vue'
const modules = [Autoplay]
const props = defineProps({
  goodsList: {
    type: Array as PropType<any>,
    default: () => []
  }
})
const autoplay =
  props.goodsList.length >= 5
    ? {
        delay: 800,
        disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
        waitForTransition: true // 等待过渡完毕。自动切换会在slide过渡完毕后才开始计时
      }
    : false
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.goods-item {
  position: relative;
  border-radius: 2px;
  width: 60px;
  overflow: hidden;
  .goods-img {
    display: block;
    width: 60px;
    height: 60px;
  }
  .type {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 18px;
    font-weight: 400;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    color: #ffffff;
    z-index: 1;
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
</style>
