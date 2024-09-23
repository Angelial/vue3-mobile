import { reactive } from 'vue'

export default function () {
  const page = reactive({
    pageNum: 1,
    pageSize: 10,
    pages: 0,
    finished: false,
    loading: false
  })
  const initPage = reactive({
    pageNum: 1,
    pageSize: 10,
    pages: 0
  })

  return {
    page,
    initPage
  }
}
