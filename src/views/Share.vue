<template>
  <div class="share-page" ref="canvasToImg">
    <img class="poster" src="../assets/images/share-banner.jpg" />
    <div class="progress-box">
      <Progress
        class="my-progress"
        :percentage="percent"
        stroke-width="10"
        pivot-color="#7232dd"
        color="linear-gradient(to right, #FD008F, #3CB8EF)"
      />
      <img class="gift" src="../assets/images/gift.gif" />
    </div>

    <div class="my-grades">
      <p class="cm-name">My Grades</p>
      <div class="box">
        <img class="new" src="../assets/images/new.png" />
        <span class="number">{{ num }}</span>
        <div>
          <button class="share" @click="shareFacebook('12345')">
            Share By Facebook
          </button>
          <button
            v-if="version >= 105"
            class="share"
            @click="shareViber('12345')"
          >
            Share By Viber
          </button>
        </div>
      </div>
    </div>

    <div class="my-grades">
      <p class="cm-name">Operation Steps</p>
      <img src="../assets/images/process.png" class="process" />
    </div>

    <div class="my-grades">
      <p class="cm-name">Description</p>
      <p class="content">
        1. Boost your Invitation Progress Bar by sharing your referral link and
        have your friend register an account with your link.
      </p>
      <p class="content">
        2. When the Progress Bar reaches 100%, you will get a free Mystery Box
        from us!
      </p>
      <p class="content">
        3. Open the free Mystery Box and view it in Inventory.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { getPullNew } from '@/api/genericApi'
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'
import { Progress, Toast } from 'vant'
import { useRoute } from 'vue-router'
// import env from '@/util/env'
import native from '@/util/native'
// import { customizeDateToFormat } from '@/util'
interface DataProps {
  userId?: number
  num?: number
  percent?: number
}

export default defineComponent({
  components: { Progress },
  setup() {
    const data: DataProps = reactive({
      num: 0,
      percent: 0,
      userId: 0
    })
    const refData = toRefs(data)
    const router: any = useRoute()
    const _userId = router.query?.userId
    const version = router.query?.version

    // const _env = env.inEnv()

    const onClickLeft = () => {
      console.log('点击左侧')
    }
    const shareFacebook = async (name) => {
      console.log(name)
      native.shareAndroidFacebook('shareFacebook', 'shareFacebook', () => {
        Toast('shareAFaceBook')
      })
      // await sendBuringPoint({
      //   userId: data.userId,
      //   point_name: 'click_share',
      //   share_source: 'facebook',
      //   created_at: customizeDateToFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      // })
    }
    const shareViber = async (name) => {
      console.log(name)
      native.shareAndroidViber('shareViber', 'shareViber', () => {
        Toast('shareViber')
      })
      // await sendBuringPoint({
      //   userId: data.userId,
      //   point_name: 'click_share',
      //   share_source: 'viber',
      //   created_at: customizeDateToFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      // })
    }
    onBeforeMount(async () => {
      const response: any = await getPullNew(_userId)
      if (response.code === 0) {
        const { num, percent, userId } = response.data
        data.num = num
        data.percent = percent
        data.userId = userId
      }
    })

    return {
      ...refData,
      onClickLeft,
      shareFacebook,
      shareViber,
      version
    }
  }
})
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
</style>

<style lang="less" scoped>
.share-page {
  padding: 10px 15px;
}
.poster {
  display: block;
  width: 345px;
  height: 160px;
}
.progress-box {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background: #f6f6f6;
}
.my-progress {
  width: 259px;
}
.gift {
  width: 58px;
  height: 58px;
}
.cm-name {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 15px;
}
.my-grades {
  padding: 15px 15px 20px;
  background: #f6f6f6;
  margin-bottom: 10px;
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
  }
  .new {
    width: 44px;
    height: 58px;
  }
  .number {
    font-weight: 600;
    font-size: 32px;
    line-height: 48px;
    color: #b2845b;
  }
  .share {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 48px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #fff;
    background: #1878f1;
    border-radius: 24px;
    border: none;
    & + .share {
      margin-top: 10px;
    }
  }
}
.process {
  display: block;
  width: 100%;
}
.content {
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #7e8d9b;
  margin-bottom: 8px;
}
</style>
