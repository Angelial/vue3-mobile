<template>
  <nav-bar
    v-show="isShow"
    :left-text="step"
    left-arrow
    fixed
    safe-area-inset-top
    z-index="9999"
    @click-left="onClickLeft"
  />
  <Popup v-model:show="isShow" :overlay="false" position="right" lazy-render>
    <section class="popup-wrap">
      <section v-show="step === 'Region'">
        <IndexBar highlight-color="#1878F1">
          <template v-for="(item, key) in reginsArr" :key="key">
            <IndexAnchor class="index-anchor" :index="key">
              {{ key }}
            </IndexAnchor>
            <Cell
              v-for="(region, index) in item"
              :key="index"
              :title="region.name"
              @click="changeRegion(region)"
            />
          </template>
        </IndexBar>
      </section>

      <section v-show="step === 'Province'">
        <IndexBar highlight-color="#1878F1">
          <template v-for="(item, key) in provinceArr" :key="key">
            <IndexAnchor class="index-anchor" :index="key">
              {{ key }}
            </IndexAnchor>
            <Cell
              v-for="(province, index) in item"
              :key="index"
              :title="province.name"
              @click="changeProvince(province)"
            />
          </template>
        </IndexBar>
      </section>

      <section v-show="step === 'City'">
        <IndexBar highlight-color="#1878F1">
          <template v-for="(item, key) in cityArr" :key="key">
            <IndexAnchor class="index-anchor" :index="key">
              {{ key }}
            </IndexAnchor>
            <Cell
              v-for="(city, index) in item"
              :key="index"
              :title="city.name"
              @click="changeCity(city)"
            />
          </template>
        </IndexBar>
      </section>

      <section v-show="step === 'Barangay'">
        <IndexBar highlight-color="#1878F1">
          <template v-for="(item, key) in districtArr" :key="key">
            <IndexAnchor class="index-anchor" :index="key">
              {{ key }}
            </IndexAnchor>
            <Cell
              v-for="(district, index) in item"
              :key="index"
              :title="district.name"
              @click="changeBarangay(district)"
            />
          </template>
        </IndexBar>
      </section>
    </section>
  </Popup>
</template>

<script lang="ts" setup="props, { emit }">
import { Popup, NavBar, IndexBar, IndexAnchor, Cell } from 'vant'
import {
  ref,
  onBeforeMount,
  reactive,
  defineEmits,
  defineProps,
  watch
} from 'vue'
import { fetchAddressList } from '@/api/genericApi'

const props = defineProps({
  show: {
    type: Boolean,
    default: true
  }
})

const step = ref('Region') // Region Province City Barangay
const reginsArr: any = ref([])
const provinceArr: any = ref([])
const cityArr: any = ref([])
const districtArr: any = ref([])

const emit = defineEmits(['update:show', 'change'])

const cascader = reactive({
  regins: '',
  reginsCode: '',
  province: '',
  provinceCode: '',
  city: '',
  cityCode: '',
  district: '',
  districtCode: ''
})

const onClickLeft = () => {
  switch (step.value) {
    case 'Region':
      emit('update:show', false)
      step.value = 'Region'
      break
    case 'Province':
      step.value = 'Region'
      break
    case 'City':
      step.value = 'Province'
      break
    case 'Barangay':
      step.value = 'City'
      break
  }
  // show.value = false
}

const isShow = ref(false)

watch(
  () => props.show,
  (newShow) => {
    isShow.value = newShow
  }
)

const letterSort = (data, field) => {
  const list = []
  for (var i = 0; i < data.length; i++) {
    // 创建 字母 分组
    const letter = data[i][field].substr(0, 1)
    if (!(letter in list)) {
      list[letter] = []
    }
    // 字母 分组 添加 数据
    list[letter].push(data[i])
  }
  const result = []
  for (let key in list) {
    result.push({
      letter: key,
      list: list[key]
    })
  }
  result.sort(function (x, y) {
    return x.letter.charCodeAt(0) - y.letter.charCodeAt(0)
  })

  // 转换 数据 格式
  const json_sort = {}
  for (let i = 0; i < result.length; i++) {
    json_sort[result[i].letter] = result[i].list
  }
  return json_sort
}

const getList = async (level, parentCode = '') => {
  const response = await fetchAddressList({ level, parentCode })
  return letterSort(response.data, 'name')
}
const changeRegion = async (region) => {
  step.value = 'Province'
  cascader.regins = region.name
  cascader.reginsCode = region.code
  provinceArr.value = await getList(1, region.code)
}

const changeProvince = async (province) => {
  step.value = 'City'
  cascader.province = province.name
  cascader.provinceCode = province.code
  cityArr.value = await getList(2, province.code)
}

const changeCity = async (city) => {
  step.value = 'Barangay'
  cascader.city = city.name
  cascader.cityCode = city.code
  districtArr.value = await getList(3, city.code)
}

const changeBarangay = async (district) => {
  cascader.district = district.name
  cascader.districtCode = district.code
  emit('change', cascader)
  emit('update:show', false)
  step.value = 'Region'
}

onBeforeMount(async () => {
  reginsArr.value = await getList(0)
})
</script>

<style lang="less" scoped>
.popup-wrap {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  padding-top: 44px;
  padding-bottom: 50px;
  background-color: #fff;
}
.index-anchor {
  background-color: #f6f6f6;
}
</style>
