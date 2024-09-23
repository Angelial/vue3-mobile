<template>
  <nav-bar
    :left-text="`${userAddress.id ? 'Edit' : 'Add'} Distribution Information`"
    left-arrow
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onClickLeft"
  />
  <section class="address-page">
    <Form @submit="onSubmit">
      <label class="label-txt">Receiver</label>
      <Field
        v-model="userAddress.username"
        :border="false"
        name="username"
        placeholder="Enter The Full Name"
      />

      <label class="label-txt">Mobile Number</label>
      <Field
        v-model="userAddress.phone"
        name="phone"
        :border="false"
        maxlength="11"
        placeholder="09XXXXXXXXX"
      />

      <label class="label-txt">Postal Code</label>
      <Field
        v-model="userAddress.postalCode"
        name="postalCode"
        :border="false"
        placeholder="Enter The Postal Code"
      />

      <label class="label-txt">Address(City/Province/Brgy)</label>
      <Cell
        :title="addressDetail"
        :title-style="addressCellColor"
        is-link
        @click="isShowChangeAddress = true"
      />

      <label class="label-txt">Detailed Address</label>
      <div ref="address">
        <Field
          v-model.trim="userAddress.address"
          name="address"
          :border="false"
          @focus="onFocus"
          @blur="onBlur"
          placeholder="Street Name, Building, House No."
        />
      </div>
      <div class="btn-group">
        <Button block type="primary" native-type="submit" class="btn-save">
          Save
        </Button>
      </div>
    </Form>
  </section>

  <AddressCascader v-model:show="isShowChangeAddress" @change="changeAddress" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { Form, Field, NavBar, Cell, Button, Toast } from 'vant'
import { reactive, ref, computed, onBeforeMount } from 'vue'
import AddressCascader from './components/AddressCascader.vue'
import { updateUserAddress, fetchUserAddress } from '@/api/genericApi'
import { useStore } from 'vuex'
import Env from '@/util/env'

const store = useStore()
const userId = computed(() => {
  return store.state.user.user.id
})

const router = useRouter()
const isShowChangeAddress = ref(false)
const address: any = ref('')

const userAddress = reactive({
  id: undefined,
  isDefault: 1,
  phone: '',
  postalCode: '',
  regins: '',
  reginsCode: '',
  province: '',
  provinceCode: '',
  city: '',
  cityCode: '',
  district: '',
  districtCode: '',
  address: '',
  userId: '',
  username: ''
})
const addressDetail = computed(() => {
  if (!userAddress.district) {
    return 'Region, Province, City, Barangay'
  } else {
    return `${userAddress.regins} ${userAddress.province} ${userAddress.city} ${userAddress.district}`
  }
})

const addressCellColor = computed(() => {
  if (!userAddress.district) {
    return 'color: #BBBBBB'
  } else {
    return 'color: #000000'
  }
})

const getList = async () => {
  const response: any = await fetchUserAddress()
  if (response.data && response.data.length) {
    Object.assign(userAddress, response.data[0])
  }
}

const onClickLeft = () => {
  router.back()
}
const changeAddress = (cascader) => {
  Object.assign(userAddress, { ...userAddress, ...cascader })
}

const onSubmit = async () => {
  userAddress.userId = userId.value

  if (!userAddress.username) {
    Toast('Please enter the name of the recipient.')
    return
  }

  if (!userAddress.phone) {
    Toast("Please enter recipient's phone number.")
    return
  }

  if (!/^09\d{9}$/.test(userAddress.phone)) {
    Toast('Please enter a valid phone number.')
    return
  }

  if (!userAddress.postalCode) {
    Toast('Please enter the postal code.')
    return
  }

  if (!userAddress.district) {
    Toast('Please select province.')
    return
  }
  if (!userAddress.address) {
    Toast('Please enter your detailed address.')
    return
  }

  const response: any = await updateUserAddress(userAddress)
  if (response.code === 0) {
    router.back()
  }
}
const platform = Env.inEnv()
const onFocus = () => {
  if (platform === 'android') {
    address.value.style = 'height: 400px'
    address.value.scrollIntoView(true) // 滚动跟父元素有关系，注意css设置，且true需要显示传入
  }
}
const onBlur = () => {
  if (platform === 'android') {
    address.value.style = 'height: auto'
  }
}
onBeforeMount(() => {
  getList()
})
</script>

<style lang="less" scoped>
.address-page {
  min-height: calc(100vh - 106px);
  background-color: #f6f6f6;
  padding-bottom: 68px;
}
.label-txt {
  font-weight: 600;
  font-size: 15px;
  line-height: 45px;
  padding: 0 15px;
  color: #000000;
  height: 45px;
}
.btn-group {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 750PX;
  padding: 10px 15px calc(10px + env(safe-area-inset-bottom));
  background-color: #fff;
  transform: translateX(-50%);
  .btn-save {
    background: #000000;
    border-radius: 12px;
  }
}
</style>
