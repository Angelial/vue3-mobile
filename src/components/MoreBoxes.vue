<template>
  <div class="more-wrap">
    <h3 class="cm-title">More Mystery Boxes</h3>

    <section class="more-boxes">
      <List
        v-if="boxesList.length"
        loading-text="Loading..."
        finished-text="No more box"
      >
        <template v-for="(boxes, indexBox) in boxesList" :key="indexBox">
          <Boxes
            v-if="boxes.blindBoxBasic.id !== boxId"
            :box="boxes"
            :index="indexBox"
          />
        </template>
      </List>

      <Empty v-else />
    </section>
  </div>
</template>

<script lang="ts" setup="props">
import { onBeforeMount, ref, defineProps } from 'vue'
import { fetchPersonalBlindBoxes } from '@/api/boxesApi'
import { List } from 'vant'
import Boxes from '@/components/Boxes.vue'
import Empty from '@/components/Empty.vue'

const props = defineProps({
  pageKey: {
    type: String,
    default: 'BlindBoxDetailActivity'
  },
  boxId: {
    type: [String, Number],
    default: 0
  }
})

const boxesList = ref([])
const getPersonalBlindBoxes = async () => {
  const response: any = await fetchPersonalBlindBoxes({
    pageKey: props.pageKey,
    showType: 1
  })
  boxesList.value = response.data.blindBoxList
}
onBeforeMount(() => {
  getPersonalBlindBoxes()
})
</script>

<style lang="less" scoped>
.more-wrap {
  background-color: #fff;
}
.cm-title {
  padding-top: 20px;
}
.more-boxes {
  background-color: #fff;
}
</style>
