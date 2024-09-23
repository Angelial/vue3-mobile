<template>
  <div class="feedback-list">
    <cell-group :border="false">
      <cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        is-link
        :to="`/feedback?userId=${userId}&type=${item.type}`"
        :label="item.description"
      />
    </cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Cell, CellGroup } from 'vant'
import { useRoute } from 'vue-router'
import { fetchFeedbackList } from '@/api/genericApi'

export default defineComponent({
  components: {
    Cell,
    CellGroup
  },
  setup() {
    let list = ref([])
    const getList = async () => {
      const response: any = await fetchFeedbackList()
      if (response.code === 0) {
        list.value = response.data
      }
    }
    getList()
    const route: any = useRoute()
    const userId = route.query?.userId
    return {
      list,
      userId
    }
  }
})
</script>

<style lang="less" scoped>
.feedback-list {
  height: 100vh;
  background: #f7f7f7;
}
.my-button {
  height: 48px;
  background: #000000;
  border-radius: 24px;
  border: none;
}
</style>
