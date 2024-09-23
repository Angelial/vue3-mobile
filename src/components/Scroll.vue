<template>
  <div
    class="my-better-scroll"
    ref="scroll"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="my-better-scroll__content">
      <div class="wrap">
        <slot></slot>
      </div>
      <div v-if="loading" class="my-loading">
        <Loading size="24" type="spinner" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
import ObserveDOM from '@better-scroll/observe-dom'
import { Loading } from 'vant'

/*
开启对 content 以及 content 子元素 DOM 改变的探测。
当插件被使用后，当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法。
observe-dom 插件具有以下几个特性：

针对改变频繁的 CSS 属性，增加 debounce
如果改变发生在 scroll 动画过程中，则不会触发 refresh
*/
BScroll.use(ObserveDOM)
// mouseWheel 扩展 BetterScroll 鼠标滚轮的能力。
BScroll.use(MouseWheel)

/**
 * TODO 本组件仅定义为向右无限滚动
 * [当 better-scroll 遇见 Vue](https://zhuanlan.zhihu.com/p/27407024)
 * [API](https://better-scroll.github.io/docs/zh-CN/)
 */
export default {
  name: 'BetterScroll',
  components: {
    Loading
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * 当箭头被点击时，滚动一个组件宽度，以显示用户未看到的内容
     */
    arrowClick() {
      // TODO 仅适合向右滚动
      const scrollLength = this.scroll.x - this.$refs.scroll.clientWidth
      this.scroll.scrollTo(scrollLength)
      this.$emit('arrow')
    },
    handlerFresh() {
      this.scroll.refresh()
    },
    init() {
      this.scroll = new BScroll(this.$refs.scroll, {
        click: true,
        scrollX: true,
        scrollY: false,
        observeDOM: true,
        observeImage: true,
        mouseWheel: {
          // 滚动动画的缓动时长
          easeTime: 30,
          // 只要在 discreteTime 时间内没有探测到滚动，那么一次的滚轮动作就结束了。
          discreteTime: 100
        }
      })
      this.scroll.scroller.hooks.on('scrollEnd', () => {
        // 滚动到底部
        if (this.scroll.x <= this.scroll.maxScrollX + 50) {
          this.$emit('end')
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.my-better-scroll {
  overflow: hidden;
  position: relative;
  & > .my-better-scroll__content {
    display: inline-block;
    white-space: nowrap;
    .wrap {
      display: inline-block;
      vertical-align: middle;
    }
    & > * {
      display: inline-block;
    }
  }
}
.my-loading {
  display: inline-block;
  vertical-align: middle;
}
</style>
