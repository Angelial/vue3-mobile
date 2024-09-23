<template>
  <Popup v-model:show="showPop" position="bottom" round>
    <section class="pay-content">
      <div class="goods-detail flex">
        <div class="thumb flex">
          <Image
            radius="15px"
            width="100%"
            height="100%"
            :src="mainImg"
            mode="cover"
          />
        </div>
        <div>
          <h3 class="name ellipsis2">{{ name }}</h3>
          <p v-if="type === 'CASH'" class="price">₱{{ price }}</p>
          <p v-else class="energy">
            <img
              src="@/assets/images/gem.png"
              alt="MojoMojo"
              class="icon-energy"
            />
            {{ energy }}
          </p>
        </div>
      </div>

      <div class="box-wrap flex-vertical-between">
        <span class="label">Number</span>
        <div class="input-number flex">
          <span class="minus flex-center" @click="changeNumber('minus')">
            <Icon name="minus" color="#fff" />
          </span>

          <input type="number" v-model="number" class="input-inner" />

          <span class="plus flex-center" @click="changeNumber('plus')">
            <Icon name="plus" color="#fff" />
          </span>
        </div>
      </div>

      <div class="box-wrap flex-vertical-between">
        <span v-if="type === 'ENERGY'" class="label">Total meta stones</span>
        <span v-else class="label">Total</span>

        <p v-if="type === 'CASH'" class="price">₱{{ totalPrice }}</p>
        <p v-else class="energy">
          <img
            src="@/assets/images/gem.png"
            alt="MojoMojo"
            class="icon-energy"
          />
          {{ totalPrice }}
        </p>
      </div>

      <div class="exchange flex-center" @click="goPay">
        {{ type === 'CASH' ? 'Confirm' : 'Exchange' }}
      </div>
    </section>
  </Popup>
</template>

<script lang="ts" setup="props, { emit }">
import { Popup, Image, Icon, Toast } from 'vant'
import { ref, defineProps, defineEmits, watch, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const showPop = ref(false)
const number = ref(1)

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  mainImg: {
    type: String,
    default: ''
  },
  price: {
    type: [String, Number],
    default: 0
  },
  energy: {
    type: [String, Number],
    default: 0
  },
  type: {
    type: String,
    default: 'CASH' // CASH ENERGY
  },
  show: {
    type: Boolean,
    default: false
  }
})

const energyAmount = computed(() => store.state.user.user.energyAmount || 0)

const totalPrice = computed(() => {
  if (props.type === 'CASH') {
    return number.value * Number(props.price)
  } else {
    return number.value * Number(props.energy)
  }
})

const emit = defineEmits(['update:show', 'pay'])

watch(showPop, (newShowPop) => {
  emit('update:show', newShowPop)
})

watch(
  () => props.show,
  (newShow) => {
    !newShow && (number.value = 1)
    showPop.value = newShow
  }
)

const changeNumber = (name) => {
  if (name === 'minus') {
    if (number.value <= 1) {
      return
    }
    number.value--
  } else {
    number.value++
  }
}

const goPay = () => {
  if (props.type === 'ENERGY') {
    if (energyAmount.value < totalPrice.value) {
      Toast('Insufficient Mojo Points.')
      return
    }
  }

  emit('pay', {
    number: number.value,
    type: props.type
  })
}
</script>

<style lang="less">
.pay-content {
  width: 100%;
  padding: 20px 20px 30px;
  background-color: #f6f6f6;
  border-radius: 20px 20px 0 0;
  .goods-detail {
    padding-bottom: 20px;
    border-bottom: 0.5px solid #ccc;
    .thumb {
      flex: 0 0 auto;
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }
    .name {
      font-weight: 600;
      font-size: 19px;
      line-height: 28px;
      color: #000000;
    }
    .price {
      font-weight: 600;
      font-size: 22px;
      line-height: 33px;
      color: #f65e5e;
    }
    .energy {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 22px;
      line-height: 33px;
      color: #f65e5e;
      .icon-energy {
        width: 20px;
      }
    }
  }
  .box-wrap {
    height: 60px;
    border-bottom: 0.5px solid #ccc;
    &:nth-last-child(2) {
      border-bottom: 0;
    }
    .label {
      font-weight: 400;
      font-size: 15px;
      line-height: 22px;
      color: #000000;
    }
    .input-number {
      .minus,
      .plus {
        width: 32px;
        height: 30px;
        background: #000000;
      }
      .minus {
        border-radius: 18px 0 0 18px;
      }
      .plus {
        border-radius: 0 18px 18px 0;
      }
      .input-inner {
        width: 40px;
        height: 30px;
        margin: 0 2px;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: -0.24px;
        color: #000000;
        text-align: center;
        border: 1px solid #000000;
      }
    }
    .price {
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      color: #f65e5e;
    }
    .energy {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      color: #f65e5e;
      .icon-energy {
        width: 16px;
      }
    }
  }
  .exchange {
    width: 315px;
    height: 56px;
    font-size: 18px;
    line-height: 27px;
    font-weight: 600;
    margin: 10px auto 0;
    color: #fff;
    background: #000000;
    border-radius: 28px;
  }
}
</style>
