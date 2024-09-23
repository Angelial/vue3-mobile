<template>
  <div v-if="status === 'success'" class="pay-result">
    <img src="@/assets/images/icon-success.png" alt="MojoMojo" class="icon" />
    <p class="tip">Your payment was successful!</p>
  </div>
  <div v-else class="pay-result">
    <img src="@/assets/images/icon-error.png" alt="MojoMojo" class="icon" />
    <p class="tip">Payment Failed.</p>
  </div>
  <ul v-if="status === 'success'" class="list">
    <li class="item">
      <span class="label">Amount Paid</span>
      <span class="content">PHP {{ directResult.amount }}</span>
    </li>
    <li class="item">
      <span class="label">Amount Paid</span>
      <span class="content"> {{ directResult.payDate }}</span>
    </li>
    <li class="item">
      <span class="label">Payment Channel</span>
      <span class="content">
        {{ directResult.channelName }}
      </span>
    </li>
  </ul>
  <p v-if="status === 'success'" class="count-down">
    Redirecting back in
    <CountDown class="number" time="3000" format="ss" @finish="onFinish" />
    s
  </p>
  <p v-else class="count-down">{{ error }}</p>
  <button
    v-if="status === 'fail' && type === 'h5'"
    class="go-back flex-center"
    @click="goBack"
  >
    Go To Back
  </button>
</template>

<script lang="ts" setup>
import { CountDown } from 'vant'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const store = useStore()
const route = useRoute()
const type = route.query.type
const router = useRouter()
const status = route.params.status
const error = route.query.error
const directResult = computed(() => store.state.user.directResult)
const onFinish = () => {
  // router.push({ name: 'PayResult' })
  // window.location.href = 'http://dev.mojo-api-h5.leapgen.net/result'
  if (type === 'h5') {
    router.push({ name: 'ResultH5pay' })
  } else {
    window.location.href = 'https://mysterybox.mojomojo.net/result'
  }
}
const goBack = () => {
  router.push({ name: 'ResultH5pay' })
}
</script>

<style lang="less" scoped>
.pay-result {
  padding-top: 14px;
  margin-bottom: 40px;
  .icon {
    display: block;
    width: 151px;
    margin: 0 auto 15px;
  }
  .tip {
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #000000;
    text-align: center;
  }
}
.list {
  width: 335px;
  margin: 0 auto;
  padding: 20px;
  background: #f6f6f6;
  border-radius: 2px;
  margin-bottom: 30px;
  .item {
    display: flex;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .label {
      width: 130px;
      font-weight: 600;
      font-size: 15px;
      line-height: 21px;
      color: #000000;
      margin-right: 22px;
    }
    .content {
      font-weight: 600;
      font-size: 13px;
      line-height: 19px;
      color: #f4a100;
    }
    .bank {
      display: block;
      width: 60px;
      height: 60px;
      margin-top: 10px;
    }
  }
}
.count-down {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  line-height: 21px;
  padding: 0 15px;
  color: #7e8d9b;
  text-align: center;
  .number {
    margin-left: 4px;
    color: #7e8d9b;
  }
}
.go-back {
  width: 315px;
  height: 48px;
  margin: 20px auto 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #ffffff;
  border: none;
  background: #000000;
  border-radius: 24px;
}
</style>
